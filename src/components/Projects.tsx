import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/cv-data';
import { ExternalLink } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const Projects: React.FC = () => {
  const featured = projects.find(p => p.featured);
  const gridProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl font-bold text-white tracking-tight">Projects</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>

      {/* Flagship Project */}
      {featured && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative group"
        >
          {/* Subtle gold glow behind card */}
          <div className="absolute inset-0 bg-yellow-600/10 blur-3xl -z-10"></div>
          
          <div className="glass-panel border border-yellow-600/40 bg-[#1f1e14]/90 rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row gap-10 relative overflow-hidden">
            {/* Translucent yellow overlay inside the card */}
            <div className="absolute inset-0 bg-yellow-600/10 pointer-events-none"></div>
            
            {/* Left Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="w-20 h-20 bg-[#111827] rounded-xl border border-yellow-600/30 p-2 shadow-lg flex items-center justify-center shrink-0">
                  <img src="/mycareermax/mycareermax_logo.png" alt="myCareerMax" className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-yellow-900/30 text-yellow-500 text-xs font-semibold tracking-wide border border-yellow-700/50">
                  Top 10 Business App
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                mycareermax
              </h3>
              
              <p className="text-slate-400 leading-relaxed mb-8">
                {featured.description}
              </p>

              {featured.highlights && (
                <ul className="space-y-4 mb-10 flex-1">
                  {featured.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="mt-1 text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"/><path d="M9 7V2"/><path d="M15 7V2"/><path d="M12 7v5"/><path d="M5 17l-3-3 3-3"/><path d="M19 17l3-3-3-3"/><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/></svg>
                      </div>
                      <span className="text-slate-300 text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              <a href="https://github.com/skalamera/mycareermax" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-yellow-600/50 bg-yellow-900/20 text-yellow-500 text-sm font-bold hover:bg-yellow-900/40 transition-colors w-fit relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                View on GitHub
              </a>
            </div>
            
            {/* Right Column: KPI Cards & Award */}
            <div className="w-full lg:w-[280px] flex flex-col gap-6 shrink-0">
              
              {/* Award Image */}
              <div className="w-full flex items-center justify-center p-4 bg-slate-900/60 border border-slate-700/50 rounded-xl relative overflow-hidden group/award">
                <div className="absolute inset-0 bg-yellow-600/5 transition-opacity group-hover/award:bg-yellow-600/10 pointer-events-none"></div>
                <img 
                  src="/mycareermax/top10_award.png" 
                  alt="Top 10 Award" 
                  className="w-48 object-contain filter drop-shadow-lg transition-transform duration-500 group-hover/award:scale-105" 
                />
              </div>

              {/* KPIs */}
              {featured.kpis && (
                <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                  {featured.kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-[#111827]/80 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center justify-center text-center flex-1 lg:flex-none min-w-[140px]">
                      <div className="text-3xl font-bold text-yellow-500 mb-2">{kpi.value}</div>
                      <div className="text-xs text-slate-400">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel p-6 rounded-xl flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center p-2 shrink-0">
                {project.logo ? (
                  <img src={project.logo} alt={project.title} className="w-full h-full object-contain" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                )}
              </div>
              <div className="flex gap-3 text-slate-400">
                <a href="#" className="hover:text-primary transition-colors"><GithubIcon /></a>
                <a href="#" className="hover:text-primary transition-colors"><ExternalLink size={20} /></a>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
            
            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            
            <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-500 mt-auto">
              {project.techStack.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;