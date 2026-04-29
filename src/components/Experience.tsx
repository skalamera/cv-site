import React from 'react';
import { motion } from 'framer-motion';
import { jobs, experienceIntro } from '../data/cv-data';

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10 w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]"></div>

      <div className="flex items-center gap-4 mb-12">
        <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Work Experience</h2>
      </div>

      {/* Intro & Cards Grid */}
      <div className="mb-20 w-full">
        <p className="text-center text-lg text-slate-300 mb-12">
          Orchestrating global support operations and driving efficiency through <span className="text-white font-semibold">Agentic AI implementations, custom tooling, and cross-functional leadership</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experienceIntro.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#161b22]/80 border border-slate-700/50 rounded-xl p-5 hover:border-slate-500/50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <ZapIcon />
                {card.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {jobs.map((job, index) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col gap-6 max-w-4xl mx-auto"
          >
            {/* Content Header */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <div className="flex gap-4 items-center">
                   {/* Logo */}
                   {job.logoFile ? (
                     <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                       <img src={job.logoFile} alt={job.company} className="w-full h-full object-cover" />
                     </div>
                   ) : (
                     <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xl">
                       {job.company.charAt(0)}
                     </div>
                   )}
                   <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-white leading-tight">{job.company}</h3>
                    <div className="text-slate-400 text-sm mt-1">{job.role === "Technical Support Engineering Manager" || job.company === "Santifer iRepair" ? "New York, NY" : "Remote / Hybrid"}</div>
                   </div>
                </div>
              </div>
              
              <div className="mb-4">
                 <div className="text-primary font-medium text-base">{job.role}</div>
                 <div className="text-sm text-slate-400 font-mono mt-1">{job.period}</div>
              </div>

              {job.highlights && job.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {job.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-emerald-200 bg-emerald-900/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                      <span className="text-emerald-400">✧</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <ul className="space-y-4 text-slate-300 text-sm leading-relaxed mb-6">
                {job.description.map((desc, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-slate-600 mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;