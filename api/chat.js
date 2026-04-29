import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pinecone } from '@pinecone-database/pinecone';

// Vercel Serverless Function to proxy Gemini requests securely
export default async function handler(req, res) {
  // Add CORS headers for local development testing
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history, message, systemInstruction } = req.body;
    
    // We pull the API key from Vercel Environment Variables, securely hidden from the browser
    const apiKey = process.env.GEMINI_API_KEY;
    const pineconeApiKey = process.env.PINECONE_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    let ragContext = "";
    if (pineconeApiKey) {
       try {
          const pinecone = new Pinecone({ apiKey: pineconeApiKey });
          const index = pinecone.Index('portfolio-rag');
          
          // Embed the user's message
          const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
          const embedResult = await embeddingModel.embedContent(message);
          const vector = embedResult.embedding.values;
          
          // Search Pinecone
          const queryResponse = await index.query({
             vector: vector,
             topK: 5,
             includeMetadata: true
          });
          
          if (queryResponse.matches && queryResponse.matches.length > 0) {
             ragContext = "\\n\\n--- START RELEVANT SOURCE CODE & CONTEXT ---\\n";
             queryResponse.matches.forEach((match, i) => {
                if (match.metadata && match.metadata.text) {
                   ragContext += `\\n[Context ${i+1} from ${match.metadata.source}]:\\n${match.metadata.text}\\n`;
                }
             });
             ragContext += "--- END RELEVANT SOURCE CODE & CONTEXT ---\\n\\nUse this context to accurately answer the user's question. If the context contains source code, you may quote it or explain it.";
          }
       } catch (err) {
          console.error("RAG pipeline failed, falling back to base model:", err);
       }
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction + ragContext
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}