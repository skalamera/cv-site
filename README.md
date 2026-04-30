# AI Portfolio & CV (skalamera.me)

Welcome to the source code for my interactive portfolio and CV site. This project is far more than a static resume; it is a full-stack, production-grade LLMOps application showcasing advanced AI integrations, strict security measures, and continuous evaluation.

## 🚀 Live Demo
[skalamera.me](https://skalamera.me)

## 🏗️ Architecture Overview

The site implements a **7-Step Self-Healing RAG Architecture**:

1. **User Input:** Visitors interact with a floating React chatbot built with Tailwind CSS and Framer Motion. Requests are securely proxied via Vercel Serverless Functions.
2. **AI Firewall (Guardian):** Before any processing occurs, a high-speed Gemini Flash model screens the raw input. It detects and blocks prompt injections or jailbreak attempts instantly.
3. **Vector Embedding:** Safe inputs are passed to Google's embedding model, converting the text into a 3,072-dimensional vector.
4. **RAG Retrieval:** The vector queries a **Pinecone database** containing over 15,000 embedded chunks of my resume and source code to retrieve highly relevant context.
5. **LLM Generation:** The primary Gemini 2.5 Flash model synthesizes the retrieved codebase context alongside strict system instructions to generate a persona-aligned response.
6. **Telemetry & Observability:** Every interaction, latency metric, and vector search is logged to **Langfuse** for real-time monitoring.
7. **Closed-Loop CI/CD:** A nightly **GitHub Action** extracts thwarted attacks from Langfuse and automatically converts them into regression tests via **Promptfoo**.

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- React Markdown (with custom interceptors for security)

**Backend & AI:**
- Google Gemini API (Generative AI & Embeddings)
- Pinecone (Vector Database)
- Vercel Serverless Functions (`/api/chat.js`)

**LLMOps & Security:**
- Langfuse (Agentic Observability)
- Promptfoo (LLM Evaluation)
- GitHub Actions (Automated Trace-to-Eval CI/CD pipeline)

## 🛡️ Security Features

Because this LLM is exposed to the public web, it employs multiple defensive layers:
- **Zero-Trust Client:** API keys are never exposed to the browser; all AI calls run through Vercel serverless edges.
- **Active Firewall:** A secondary LLM pre-screens all inputs for hostile intent before they reach the RAG pipeline.
- **Automated Regression Testing:** If an attack succeeds, the exact trace is pulled from Langfuse and appended to `tests/adversarial-inputs.json`. GitHub Actions runs `promptfoo eval` on every commit, failing the build if the system remains vulnerable to known vectors.

## 💻 Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:
   - `GEMINI_API_KEY`
   - `PINECONE_API_KEY`
   - `LANGFUSE_SECRET_KEY`
   - `LANGFUSE_PUBLIC_KEY`
   - `LANGFUSE_BASEURL`
4. Start the development server: `npm run dev`

## 🧪 Running Evaluations

To run the Promptfoo evaluation suite against the live endpoint:
```bash
npm run test:evals
```
Or manually sync recent attack traces from Langfuse:
```bash
node scripts/sync-evals.js
``` 
