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

const MyCareerMaxDeepDive: React.FC<Props> = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-5xl my-4 md:my-8 mx-4 bg-slate-900 border border-yellow-900/40 rounded-2xl shadow-2xl flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] pointer-events-auto"
          >
            <div className="flex-shrink-0 z-20 flex justify-between items-center p-6 bg-slate-900 border-b border-slate-800 rounded-t-2xl">
              <h2 className="text-xl font-semibold text-white">Project Deep Dive: myCareerMax</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close myCareerMax deep dive"
              >
                <X size={20} />
              </button>
            </div>

            <div ref={contentRef} className="p-8 md:p-12 text-slate-300 space-y-16 overflow-y-auto flex-1 custom-scrollbar">
              <header className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Building myCareerMax: An AI Career Operating System
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                  Job search work usually spreads across job boards, resume files, cover-letter drafts, browser tabs, and spreadsheets. I built myCareerMax to pull that workflow into one system: discover roles, score fit, generate tailored documents, track applications, and keep the candidate moving.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                  The product shipped as a Python and Flask web application, an Android app shell, and a companion Chrome extension. Under the hood, it combines OpenAI document generation, Azure SQL persistence, external job-search APIs, Stripe subscriptions, email automation, and mobile-friendly file handling.
                </p>
              </header>

              <div className="my-10">
                <img
                  src="/mycareermax/2.png"
                  alt="myCareerMax AI career toolkit product overview"
                  className="w-full rounded-xl border border-slate-700 shadow-xl bg-slate-800"
                />
              </div>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Product Loop: Discover, Execute, Validate</h2>
                <p className="text-lg">
                  The core user flow is simple: upload a resume, search for roles, generate application material from a selected listing, then track every opportunity in a status-based dashboard. That loop turns job searching from a set of isolated chores into a repeatable operating system.
                </p>

                <div className="my-10 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <img
                    src="/mycareermax/3.png"
                    alt="myCareerMax feature ecosystem showing discovery, execution, and validation"
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-center text-sm text-slate-400 mt-4">
                    The app organizes the job search into discovery, execution, and validation phases.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-3">AI Job Search</h3>
                    <p className="text-slate-300">
                      The search screen lets users query by title, location, and remote preference. Results render as rich job cards with details, benefits, salary context, save actions, and a document-generation entry point.
                    </p>
                  </div>
                  <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-3">Resume Builder</h3>
                    <p className="text-slate-300">
                      The resume builder uses structured prompts to rewrite or format resume sections for ATS readability while preserving the candidate's work history, education, skills, and keyword targets.
                    </p>
                  </div>
                  <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-sm">
                    <h3 className="text-xl font-semibold text-white mb-3">ATS Resume Report</h3>
                    <p className="text-slate-300">
                      Users can upload a DOCX resume or paste text directly. The backend extracts the resume text and returns an HTML report with section-level scoring, keyword feedback, and improvement actions.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">The Match-to-Apply Pipeline</h2>
                <p className="text-lg">
                  The most important technical feature is the match-to-apply path. A user starts with a resume and a live role. The system feeds that context into OpenAI-backed generation routes, then produces tailored documents and candidate-fit signals directly from the selected listing.
                </p>

                <div className="my-10">
                  <img
                    src="/mycareermax/5.png"
                    alt="myCareerMax match to apply AI processing pipeline"
                    className="w-full rounded-xl border border-slate-700 shadow-lg bg-slate-800"
                  />
                </div>

                <h3 className="text-2xl font-medium text-white">What the Backend Owns</h3>
                <p className="text-lg">
                  The Flask backend is the control plane. It handles authentication, profile data, resume uploads, saved jobs, document records, Stripe subscription gates, and generation endpoints. The main application uses <code>pyodbc</code> against Azure SQL, while supporting modules isolate resume generation and job-alert routines.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li><strong>Document ingestion:</strong> DOCX files are parsed into resume text, stored against the user, and reused across resume reports, cover letters, and the career coach.</li>
                  <li><strong>Generation endpoints:</strong> Resume and cover-letter routes wrap user data, role context, and formatting rules into controlled OpenAI prompts.</li>
                  <li><strong>Saved job workflow:</strong> The dashboard groups saved roles by status, supports transitions like Applied or Interviewing, and ties generated documents back to the job and company.</li>
                  <li><strong>Subscription logic:</strong> Stripe checkout and billing portal routes gate premium capabilities without pushing billing state into the client.</li>
                </ul>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Automation Beyond the Browser</h2>
                <p className="text-lg">
                  myCareerMax was not just a single Flask site. It grew into a small ecosystem of companion surfaces that meet users where the work happens.
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-start bg-slate-800/50 border border-slate-700 p-8 rounded-xl">
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">MagicMax Chrome Extension</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      MagicMax connects the browser to the web app using a PIN-based authentication flow and Chrome local storage. Once connected, it can show the active resume, display saved jobs, and move users back into the dashboard without forcing them to leave the page they are researching.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">Android App Shell</h3>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      The Android app wraps the web product in a native WebView, adds a navigation drawer for core routes like CareerClick, tools, resume scanning, interview prep, and Career Coach, and handles file uploads and downloads for mobile users.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-white">Job Alerts and Profile Intelligence</h3>
                <p className="text-lg">
                  The automation layer reads user preferences from the profile, fetches matching job listings, and sends email alerts with role details and application links. This turns myCareerMax from a passive document tool into an active job-search assistant.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Architecture at a Glance</h2>
                <p className="text-lg">
                  The system favors pragmatic integration over framework ceremony. Flask routes orchestrate user flows, Azure SQL stores account and document state, OpenAI handles language generation, third-party job data powers discovery, and deployment scripts support containerized Azure hosting.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li><strong>Frontend:</strong> Server-rendered HTML templates with Bootstrap, jQuery interactions, Quill editing for generated cover letters, and mobile-specific WebView handling.</li>
                  <li><strong>Backend:</strong> Python and Flask routes for auth, dashboard data, generation, document download, checkout, profile management, and job search.</li>
                  <li><strong>Data:</strong> Azure SQL tables for users, subscriptions, resumes, documents, saved jobs, and profile preferences.</li>
                  <li><strong>AI services:</strong> OpenAI chat completions for resume rewriting, ATS analysis, cover-letter generation, and career-coach responses grounded in uploaded resume context.</li>
                  <li><strong>Distribution:</strong> Docker and Azure for the web app, a Google Play Android wrapper, and a Chrome extension companion for browser-based workflows.</li>
                </ul>
              </section>

              <section className="space-y-6 pb-8">
                <h2 className="text-3xl font-semibold text-white">Traction and Takeaways</h2>
                <p className="text-lg">
                  The project became a real distribution experiment, not just a local demo. The portfolio card summarizes myCareerMax as a Top 15 new business app across 15 countries with roughly 20,000 global downloads. Early Google Play reporting also showed top new business rankings in 17 countries within the first 24 days.
                </p>

                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <img
                      src="/mycareermax/6.png"
                      alt="myCareerMax rapid scaling from launch to top 15 in 24 days"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-center text-sm text-slate-400 mt-4">Rapid early ranking movement after launch.</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <img
                      src="/mycareermax/top ranked business app on play store in 17 countries.png"
                      alt="myCareerMax Play Store performance report listing country rankings"
                      className="w-full rounded-lg shadow-md"
                    />
                    <p className="text-center text-sm text-slate-400 mt-4">Google Play performance evidence from the launch window.</p>
                  </div>
                </div>

                <p className="text-lg">
                  The main engineering lesson was product-surface coordination. A resume builder alone is useful. A job board alone is useful. But the differentiated value came from connecting profile data, live listings, generated documents, saved-job state, alerts, and mobile access into one loop.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://github.com/skalamera/mycareermax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-lg font-bold rounded-xl transition-all"
                  >
                    <GithubIcon />
                    View Code
                  </a>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyCareerMaxDeepDive;
