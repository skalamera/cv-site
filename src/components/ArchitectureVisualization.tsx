import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Cpu, MessageSquare, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { techStack as allTechStack } from '../data/cv-data';

const getTechIcon = (techName: string) => {
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
    desc: 'Visitor asks a technical question via the floating chat UI.',
    icon: <MessageSquare size={24} className="text-cyan-400" />,
    color: 'from-cyan-500/20 to-cyan-500/5',
    borderColor: 'border-cyan-500/30',
    iconBg: 'bg-cyan-500/10',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'firewall',
    title: '2. AI Firewall (Guardian)',
    desc: 'A secondary Gemini model instantly screens the raw input for prompt injections, safely blocking hostile attacks before they hit the database.',
    icon: <ShieldCheck size={24} className="text-rose-400" />,
    color: 'from-rose-500/20 to-rose-500/5',
    borderColor: 'border-rose-500/30',
    iconBg: 'bg-rose-500/10',
    tools: ['Gemini', 'Node.js']
  },
  {
    id: 'embed',
    title: '3. Vector Embedding',
    desc: 'If safe, Gemini transforms the question into a 3,072-dimensional mathematical vector.',
    icon: <Activity size={24} className="text-purple-400" />,
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'border-purple-500/30',
    iconBg: 'bg-purple-500/10',
    tools: ['Gemini']
  },
  {
    id: 'retrieve',
    title: '4. RAG Retrieval',
    desc: 'Pinecone searches thousands of chunks of my source code and resume to find relevant context.',
    icon: <Database size={24} className="text-emerald-400" />,
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    tools: ['Pinecone']
  },
  {
    id: 'generate',
    title: '5. LLM Generation',
    desc: 'Gemini 2.5 Flash synthesizes the retrieved codebase context and answers intelligently.',
    icon: <Cpu size={24} className="text-blue-400" />,
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/10',
    tools: ['Gemini']
  },
  {
    id: 'observability',
    title: '6. Telemetry & Observability',
    desc: 'Every trace, latency metric, and vector result is logged to Langfuse for real-time monitoring.',
    icon: <Activity size={24} className="text-amber-400" />,
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    tools: ['Vercel'] // We use generic Vercel since Langfuse isn't in your tech stack icons likely
  },
  {
    id: 'evals',
    title: '7. Closed-Loop CI/CD',
    desc: 'A nightly GitHub Action extracts blocked attacks from Langfuse, turning them into automated regression tests via Promptfoo.',
    icon: <Database size={24} className="text-indigo-400" />,
    color: 'from-indigo-500/20 to-indigo-500/5',
    borderColor: 'border-indigo-500/30',
    iconBg: 'bg-indigo-500/10',
    tools: ['GitHub']
  }
];

const ArchitectureVisualization: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="mb-20">
      <div className="flex flex-col gap-3 mb-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Architecture</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
        </div>
        <div className="glass p-5 rounded-xl border border-slate-700/50 bg-slate-800/20 max-w-3xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed pl-2 font-light tracking-wide">
            I built the floating AI assistant so visitors can ask detailed questions about my background, experience, and projects <strong className="text-white font-medium">24/7</strong>. 
            Click through the visualization below to see exactly how the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-semibold">RAG framework</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400 font-semibold">automated evals</span> power it and keep its answers grounded and secure.
          </p>
        </div>
      </div>

      <div className="glass-panel border border-slate-700/50 bg-[#1f1e14]/40 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
        {/* Glow behind the active node */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Interactive Graph (Left/Top) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3 relative">
            {/* Connecting Line */}
            <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-slate-800 z-0 hidden lg:block"></div>
            
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              
              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`relative z-10 flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive ? `bg-gradient-to-r ${step.color} border ${step.borderColor} shadow-lg` : 
                    isPast ? 'opacity-70 hover:opacity-100 hover:bg-slate-800/50' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? step.iconBg : 'bg-slate-800'}`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {step.title}
                    </h4>
                    {/* Only show desc on mobile directly inside the list if we wanted, but we have a dedicated display panel. We'll hide it here to keep it clean. */}
                  </div>
                  {isActive && (
                    <motion.div layoutId="indicator" className="w-1.5 h-8 bg-white/80 rounded-full ml-auto hidden lg:block" />
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
                className="flex flex-col items-center lg:items-start"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl border ${steps[activeStep].iconBg} ${steps[activeStep].borderColor}`}>
                  {React.cloneElement(steps[activeStep].icon, { size: 32 })}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {steps[activeStep].title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-lg mb-6 max-w-md">
                  {steps[activeStep].desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start">
                  {steps[activeStep].tools.map((tech) => {
                    const icon = getTechIcon(tech);
                    return (
                      <div key={tech} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111827] border border-slate-700/50 rounded-md text-xs font-medium text-slate-300 shadow-sm">
                        {icon && <img src={icon} alt={tech} className="w-4 h-4 object-contain" />}
                        {tech}
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={nextStep}
                  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-sm font-medium transition-all"
                >
                  {activeStep === steps.length - 1 ? 'Restart Flow' : 'Next Step'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ArchitectureVisualization;