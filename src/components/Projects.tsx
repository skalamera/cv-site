import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, techStack as allTechStack } from '../data/cv-data';
import { ExternalLink, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import JedanaDeepDive from './JedanaDeepDive';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const getTechIcon = (techName: string) => {
  if (techName.toLowerCase() === "html/css") {
    return [
      allTechStack.find(c => c.category === "DEV")?.skills.find(s => s.name === "HTML")?.icon,
      allTechStack.find(c => c.category === "DEV")?.skills.find(s => s.name === "CSS")?.icon
    ];
  }
  for (const category of allTechStack) {
    const found = category.skills.find(s => techName.toLowerCase().includes(s.name.toLowerCase()));
    if (found) return found.icon;
  }
  return null;
};

const Projects: React.FC = () => {
  const [showJedanaDeepDive, setShowJedanaDeepDive] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const featuredProjects = projects.filter(p => p.featured && p.id !== "stephen-cv-site");
  const carouselProjectIds = ["motiv-proj", "jayobee", "queuety", "harry"];
  const carouselProjects = carouselProjectIds
    .map(id => projects.find(project => project.id === id))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const activeProject = carouselProjects[carouselIndex];
  const paginateCarousel = (direction: number) => {
    setCarouselDirection(direction);
    setCarouselIndex((current) => (current + direction + carouselProjects.length) % carouselProjects.length);
  };
  const setCarouselProject = (index: number) => {
    setCarouselDirection(index > carouselIndex ? 1 : -1);
    setCarouselIndex(index);
  };
  const handleSwipeEnd = (x: number, y: number) => {
    if (!swipeStart.current) return;
    const offsetX = x - swipeStart.current.x;
    const offsetY = y - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(offsetX) > 50 && Math.abs(offsetX) > Math.abs(offsetY) * 1.2) {
      paginateCarousel(offsetX < 0 ? 1 : -1);
    }
  };

  return (
    <section id="projects" className="py-24">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl font-bold text-white tracking-tight">Projects</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.map((featured, index) => {
        // Theme variables based on featured.theme
        const glowColor = featured.theme === 'blue' ? 'bg-blue-600/10' : featured.theme === 'purple' ? 'bg-purple-600/10' : 'bg-yellow-600/10';
        const borderColor = featured.theme === 'blue' ? 'border-blue-600/40' : featured.theme === 'purple' ? 'border-purple-600/40' : 'border-yellow-600/40';
        const innerBorderColor = featured.theme === 'blue' ? 'border-blue-600/30' : featured.theme === 'purple' ? 'border-purple-600/30' : 'border-yellow-600/30';
        const textColor = featured.theme === 'blue' ? 'text-blue-400' : featured.theme === 'purple' ? 'text-purple-400' : 'text-yellow-500';
        const badgeBg = featured.theme === 'blue' ? 'bg-blue-900/30' : featured.theme === 'purple' ? 'bg-purple-900/30' : 'bg-yellow-900/30';
        const badgeBorder = featured.theme === 'blue' ? 'border-blue-700/50' : featured.theme === 'purple' ? 'border-purple-700/50' : 'border-yellow-700/50';
        const btnHoverBg = featured.theme === 'blue' ? 'hover:bg-blue-900/40' : featured.theme === 'purple' ? 'hover:bg-purple-900/40' : 'hover:bg-yellow-900/40';
        const btnBorder = featured.theme === 'blue' ? 'border-blue-600/50' : featured.theme === 'purple' ? 'border-purple-600/50' : 'border-yellow-600/50';
        const btnBg = featured.theme === 'blue' ? 'bg-blue-900/20' : featured.theme === 'purple' ? 'bg-purple-900/20' : 'bg-yellow-900/20';

        return (
          <motion.div 
            key={featured.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-16 relative group"
          >
            {/* Subtle glow behind card */}
            <div className={`absolute inset-0 ${glowColor} blur-3xl -z-10`}></div>
            
            <div className={`glass-panel border ${borderColor} bg-[#1f1e14]/90 rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row gap-10 relative overflow-hidden`}>
              {/* Translucent overlay inside the card */}
              <div className={`absolute inset-0 ${glowColor} pointer-events-none`}></div>
              
              {/* Left Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className={`w-20 h-20 bg-[#111827] rounded-xl border ${innerBorderColor} p-2 shadow-lg flex items-center justify-center shrink-0`}>
                    <img src={featured.logo || '/profile.png'} alt={featured.title} className="w-full h-full object-contain rounded-lg" />
                  </div>
                  {featured.metrics && (
                    <div className={`ml-6 px-4 py-1.5 rounded-full ${badgeBg} ${textColor} text-xs font-semibold tracking-wide border ${badgeBorder}`}>
                      {featured.metrics}
                    </div>
                  )}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  {featured.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed mb-8">
                  {featured.description}
                </p>

                {featured.highlights && (
                  <ul className="space-y-4 mb-8 flex-1">
                    {featured.highlights.map((highlight, idx) => {
                      const text = highlight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
                      return (
                        <li key={idx} className="flex items-start gap-4">
                          <div className={`mt-1 ${textColor}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"/><path d="M9 7V2"/><path d="M15 7V2"/><path d="M12 7v5"/><path d="M5 17l-3-3 3-3"/><path d="M19 17l3-3-3-3"/><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/></svg>
                          </div>
                          <span className="text-slate-300 text-sm" dangerouslySetInnerHTML={{ __html: text }}></span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <ul className="flex flex-wrap gap-2 mb-8">
                  {featured.techStack.map(tech => {
                    const icons = getTechIcon(tech);
                    return (
                      <li key={tech} className={`flex items-center gap-1.5 px-3 py-1.5 bg-[#111827] border ${innerBorderColor} rounded-md text-xs font-medium text-slate-300 shadow-sm`}>
                        {Array.isArray(icons) 
                          ? icons.map((ic, i) => ic && <img key={i} src={ic} alt={tech} className="w-4 h-4 object-contain" />)
                          : (icons && <img src={icons as string} alt={tech} className="w-4 max-h-4 object-contain" />)
                        }
                        {tech}
                      </li>
                    );
                  })}
                </ul>

                <div className="flex gap-4 relative z-10 flex-wrap mt-6">
                  {featured.link && featured.id !== 'jedana' && (
                    <a href={featured.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border ${btnBorder} ${btnBg} ${textColor} text-sm font-bold ${btnHoverBg} transition-colors w-fit`}>
                      <ExternalLink size={18} />
                      View Project
                    </a>
                  )}
                  {featured.id === 'jedana' && (
                    <a href="https://jedana-app.vercel.app/apps" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20 text-sm font-bold transition-all w-fit`}>
                      <ExternalLink size={18} />
                      Try Demo
                    </a>
                  )}
                  {featured.github && (
                    <a href={featured.github} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-colors w-fit`}>
                      <GithubIcon />
                      View Code
                    </a>
                  )}
                  {featured.id === 'jedana' && (
                    <button
                      onClick={() => setShowJedanaDeepDive(true)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-blue-500/30 bg-blue-900/30 text-blue-300 text-sm font-bold hover:bg-blue-900/60 hover:border-blue-500/50 transition-colors w-fit`}
                    >
                      <Activity size={18} />
                      Read Deep Dive
                    </button>
                  )}
                </div>
              </div>
              
              {/* Right Column: KPI Cards & Award (if any) */}
              {(featured.kpis || featured.id === 'mycareermax') && (
                <div className="w-full lg:w-[340px] flex flex-col gap-6 shrink-0">
                  
                  {/* Award Image for mycareermax specifically */}
                  {featured.id === 'mycareermax' && (
                    <div className="w-full flex items-center justify-center p-2 sm:p-3 lg:p-2 relative group/award">
                      <img 
                        src="/mycareermax/top15_award.png" 
                        alt="Top 10 Award" 
                        className="w-64 sm:w-72 lg:w-80 max-w-full object-contain filter drop-shadow-lg transition-transform duration-500 group-hover/award:scale-105" 
                      />
                    </div>
                  )}
    
                  {/* KPIs */}
                  {featured.kpis && (
                    <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                      {featured.kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-[#111827]/80 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center justify-center text-center flex-1 lg:flex-none min-w-[140px]">
                          <div className={`text-3xl font-bold ${textColor} mb-2`}>{kpi.value}</div>
                          <div className="text-xs text-slate-400">{kpi.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      <JedanaDeepDive isOpen={showJedanaDeepDive} onClose={() => setShowJedanaDeepDive(false)} />

      {/* Project Carousel */}
      <div className="relative">
        <div className="mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">More Projects</p>
            <p className="text-sm text-slate-400 mt-1">
              {carouselIndex + 1} / {carouselProjects.length}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden px-9 sm:px-14">
          <button
            type="button"
            onClick={() => paginateCarousel(-1)}
            className="absolute left-0 top-36 md:top-1/2 z-20 w-9 h-9 md:w-10 md:h-10 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-950/90 text-slate-300 hover:text-white hover:border-primary/60 hover:bg-slate-800 transition-colors flex items-center justify-center shadow-lg"
            aria-label="Previous project"
          >
            <ChevronLeft size={22} />
          </button>

          <AnimatePresence initial={false} custom={carouselDirection} mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                custom={carouselDirection}
                initial={{ opacity: 0, x: carouselDirection >= 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: carouselDirection >= 0 ? -80 : 80 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                onPointerDown={(event) => {
                  if (event.pointerType === 'mouse') return;
                  swipeStart.current = { x: event.clientX, y: event.clientY };
                }}
                onPointerUp={(event) => {
                  if (event.pointerType === 'mouse') return;
                  handleSwipeEnd(event.clientX, event.clientY);
                }}
                onPointerCancel={() => {
                  swipeStart.current = null;
                }}
                className="glass-panel p-6 md:p-8 rounded-xl flex flex-col min-h-[460px] md:min-h-[390px] group touch-pan-y select-none"
              >
                <div className={`flex flex-1 gap-8 ${activeProject.id === 'jayobee' ? 'flex-col lg:flex-row lg:items-center' : 'flex-col'}`}>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center p-2 shrink-0">
                        {activeProject.logo ? (
                          <img src={activeProject.logo} alt={activeProject.title} className="w-full h-full object-contain" />
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-primary"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        )}
                      </div>
                      <div className="flex gap-3 text-slate-400">
                        {activeProject.github && <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><GithubIcon /></a>}
                        {activeProject.link && <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><ExternalLink size={20} /></a>}
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-200 mb-3 group-hover:text-primary transition-colors">{activeProject.title}</h3>

                    <p className="text-slate-400 text-sm md:text-base mb-6 flex-grow leading-relaxed">
                      {activeProject.description}
                    </p>

                    <ul className="flex flex-wrap gap-2 mt-auto">
                      {activeProject.techStack.map(tech => {
                        const icons = getTechIcon(tech);
                        return (
                          <li key={tech} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-700/50 rounded-md text-[11px] font-medium text-slate-300">
                            {Array.isArray(icons)
                              ? icons.map((ic, i) => ic && <img key={i} src={ic} alt={tech} className="w-3.5 h-3.5 object-contain" />)
                              : (icons && <img src={icons as string} alt={tech} className="w-3.5 max-h-3.5 object-contain" />)
                            }
                            {tech}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {activeProject.id === 'jayobee' && (
                    <div className="w-full lg:w-[42%] shrink-0">
                      <img
                        src="/jayobee/pipeline.png"
                        alt="Jayobee pipeline"
                        className="w-full max-h-[280px] rounded-lg border border-slate-700/50 bg-slate-950/40 object-contain shadow-xl shadow-slate-950/30"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => paginateCarousel(1)}
            className="absolute right-0 top-36 md:top-1/2 z-20 w-9 h-9 md:w-10 md:h-10 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-950/90 text-slate-300 hover:text-white hover:border-primary/60 hover:bg-slate-800 transition-colors flex items-center justify-center shadow-lg"
            aria-label="Next project"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {carouselProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setCarouselProject(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === carouselIndex ? 'bg-[var(--primary)]' : 'bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`View ${project.title}`}
              aria-current={index === carouselIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
