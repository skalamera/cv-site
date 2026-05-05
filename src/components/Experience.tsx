import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { jobs, experienceIntro } from '../data/cv-data';
import StarWarsExperienceModal from './StarWarsExperienceModal';

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Experience: React.FC = () => {
  const [isStarWarsOpen, setIsStarWarsOpen] = useState(false);

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

      <div className="mb-12 flex justify-center sm:justify-start">
        <div 
          className="flex flex-wrap items-center justify-center sm:justify-start gap-4 rounded-xl border border-yellow-300/30 p-4 sm:p-5 shadow-lg relative overflow-hidden"
          style={{ background: '#000' }}
        >
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 12% 18%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 38% 8%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 55% 28%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 78% 16%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 91% 36%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 6% 52%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 24% 64%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 48% 72%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 72% 68%, #fff 0 1px, transparent 2px),
                radial-gradient(circle at 86% 84%, #fff 0 1px, transparent 2px)
              `,
              backgroundSize: '100% 100%'
            }}
          ></div>
          <div 
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              backgroundImage: `
                radial-gradient(circle, rgba(255, 255, 255, 0.9) 0 1px, transparent 1.5px),
                radial-gradient(circle, rgba(255, 255, 255, 0.7) 0 1px, transparent 1.5px)
              `,
              backgroundPosition: '0 0, 90px 140px',
              backgroundSize: '210px 260px, 310px 360px'
            }}
          ></div>
          <button
            type="button"
            onClick={() => setIsStarWarsOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-yellow-300/40 bg-yellow-300/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-yellow-100 shadow-[0_0_24px_rgba(250,204,21,0.12)] transition hover:border-yellow-200 hover:bg-yellow-300/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          >
            <Rocket size={17} aria-hidden="true" />
            <span>View Star Wars Experience</span>
          </button>
          <a
            href="https://github.com/skalamera/starwars-experience"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/80 px-5 py-3 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-700 w-fit"
          >
            <GithubIcon />
            <span>View Code</span>
          </a>
        </div>
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
                    <div className="text-slate-400 text-sm mt-1">{job.location}</div>
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

      {isStarWarsOpen && (
        <StarWarsExperienceModal isOpen={isStarWarsOpen} onClose={() => setIsStarWarsOpen(false)} />
      )}
    </section>
  );
};

export default Experience;
