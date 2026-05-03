import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, techStack as allTechStack } from '../data/cv-data';
import { Database, Cpu, MessageSquare, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { AttackTracker } from './AttackTracker';
import PortfolioDeepDive from './PortfolioDeepDive';

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

const steps = [
  {
    id: 'query',
    title: '1. User Input',
    desc: 'A visitor asks a question via the floating React chat interface. The request is securely routed to a Vercel Serverless Function, ensuring API keys remain hidden from the client browser.',
    icon: <MessageSquare size={24} className="text-cyan-400" />,
    color: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'border-cyan-500/30',
    iconBg: 'bg-cyan-500/10',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'firewall',
    title: '2. AI Firewall (Guardian)',
    desc: 'Before processing begins, a lightweight Gemini Flash model evaluates the raw input. It acts as an active firewall, detecting prompt injections or jailbreak attempts and blocking them instantly to protect the agent\'s persona.',
    icon: <ShieldCheck size={24} className="text-rose-400" />,
    color: 'from-rose-500/20 to-rose-500/5',
    borderColor: 'border-rose-500/30',
    iconBg: 'bg-rose-500/10',
    tools: ['Gemini', 'Node.js']
  },
  {
    id: 'embed',
    title: '3. Vector Embedding',
    desc: 'Once cleared by the firewall, the user\'s text is passed to Google\'s embedding model. It translates the semantic meaning of the question into a high-dimensional mathematical vector for similarity comparison.',
    icon: <Activity size={24} className="text-purple-400" />,
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30',
    iconBg: 'bg-purple-500/10',
    tools: ['Gemini']
  },
  {
    id: 'retrieve',
    title: '4. RAG Retrieval',
    desc: 'The vector is sent to a Pinecone vector database containing embedded chunks of my resume and source code. Pinecone performs a nearest-neighbor search to retrieve the most highly relevant context.',
    icon: <Database size={24} className="text-emerald-400" />,
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    tools: ['Pinecone']
  },
  {
    id: 'generate',
    title: '5. LLM Generation',
    desc: 'The primary Gemini 2.5 Flash model receives the original question alongside the retrieved context and strict system instructions. It synthesizes this data to generate a precise, persona-aligned response.',
    icon: <Cpu size={24} className="text-blue-400" />,
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10',
    tools: ['Gemini']
  },
  {
    id: 'observability',
    title: '6. Telemetry & Observability',
    desc: 'Every step of the pipeline is silently monitored by Langfuse. It captures full execution traces, latency metrics, and token usage, and automatically tags any malicious attempts for future analysis.',
    icon: <Activity size={24} className="text-amber-400" />,
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    tools: ['Langfuse']
  },
  {
    id: 'evals',
    title: '7. Closed-Loop CI/CD',
    desc: 'A nightly GitHub Action queries Langfuse for newly thwarted attacks. It automatically converts these failed injections into Promptfoo regression tests, ensuring the CI/CD gate permanently immunizes the system against known vulnerabilities.',
    icon: <Database size={24} className="text-indigo-400" />,
    color: 'from-indigo-500/20 to-indigo-500/5',
    borderColor: 'border-indigo-500/30',
    iconBg: 'bg-indigo-500/10',
    tools: ['Promptfoo']
  }
];

const AIPortfolioCard: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const featured = projects.find(p => p.id === "stephen-cv-site");

  if (!featured) return null;

  const nextStep = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const glowColor = 'bg-purple-600/10';
  const borderColor = 'border-purple-600/40';
  const innerBorderColor = 'border-purple-600/30';
  const textColor = 'text-purple-400';
  const badgeBg = 'bg-purple-900/30';
  const badgeBorder = 'border-purple-700/50';

  return (
    <section className="mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative group"
      >
        <div className={`absolute inset-0 ${glowColor} blur-3xl -z-10`}></div>
        
        <div className={`glass-panel border ${borderColor} bg-[#1f1e14]/90 rounded-2xl p-8 lg:p-10 flex flex-col gap-10 relative overflow-hidden`}>
          <div className={`absolute inset-0 ${glowColor} pointer-events-none`}></div>
          
          {/* Top Content: Project Info */}
          <div className="flex-1 flex flex-col relative z-10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0 mb-8">
              <div className="flex items-center gap-4 md:gap-5 order-2 md:order-1">
                <div className="w-16 h-16 md:w-28 md:h-28 flex items-center justify-center shrink-0">
                  <img src={featured.logo || '/profile.png'} alt={featured.title} className="w-full h-full object-cover rounded-xl shadow-lg" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">AI Portfolio & CV</h3>
                  <span className="text-lg md:text-2xl text-slate-400 mt-1">(skalamera.me)</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 pt-2 order-1 md:order-2 w-full md:w-auto">
                <AttackTracker />
                <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full">
                  <div className={`px-3 py-1.5 rounded-full ${badgeBg} ${textColor} text-xs font-semibold tracking-wide border ${badgeBorder} max-w-full overflow-hidden text-ellipsis whitespace-normal md:whitespace-nowrap`}>
                    RAG (Retrieval-Augmented Generation)
                  </div>
                  <div className={`px-3 py-1.5 rounded-full ${badgeBg} ${textColor} text-xs font-semibold tracking-wide border ${badgeBorder} shrink-0`}>
                    Self-healing
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-8">
              {featured.description}
            </p>

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

            <div className="flex gap-4 flex-wrap mt-6">
              {featured.github && (
                <a href={featured.github} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-colors w-fit`}>
                  <GithubIcon />
                  View Code
                </a>
              )}
              <button
                onClick={() => setShowDeepDive(true)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-purple-500/30 bg-purple-900/30 text-purple-300 text-sm font-bold hover:bg-purple-900/60 hover:border-purple-500/50 transition-colors w-fit`}
              >
                <Activity size={18} />
                Read Deep Dive
              </button>
            </div>
          </div>

          <PortfolioDeepDive isOpen={showDeepDive} onClose={() => setShowDeepDive(false)} />

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-600/30 to-transparent my-2 relative z-10"></div>

          {/* Bottom Content: Architecture Visualization */}
          <div className="relative z-10 pt-4">
            <h4 className="text-xl font-bold text-white tracking-tight mb-8">LLMOps Architecture</h4>
            
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Interactive Graph (Left/Top) */}
              <div className="w-full lg:w-1/2 flex flex-col gap-3 relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-slate-800/80 z-0 hidden lg:block"></div>
                
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;
                  
                  return (
                    <div 
                      key={step.id}
                      onClick={() => setActiveStep(index)}
                      className={`relative z-10 flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                        isActive ? `bg-[#1f1e14] border ${step.borderColor} shadow-lg shadow-${step.color.split('-')[1]}/20` : 
                        isPast ? 'opacity-80 hover:opacity-100 hover:bg-slate-800/50' : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? step.iconBg : 'bg-slate-800/80'}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                          {step.title}
                        </h4>
                      </div>
                      {isActive && (
                        <motion.div layoutId="indicator" className="w-1.5 h-8 bg-purple-500/80 rounded-full ml-auto hidden lg:block" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Details Panel (Right/Bottom) */}
              <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left min-h-[280px] justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center lg:items-start bg-[#111827]/60 p-6 rounded-2xl border border-slate-700/50 w-full"
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl border ${steps[activeStep].iconBg} ${steps[activeStep].borderColor}`}>
                      {React.cloneElement(steps[activeStep].icon as any, { size: 32 })}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                    
                    <p className="text-slate-400 leading-relaxed text-sm mb-6">
                      {steps[activeStep].desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                      {steps[activeStep].tools.map((tech) => {
                        const icons = getTechIcon(tech);
                        return (
                          <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a2235] border border-slate-700/50 rounded-md text-xs font-medium text-slate-300 shadow-sm">
                            {Array.isArray(icons) 
                              ? icons.map((ic, i) => ic && <img key={i} src={ic} alt={tech} className="w-4 h-4 object-contain" />)
                              : (icons && <img src={icons as string} alt={tech} className="w-4 h-4 object-contain" />)
                            }
                            {tech}
                          </div>
                        );
                      })}
                    </div>

                    <button 
                      onClick={nextStep}
                      className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-purple-900/40 border border-slate-600 hover:border-purple-600/50 text-white text-sm font-medium transition-all"
                    >
                      {activeStep === steps.length - 1 ? 'Restart Flow' : 'Next Step'}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
};

export default AIPortfolioCard;
