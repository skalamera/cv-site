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

const JayobeeDeepDive: React.FC<Props> = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-5xl my-4 md:my-8 mx-4 bg-slate-900 border border-blue-900/40 rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] pointer-events-auto"
          >
            <div className="flex-shrink-0 z-20 flex justify-between items-center p-6 bg-slate-900 border-b border-slate-800 rounded-t-2xl">
              <h2 className="text-xl font-semibold text-white">Project Deep Dive: Jayobee</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close Jayobee deep dive"
              >
                <X size={20} />
              </button>
            </div>

            <div ref={contentRef} className="p-8 md:p-12 text-slate-300 space-y-16 overflow-y-auto flex-1 custom-scrollbar">
              <header className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Jayobee: The AI-Powered Application Frontier
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                  The modern job search has become a digital void governed by algorithmic gatekeeping. Jayobee is an advanced Chrome Extension designed to streamline the job application process using generative AI, shifting candidates from a passive participant to an active leader.
                </p>

                <div className="my-10">
                  <img
                    src="/jayobee/jayobee_infographic.png"
                    alt="Jayobee Infographic"
                    className="w-full rounded-xl border border-slate-700 shadow-xl bg-slate-800"
                  />
                </div>

                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                  Operating via Manifest V3 background service workers and utilizing Google Gemini 2.5 Flash, it serves as a high-efficiency command center. It leverages DOM parsing to structure unstructured web data, providing instant application tailoring to navigate sophisticated ATS filtering.
                </p>
              </header>

              <div className="my-10">
                <img
                  src="/jayobee/pipeline.png"
                  alt="Jayobee pipeline overview"
                  className="w-full rounded-xl border border-slate-700 shadow-xl bg-slate-800"
                />
              </div>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Generative Document Engine</h2>
                <p className="text-lg">
                  Generic resumes are a strategic liability. Jayobee’s generative engine creates "Tailored CVs" utilizing job-specific vocabulary to bypass ATS filters and capture recruiter attention.
                </p>

                <div className="my-10 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <img
                    src="/jayobee/custom prompt.png"
                    alt="Jayobee custom prompts"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-center text-sm text-slate-400 mt-4">
                    Dynamic Q&A context allows the system to generate "Active Tailored Resume Text" based on personalized constraints.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-3">Tailored CV (HTML-PDF)</h3>
                    <p className="text-slate-300">
                      Rewrites summaries and bullet points to mirror JD vocabulary. This ensures high keyword density and relevance, significantly increasing the probability of passing automated filters.
                    </p>
                  </div>
                  <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-3">Metric-Driven Cover Letters</h3>
                    <p className="text-slate-300">
                      Focuses on punchy, quantitative achievements. This replaces corporate filler with hard evidence, making a compelling case for the candidate's immediate impact.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Master Resume Pipeline & AI Audit System</h2>
                <p className="text-lg">
                  The effectiveness of the AI is dependent on the "Ground Truth" foundation: the Master Resume. Jayobee analyzes your resume and reveals a brutal yet honest match score.
                </p>

                <div className="my-10">
                  <img
                    src="/jayobee/AI Resume ATS Audit.png"
                    alt="Jayobee ATS Audit Interface"
                    className="w-full rounded-xl border border-slate-700 shadow-lg bg-slate-800"
                  />
                </div>

                <h3 className="text-2xl font-medium text-white">Understanding the Audit</h3>
                <p className="text-lg">
                  The system evaluates the extracted JD data against the Master Resume to generate a diagnostic output. A rejection is no longer a mystery; it is a direct report on keyword alignment.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li><strong>Top Strengths:</strong> Highlights the use of quantifiable metrics.</li>
                  <li><strong>Weaknesses:</strong> Detects inconsistent metric usage or weak verbs, allowing users to pivot instantly.</li>
                  <li><strong>Highly Actionable Steps:</strong> Provides guidance to rephrase entries for maximum ATS impact.</li>
                </ul>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">"AI Apply": Advanced DOM Automation</h2>
                <p className="text-lg">
                  To achieve high-scale automation, your toolset must handle a gauntlet of platforms. "AI Apply" automates the "last mile"—the interaction with diverse ATS portals.
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-start bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">Portal Handlers</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      The system maintains dedicated scripts for major platforms: Workday, Greenhouse, Ashby, Lever, LinkedIn, iCIMS, and Taleo. It detects form inputs, dropdowns, and patterns to bypass manual entry.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">Generic Fallback</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      In the absence of a dedicated script, a Generic handler maps the unknown DOM structure to the user's data schema, acting as an architectural safety net for any web form.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-white">Tracking & Lifecycle State</h3>
                <p className="text-lg">
                  A centralized tracker manages the pipeline. Whether the portal is Greenhouse or a legacy system, users can trigger "AI Apply" or LinkedIn messages from a single interface to maintain consistent data.
                </p>
                <div className="my-10 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <img
                    src="/jayobee/Tracker tab.png"
                    alt="Jayobee Job Tracker"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-center text-sm text-slate-400 mt-4">
                    The active workspace categorizes jobs from "Pipeline" to "Saved" to "Interviewing" and finally "Archived".
                  </p>
                </div>
              </section>

              <section className="space-y-6 pb-8">
                <h2 className="text-3xl font-semibold text-white">Architecture & Technology</h2>
                <p className="text-lg">
                  Jayobee utilizes the Chrome Extension Manifest V3 (MV3) framework to interact directly with the user’s browsing context, ensuring privacy and speed without the latency of external servers.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li><strong>Extension Framework:</strong> Chrome Extension Manifest V3, employing <code>background.js</code> for state coordination and content scripts for DOM traversal.</li>
                  <li><strong>AI Engine:</strong> Google Gemini 2.5 Flash API handles extraction, structuring, and prompt generation locally.</li>
                  <li><strong>PDF Processing:</strong> <code>pdf.js</code> runs in an offscreen document for parsing, while lightweight JS handles generation.</li>
                  <li><strong>Data Security:</strong> By utilizing ActiveTab and Local Storage, all sensitive resume data and API keys remain localized in the browser.</li>
                </ul>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pointer-events-auto">
                  <a
                    href="https://github.com/skalamera/jd-extractor"
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

export default JayobeeDeepDive;