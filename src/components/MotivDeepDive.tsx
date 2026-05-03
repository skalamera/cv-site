import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const MotivDeepDive: React.FC<Props> = ({ isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const resetScroll = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    };

    resetScroll();
    const animationFrame = window.requestAnimationFrame(resetScroll);
    const timeout = window.setTimeout(resetScroll, 150);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeout);
    };
  }, [isOpen]);

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
            className="relative w-full max-w-5xl my-4 md:my-8 mx-4 bg-slate-900 border border-slate-700/40 rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] pointer-events-auto"
          >
            <div className="flex-shrink-0 z-20 flex justify-between items-center p-6 bg-slate-900 border-b border-slate-800 rounded-t-2xl">
              <h2 className="text-xl font-semibold text-white">Project Deep Dive: Motiv</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Motiv deep dive"
              >
                <X size={20} />
              </button>
            </div>

            <div ref={contentRef} className="p-8 md:p-12 text-slate-300 space-y-16 overflow-y-auto flex-1 custom-scrollbar">
              <header className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Motiv: The Digital Automotive OS
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                  Motiv is a comprehensive digital "home base" for vehicle management, maintenance tracking, and automotive intelligence. It acts as a specialized operating system built on modern infrastructure like Next.js, Supabase, and Vercel AI Gateway.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                  By unifying disparate data sources—such as physical receipts, scattered owner manuals, and recall notices—Motiv centralizes vehicle management, ensuring maintenance schedules, recall statuses, and historical records are perfectly organized and instantly accessible.
                </p>
              </header>

              <div className="my-10 w-full aspect-video rounded-xl overflow-hidden shadow-xl border border-slate-700 bg-slate-800">
                <iframe
                  src="/motiv/Motiv_Automotive_OS.pdf#view=FitH"
                  className="w-full h-full"
                  title="Motiv Automotive OS Presentation"
                />
              </div>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Digital Garage</h2>
                <p className="text-lg">
                  The functional heart of the ecosystem. The Garage allows you to personalize your vehicle’s entry with AI-generated renders, perform "Hold → Stock" visual comparisons, and automatically decode VINs to ensure precision recall data and parts fitment.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-3">AI Photo Tools & Visuals</h3>
                    <p className="text-slate-300">
                      Enable visual customization and styling mockups. The system calculates real-time performance estimates based on selected part combinations alongside generative AI visual mockups.
                    </p>
                  </div>
                  <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-3">VIN Decoding & Market Trends</h3>
                    <p className="text-slate-300">
                      Automated queries against NHTSA databases flag critical, trim-specific safety recalls. Integrated market data simultaneously tracks real-time sales and asking prices to track asset value.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Proactive Health Management</h2>
                <p className="text-lg">
                  Transition from reactive repairs to a data-driven maintenance strategy. Motiv ingests thousands of pages of exact-model service manuals and user uploads. 
                </p>

                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li><strong>Auto-populate (AI):</strong> Instantly generates a full factory-style schedule tailored to a specific make and model.</li>
                  <li><strong>Import Tasks (Receipts):</strong> Extracts dates, mileage, and specific tasks performed from uploaded receipts.</li>
                  <li><strong>Manual Entry:</strong> Log specific service history dates directly to ensure a current, comprehensive digital record.</li>
                </ul>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Ask Motiv: RAG-Powered Diagnostics</h2>
                <p className="text-lg">
                  Motiv does not rely on generic web scraping. The "Ask Motiv" interface acts as your AI Mechanical Expert, powered by a sophisticated Retrieval-Augmented Generation (RAG) framework utilizing <code>pgvector</code> for search.
                </p>
                <p className="text-lg">
                  When you ask a question, the AI retrieves the exact page or specification directly from your uploaded 400-page Owner's Manual or Workshop Manual. Whether identifying a strange engine vibration or interpreting a check engine light, you get targeted, parts-specific knowledge—not generic internet guesswork.
                </p>
                <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl mt-6">
                  <h3 className="text-xl font-medium mb-4 text-white">Multimodal Diagnostics</h3>
                  <p className="text-slate-300">
                    The interface allows you to attach photos of leaking components or videos of specific sounds to receive significantly more accurate diagnostic responses cross-referenced with your specific workshop manuals.
                  </p>
                </div>
              </section>

              <section className="space-y-6 pb-8">
                <h2 className="text-3xl font-semibold text-white">Beyond the Basics</h2>
                <p className="text-lg">
                  Enthusiasts eventually move from maintaining their cars to upgrading them. The Virtual Workshop provides the ultimate sandbox for planning builds, simulating performance gains, and sourcing precise aftermarket components based on mathematically sound, staged modification plans.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pointer-events-auto">
                  <a
                    href="https://motiv-azure.vercel.app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 pointer-events-auto"
                  >
                    Try the Demo
                  </a>
                  <a
                    href="https://github.com/skalamera/motiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-lg font-bold rounded-xl transition-all pointer-events-auto"
                  >
                    <GithubIcon />
                    View Code
                  </a>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-slate-800 border border-slate-600 text-slate-300 hover:text-white text-lg font-bold rounded-xl transition-all pointer-events-auto cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MotivDeepDive;