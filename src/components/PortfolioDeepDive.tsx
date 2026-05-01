import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioDeepDive: React.FC<Props> = ({ isOpen, onClose }) => {
  // Allow body scrolling even when modal is open
  // Just clean up on unmount just in case
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-center bg-slate-950/80 backdrop-blur-sm pointer-events-none"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative w-full max-w-4xl my-4 md:my-8 mx-4 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] pointer-events-auto"
          >
            {/* Sticky Header with Close Button */}
            <div className="flex-shrink-0 z-20 flex justify-between items-center p-6 bg-slate-900 border-b border-slate-800 rounded-t-2xl">
              <h2 className="text-xl font-semibold text-white">Project Deep Dive</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-8 md:p-12 text-slate-300 space-y-16 overflow-y-auto flex-1 custom-scrollbar">
              
              <header className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Beyond the PDF: A Live Technical Audit
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                  A static PDF captures titles and dates. It provides no proof of technical fluency. I built skalamera.me to give recruiters and stakeholders a way to test my system architecture and background in real time.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                  Deploying a live Large Language Model introduces security risks like prompt injection and data manipulation. The system required an enterprise-grade LLMOps architecture to protect the data and the professional persona. It functions as a live technical audit.
                </p>
              </header>

              <img 
                src="/images/header.png" 
                alt="Skalamera Portfolio Header" 
                className="w-full rounded-xl border border-slate-700 shadow-xl"
              />

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Dual Threat: Support Operations Meets LLMOps</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg">
                    Technical credibility requires more than coding skills. It requires operational discipline. I spent 10 years in SaaS operations managing global agents, leading SEV-0 incident triage, and maintaining high CSAT scores at Sigma and Benchmark Education.
                  </p>
                  <p className="text-lg">
                    I apply that discipline to AI engineering. Support Operations transitions from a reactive cost center to a proactive, engineering-driven hub when you build the right agentic infrastructure.
                  </p>
                </div>

                <div className="my-10 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <img 
                    src="/images/bridging-support-ops.png" 
                    alt="Infographic showing CSAT metrics mapping to an AI pipeline" 
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-center text-sm text-slate-400 mt-4">Operational impact mapped directly to technical infrastructure.</p>
                </div>

                <p className="text-lg">The RAG pipeline retrieves documented facts about my operational impact:</p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li>Maintained a 4.84/5 CSAT at Sigma while managing high-volume enterprise accounts.</li>
                  <li>Drove a 23-second average live-chat first response time.</li>
                  <li>Reduced resolution time by 38% and improved FRT by 45% through API automation.</li>
                  <li>Delivered an average time to resolve of 1.1 hours.</li>
                </ul>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Guardian at the Gate</h2>
                <p className="text-lg">
                  Public-facing LLMs are vulnerable to jailbreak attempts. Users try to force the agent into off-brand behavior. I used a Zero-Trust Client approach to stop them.
                </p>
                <p className="text-lg">
                  Vercel Serverless Functions manage the API keys for Gemini, Pinecone, and Langfuse strictly on the server side. The client-side browser never touches a key.
                </p>
                <p className="text-lg mb-8">
                  Before a query reaches the primary model, it passes through an AI Firewall layer. A lightweight Gemini Flash model screens the raw input for hostile intent. It returns exactly "safe" or "unsafe." This low-latency defense blocks malicious instructions early.
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                  <img 
                    src="/images/chatbot-ui.png" 
                    alt="Portfolio Chatbot Interface" 
                    className="w-full rounded-lg shadow-lg border border-slate-600"
                  />
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">The Self-Aware Assistant</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      The chatbot is guided by a strict <code>SYSTEM_PROMPT</code>. The bot knows it is the portfolio and refuses to deviate into off-topic requests. I apply the 4D Framework—Delegation, Description, Discernment, and Diligence—to align the persona through system instructions. The agent treats its instructions as strict operational guidelines.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Self-Healing Pipeline</h2>
                <p className="text-lg">
                  The core of the portfolio is a 7-step architecture that learns from its own defense. Traditional software fixes bugs manually. This pipeline uses automated adversarial harvesting.
                </p>

                <div className="my-10">
                  <img 
                    src="/images/chatbot-architecture.png" 
                    alt="7-Step AI Architecture Diagram" 
                    className="w-full rounded-xl border border-slate-700 shadow-lg bg-white/5"
                  />
                </div>

                <ol className="list-decimal pl-6 space-y-4 text-lg text-slate-300 mb-8">
                  <li><strong>User Input:</strong> Visitors interact with a React 19 interface.</li>
                  <li><strong>AI Firewall:</strong> The Guardian model pre-screens inputs.</li>
                  <li><strong>Vector Embedding:</strong> Gemini Embeddings translate the text into 3,072-dimensional vectors.</li>
                  <li><strong>RAG Retrieval:</strong> The system queries a Pinecone database containing over 15,000 embedded chunks of my source code and professional history.</li>
                  <li><strong>LLM Generation:</strong> The primary model synthesizes the context and answers the query.</li>
                  <li><strong>Telemetry:</strong> Langfuse captures full execution traces and latency metrics.</li>
                  <li><strong>Closed-Loop CI/CD:</strong> A nightly GitHub Action runs a <code>sync-evals.js</code> script to pull failed attacks from the daily Langfuse logs.</li>
                </ol>

                <p className="text-lg">
                  The script appends these traces to an adversarial test suite. These inputs feed into Promptfoo to generate regression tests. If the current model fails to block a known attack, the build fails. Every failed attack immunizes the system against future variations.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Broader Ecosystem</h2>
                <p className="text-lg">
                  The chatbot is the entry point to a broader technical ecosystem built with Python, Flask, and AI integration. These projects solve specific problems across support operations, job hunting, and daily life:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-slate-800/80 p-8 rounded-xl border border-slate-700 shadow-sm">
                    <strong className="text-white text-xl block mb-3">Jedana AI</strong>
                    <p className="text-slate-300">Built during my time at Benchmark to replace manual QA and Performance Review processes. The tool achieved department-wide adoption and remains in active use today. AgentEye automates the QA reviews and tracks customer sentiment.</p>
                  </div>
                  <div className="bg-slate-800/80 p-8 rounded-xl border border-slate-700 shadow-sm">
                    <strong className="text-white text-xl block mb-3">Jayobee</strong>
                    <p className="text-slate-300">Built out of necessity during my job search. Open roles receive thousands of applications. I built this Chrome extension to contextualize web text and auto-fill ATS application forms, giving me a structural advantage over the competition.</p>
                  </div>
                  <div className="bg-slate-800/80 p-8 rounded-xl border border-slate-700 shadow-sm">
                    <strong className="text-white text-xl block mb-3">myCareerMax</strong>
                    <p className="text-slate-300">Reached the top 10 new business apps in 17 countries with 20,000 global downloads.</p>
                  </div>
                  <div className="bg-slate-800/80 p-8 rounded-xl border border-slate-700 shadow-sm">
                    <strong className="text-white text-xl block mb-3">Motiv</strong>
                    <p className="text-slate-300">A Next.js hobby project I use with my dad and brother to maintain our cars. It uses a <code>pgvector</code>-backed RAG system to retrieve and query technical data from chunked car library manuals.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6 pb-8">
                <h2 className="text-3xl font-semibold text-white">The New Standard</h2>
                <p className="text-lg">
                  Technical Support Operations relies on complex system integrations. I built this portfolio using React 19, Tailwind CSS v4, and the Model Context Protocol to prove I can manage that complexity.
                </p>
                <p className="text-lg">
                  The LLMOps stack runs autonomously and improves itself based on user behavior. I hold 16 verified credentials from Anthropic covering the Model Context Protocol, subagents, and Claude Code.
                </p>
                <p className="text-lg font-medium text-purple-400">
                  skalamera.me is the working implementation of those concepts. You can test the architecture or query the system about my work at Sigma directly on the site.
                </p>
              </section>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioDeepDive;
