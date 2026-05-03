import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const JedanaDeepDive: React.FC<Props> = ({ isOpen, onClose }) => {
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
            {/* Sticky Header with Close Button */}
            <div className="flex-shrink-0 z-20 flex justify-between items-center p-6 bg-slate-900 border-b border-slate-800 rounded-t-2xl">
              <h2 className="text-xl font-semibold text-white">Project Deep Dive: Jedana AI</h2>
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
                  Building Jedana AI: Intelligent Support Analytics
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
                  Historically, support management relies on manual oversight. Managers sample a handful of tickets and hope they represent the whole. I built Jedana AI to move from guessing to knowing.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
                  The platform evaluates agent quality, measures customer sentiment, and generates data-driven insights through an automated feedback loop. The architecture has three main modules: AgentEye for individual interaction quality, Customer Sentiment for macro-level trend analysis, and the Performance Review Dashboard for objective KPI measurement.
                </p>
              </header>

              <div className="my-10">
                <img 
                  src="/images/jedana/intro.png" 
                  alt="Jedana AI Intelligent Support Analytics Intro Slide" 
                  className="w-full rounded-xl border border-slate-700 shadow-xl bg-slate-800"
                />
              </div>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">AgentEye: Precision-Engineered Ticket QA Reviews</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg">
                    Manual Quality Assurance is labor-intensive and prone to human bias. AgentEye automates quality control. The Tabbed Reviews interface loads five recent tickets into an organized view. Managers stay within a single UI flow, increasing review velocity.
                  </p>
                </div>

                <div className="my-10 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <img 
                    src="/images/jedana/comparison.png" 
                    alt="Comparison of Traditional Quality Assurance vs Jedana Command Center" 
                    className="w-full rounded-lg shadow-md"
                  />
                  <p className="text-center text-sm text-slate-400 mt-4">Moving from random subjective sampling to smart targeting and objective rubrics.</p>
                </div>

                <h3 className="text-2xl font-medium text-white">Technical Mechanics of Ticket Selection</h3>
                <p className="text-lg">
                  The AgentEye interface uses three methods to populate a review session, handled in <code>static/js/agenteye.js</code>:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li><strong>Randomized Ticket Selection:</strong> Pulls 5 random Closed or Resolved tickets for a statistically unbiased sample.</li>
                  <li><strong>Recently Closed:</strong> Selects the 5 most recently closed tickets for a real-time pulse check.</li>
                  <li><strong>Smart Ticket Selection:</strong> Filters tickets by tags, priority, or status to investigate specific product regressions.</li>
                </ul>

                <h3 className="text-2xl font-medium text-white mt-8">The AI-Powered Analysis Engine</h3>
                <p className="text-lg">
                  The engine generates an Interaction Summary identifying the root cause and specific agent actions. For example, in a password reset interaction, the system tracks if the agent performed identity verification before issuing a reset link. This summary grounds the AI assessment in actual conversation history.
                </p>

                <h3 className="text-2xl font-medium text-white mt-8">Evaluation Rubric</h3>
                <p className="text-lg">
                  I implemented a standardized 5-star rubric to ensure feedback reliability. The AI provides preliminary ratings, synthesized into an Overall Performance Score.
                </p>

                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300 mt-4">
                  <li><strong>Communication Clarity:</strong> Assesses if the agent provided clear, actionable steps.</li>
                  <li><strong>Empathy & Understanding:</strong> Measures the agent's ability to acknowledge customer frustration.</li>
                  <li><strong>Problem-Solving Approach:</strong> Evaluates root cause identification and resolution effectiveness.</li>
                  <li><strong>Professionalism:</strong> Tracks if the agent remained courteous.</li>
                </ul>
                <p className="text-lg mt-4">
                  The system suggests Areas for Improvement. This turns a 30-minute manual process into a One-Click Confirmation workflow. Data commits to the database via <code>init_db.py</code>.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Customer Sentiment: Macro-Level Emotional Intelligence</h2>
                <p className="text-lg">
                  Understanding the collective voice of the customer across thousands of interactions is a strategic necessity. The Customer Sentiment module aggregates interactions into a district-wide narrative.
                </p>
                
                <h3 className="text-2xl font-medium text-white">Sentiment Scoring & Trend Data</h3>
                <p className="text-lg">
                  The system generates a Sentiment Trend visualization using a 0-100 score. It tracks four metrics per account:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li><strong>Overall Sentiment:</strong> A high-level score (e.g., 66 - Neutral/Mixed).</li>
                  <li><strong>Ticket Volume:</strong> The raw count of interactions in the period.</li>
                  <li><strong>Average Response:</strong> The speed of service measured in hours.</li>
                  <li><strong>Resolution Rate:</strong> The percentage of tickets successfully closed.</li>
                </ul>

                <h3 className="text-2xl font-medium text-white mt-8">Top Topics and Actionable Insights</h3>
                <p className="text-lg">
                  The AI categorizes interactions into themes. For instance, it identified "Schoology/LTI access" as a major concern area, specifically errors when resources fail to open in new tabs. The tool also captured insights regarding perceived data loss where users felt historical bookshelves were missing.
                </p>
                <p className="text-lg">
                  Jedana AI translates these sentiment trends into recommendations:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-lg text-slate-300">
                  <li>Publish specific migration guides detailing what transfers.</li>
                  <li>Enhance LTI UX so resource behavior matches browser expectations.</li>
                  <li>Consolidate follow-up logic to avoid noisy automated emails.</li>
                </ul>
              </section>

              <section className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">Performance Review Dashboard: The KPI Engine</h2>
                <p className="text-lg">
                  The Performance Review Dashboard moves analysis from qualitative to quantitative ranking.
                </p>

                <h3 className="text-2xl font-medium text-white">Algorithm Configuration</h3>
                <p className="text-lg">
                  The customizable scoring interface allows managers to adjust weights (1-100) for each metric. Users define if a higher or lower value is better (e.g., lower resolution time, higher CSAT).
                </p>

                <h3 className="text-2xl font-medium text-white mt-8">Peer Rankings and Individual Scorecards</h3>
                <p className="text-lg">
                  The system compares agents against their peers. An AI Scorecard might show an agent handled 196 concurrent chats with 96.7% SLA compliance, but flag a 23.5-hour resolution time against a 4-hour target. The system suggests management interventions, like scheduling a 1-on-1 to review call scripts or implementing time-blocking strategies.
                </p>
              </section>

              <section className="space-y-6 pb-8">
                <h2 className="text-3xl font-semibold text-white">The Unified System</h2>
                <p className="text-lg">
                  Jedana AI is a continuous feedback loop where AgentEye, Customer Sentiment, and Performance Review share data.
                </p>

                <div className="my-10">
                  <img 
                    src="/images/jedana/ecosystem.png" 
                    alt="A Unified Analytics Ecosystem" 
                    className="w-full rounded-xl border border-slate-700 shadow-lg bg-slate-800"
                  />
                </div>

                <div className="my-8">
                  <img 
                    src="/images/jedana/rubrics.png" 
                    alt="Standardized Evaluation Rubrics Visual" 
                    className="w-full max-w-2xl mx-auto rounded-xl border border-slate-700 shadow-lg"
                  />
                </div>

                <ul className="list-disc pl-6 space-y-4 text-lg text-slate-300">
                  <li><strong>Cross-Channel Metrics:</strong> The QA Score calculated in AgentEye feeds into the Performance Review ranking algorithm.</li>
                  <li><strong>Triggered Investigation:</strong> When concern areas appear in Customer Sentiment, managers use those tags to power Smart Ticket Selection in AgentEye.</li>
                  <li><strong>Validated Interventions:</strong> The suggested actions from an agent's scorecard are validated by tracking the Sentiment Trends of the districts they support.</li>
                </ul>

                <p className="text-lg mt-6">
                  Specialized logic is isolated in <code>static/js/agenteye.js</code> and <code>static/js/district_sentiment.js</code>. Core data processing is handled by <code>fd_metrics.py</code>. We share a CSS layer and initialize the unified database via <code>init_db.py</code>.
                </p>

                <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://jedana-app.vercel.app/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
                  >
                    Try the Demo
                  </a>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-slate-800 border border-slate-600 text-slate-300 hover:text-white text-lg font-bold rounded-xl transition-all cursor-pointer"
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

export default JedanaDeepDive;
