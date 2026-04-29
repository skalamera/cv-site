import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

// Load environment variables (.env in project root)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!PINECONE_API_KEY || !GEMINI_API_KEY) {
  console.error("Missing PINECONE_API_KEY or GEMINI_API_KEY in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.Index('portfolio-rag');

// Use the text-embedding-004 model (768 dimensions)
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

function chunkText(text, metadata) {
  const chunks = [];
  let startIndex = 0;
  
  while (startIndex < text.length) {
    const chunk = text.slice(startIndex, startIndex + CHUNK_SIZE);
    chunks.push({
      text: chunk,
      metadata: { ...metadata, chunk_index: chunks.length }
    });
    startIndex += (CHUNK_SIZE - CHUNK_OVERLAP);
  }
  return chunks;
}

async function getEmbedding(text) {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function processFile(filePath, metadata) {
  console.log(`Processing: ${filePath}`);
  try {
    let text = '';
    if (filePath.endsWith('.pdf')) {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfModule = await import('pdf-parse/lib/pdf-parse.js').catch(async () => {
         return await import('pdf-parse');
      });
      const pdf = pdfModule.default || pdfModule;
      
      if (typeof pdf !== 'function') {
         console.warn(`Could not load pdf-parse for ${filePath}. Check dependencies.`);
         return;
      }
      
      const data = await pdf(dataBuffer);
      text = data.text;
    } else {
      text = fs.readFileSync(filePath, 'utf-8');
    }

    if (!text.trim()) return;

    const chunks = chunkText(text, metadata);
    let vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await getEmbedding(chunk.text);
      vectors.push({
        id: `${metadata.source}_chunk_${i}`,
        values: embedding,
        metadata: {
          ...chunk.metadata,
          text: chunk.text, // Store the raw text in metadata for retrieval
        }
      });
      
      // Batch upsert to avoid rate limits (50 at a time)
      if (vectors.length >= 50 || (i === chunks.length - 1 && vectors.length > 0)) {
        if (vectors.length > 0) {
          try {
            await index.upsert({ records: vectors });
            console.log(`  Upserted batch ending at chunk ${i}`);
          } catch (e) {
            console.error(`  Upsert failed at chunk ${i}:`, e.message);
          }
        }
        vectors.length = 0; // Clear array properly
      }
    }
  } catch (err) {
    console.error(`Failed to process ${filePath}:`, err);
  }
}

async function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    // Skip node_modules, .git, build dirs, and large media files
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next' || file === 'public' || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg') || file.endsWith('.lock') || file === 'package-lock.json') {
      continue;
    }
    
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function main() {
  console.log("Starting ingestion pipeline...");
  
  // 1. Ingest Resume
  const resumePath = 'C:\\Users\\skala\\OneDrive\\Documents\\Resumes\\Resume_2026.pdf';
  if (fs.existsSync(resumePath)) {
    await processFile(resumePath, { source: 'Resume_2026', type: 'resume' });
  } else {
    console.warn(`Resume not found at ${resumePath}`);
  }

  // 2. Ingest CV Data mapping
  const cvDataPath = path.join(__dirname, '../src/data/cv-data.ts');
  if (fs.existsSync(cvDataPath)) {
    await processFile(cvDataPath, { source: 'cv-data.ts', type: 'structured_data' });
  }

  // 3. Ingest CV Site Source Code (this project)
  const projectRoot = path.join(__dirname, '..');
  const srcFiles = await walkDir(path.join(projectRoot, 'src'));
  for (const file of srcFiles) {
    if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
        await processFile(file, { source: path.basename(file), project: 'stephen-cv-site', type: 'source_code' });
    }
  }
  
  // 4. Ingest Jedana App Source Code
  const jedanaRoot = 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\jedana-app';
  if (fs.existsSync(jedanaRoot)) {
      const jedanaFiles = await walkDir(path.join(jedanaRoot, 'app'));
      for (const file of jedanaFiles) {
        if (file.endsWith('.py') || file.endsWith('.html') || file.endsWith('.js')) {
            await processFile(file, { source: path.basename(file), project: 'jedana-app', type: 'source_code' });
        }
      }
  }

  console.log("Ingestion complete!");
}

main().catch(console.error);