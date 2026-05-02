import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.Index('portfolio-rag');
const embeddingModel = genAI.getGenerativeModel({ model: 'gemini-embedding-2' });

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

function chunkText(text, metadata) {
  const chunks = [];
  let startIndex = 0;
  while (startIndex < text.length) {
    const chunk = text.slice(startIndex, startIndex + CHUNK_SIZE);
    chunks.push({ text: chunk, metadata: { ...metadata, chunk_index: chunks.length } });
    startIndex += (CHUNK_SIZE - CHUNK_OVERLAP);
  }
  return chunks;
}

async function getEmbedding(text) {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function processFile(filePath, metadata) {
  console.log('Processing:', filePath);
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let text = fs.readFileSync(filePath, 'utf-8');
  if (!text.trim()) return;

  const chunks = chunkText(text, metadata);
  let vectors = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const embedding = await getEmbedding(chunk.text);
    vectors.push({
      id: `${metadata.source}_chunk_${i}_v2`,
      values: embedding,
      metadata: { ...chunk.metadata, text: chunk.text }
    });
    
    if (vectors.length >= 50 || (i === chunks.length - 1 && vectors.length > 0)) {
      await index.upsert({ records: vectors });
      console.log('  Upserted batch ending at chunk', i);
      vectors.length = 0;
    }
  }
}

async function main() {
  await processFile('C:\\Users\\skala\\OneDrive\\Documents\\Projects\\stephen-cv-site\\api\\chat.js', { source: 'api/chat.js', project: 'stephen-cv-site', type: 'source_code' });
  await processFile('C:\\Users\\skala\\OneDrive\\Documents\\Projects\\stephen-cv-site\\scripts\\ingest.js', { source: 'scripts/ingest.js', project: 'stephen-cv-site', type: 'source_code' });
  console.log('Backend ingestion complete!');
}
main().catch(console.error);