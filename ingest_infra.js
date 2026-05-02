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
      id: `${metadata.source}_chunk_${i}_infra`,
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

async function walkDirForInfra(dir, projName, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  
  const targetFiles = [
      'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 
      'vercel.json', 'eslint.config.js', 'index.html', 'index.css', 'requirements.txt', 
      'Pipfile', 'pyproject.toml', 'Dockerfile', 'docker-compose.yml', 'schema.sql'
  ];

  for (const file of files) {
    const filePath = path.join(dir, file);
    // Exclude heavy/unnecessary folders
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.next' || file === 'public' || file === 'venv' || file === '__pycache__' || file === '.venv') {
      continue;
    }
    
    if (fs.statSync(filePath).isDirectory()) {
      walkDirForInfra(filePath, projName, fileList);
    } else {
      if (targetFiles.includes(file)) {
          fileList.push({ path: filePath, name: file, project: projName });
      }
    }
  }
  return fileList;
}

async function main() {
  console.log("Starting infrastructure sweep...");
  const projects = [
      { name: 'stephen-cv-site', root: 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\stephen-cv-site' },
      { name: 'jedana-app', root: 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\jedana-app' },
      { name: 'mycareermax', root: 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\mycareermax' },
      { name: 'queuety', root: 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\queuety' },
      { name: 'HARry', root: 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\HARry' },
      { name: 'motiv', root: 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\motiv' },
      { name: 'jayobee', root: 'C:\\Users\\skala\\OneDrive\\Documents\\Projects\\jayobee' }
  ];

  let filesToProcess = [];
  for (const proj of projects) {
      const projFiles = await walkDirForInfra(proj.root, proj.name);
      filesToProcess = filesToProcess.concat(projFiles);
  }

  for (const fileObj of filesToProcess) {
      await processFile(fileObj.path, { source: fileObj.name, project: fileObj.project, type: 'infrastructure' });
  }

  console.log("Infrastructure sweep complete!");
}

main().catch(console.error);