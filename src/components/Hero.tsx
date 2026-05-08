import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { profileInfo } from '../data/cv-data';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center items-center md:items-start pt-24 pb-8 overflow-hidden z-10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-center gap-12"
      >
        {/* Profile Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative shrink-0 flex flex-col items-center gap-6"
        >
          <div className="relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-br from-slate-600 to-slate-800 relative z-10">
              <div className="w-full h-full rounded-full bg-[#111827] border-4 border-[#111827] overflow-hidden flex items-center justify-center relative">
                 <img src="/profile.png" alt="Stephen" className="w-full h-full object-cover scale-105" />
              </div>
            </div>
            {/* Glowing ring behind */}
            <div className="absolute inset-0 rounded-full border border-primary/30 scale-[1.15] -z-10 bg-primary/5 blur-sm"></div>
            
            {/* Verified Badge */}
            <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-400 rounded-full border-4 border-[#111827] flex items-center justify-center z-20 text-white shadow-lg shadow-blue-400/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>
          
          {/* Certification Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <img src="/icons/freshdesk_product_expert.png" alt="Freshdesk Product Expert" className="h-16 md:h-20 w-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity" />
            <img src="/icons/intercom_certified.png" alt="Intercom Certified" className="h-16 md:h-20 w-auto object-contain drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Text Content Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 text-xl font-medium text-slate-300">
              Hi, I'm <a href={`mailto:${profileInfo.email}`} className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-80 transition-opacity cursor-pointer">@stephen</a>,
            </div>
          </motion.div>

          <motion.div 
            className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-8 text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="pb-4 h-[100px] md:h-[140px] flex items-center justify-center md:justify-start">
              <TypeAnimation
                sequence={[
                  'Support Engineering & Ops Leader',
                  2000,
                  'myCareermax creator',
                  2000,
                  'Open Source Builder',
                  2000,
                  'Multi-Agent Systems Builder',
                  2000,
                  'Support Tooling Engineer',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 inline-block w-full text-center md:text-left break-words"
              />
            </div>
            <div className="mt-2">
              who builds and scales
              <br />
              high performing Support teams
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="px-5 py-2 rounded-full border border-slate-700/50 text-slate-300 text-sm glass hover:bg-slate-800 transition-colors cursor-default">
              Leader
            </div>
            <div className="px-5 py-2 rounded-full border border-slate-700/50 text-slate-300 text-sm glass hover:bg-slate-800 transition-colors cursor-default">
              Learner
            </div>
            <div className="px-5 py-2 rounded-full border border-slate-700/50 text-slate-300 text-sm glass hover:bg-slate-800 transition-colors cursor-default">
              Builder
            </div>
            <div className="px-5 py-2 rounded-full border border-slate-700/50 text-slate-300 text-sm glass hover:bg-slate-800 transition-colors cursor-default">
              LLMOps
            </div>
            <div className="px-5 py-2 rounded-full border border-slate-700/50 text-slate-300 text-sm glass hover:bg-slate-800 transition-colors cursor-default">
              Support Ops
            </div>
            <a href="#projects" className="px-5 py-2 rounded-full border border-teal-500/30 text-slate-200 bg-teal-500/10 text-sm glass hover:bg-teal-500/20 transition-colors flex items-center gap-2 glow-border">
              <img src="/icons/google_play_top15.png" alt="Google Play Top 15" className="h-5 w-auto object-contain" />
            </a>
            <a href={profileInfo.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full border border-[#0A66C2]/30 text-slate-200 bg-[#0A66C2]/10 text-sm glass hover:bg-[#0A66C2]/20 transition-colors flex items-center gap-2 glow-border">
              <img src="/icons/linkedin.png" alt="LinkedIn" className="h-5 w-auto object-contain" />
            </a>
            <a href={`mailto:${profileInfo.email}`} className="px-5 py-2 rounded-full border border-[#EA4335]/30 text-slate-200 bg-[#EA4335]/10 text-sm glass hover:bg-[#EA4335]/20 transition-colors flex items-center gap-2 glow-border">
              <img src="/icons/gmail.png" alt="Gmail" className="h-5 w-auto object-contain" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;