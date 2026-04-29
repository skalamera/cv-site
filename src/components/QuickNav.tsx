import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FolderGit2, Mail, Bot } from 'lucide-react';

export const QuickNav: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap items-center justify-center sm:justify-start md:justify-center gap-4 w-full"
    >
      <a 
        href="#experience" 
        onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="flex items-center gap-2 px-6 py-3 bg-[#1C1A24] hover:bg-[#2D243B] border border-white/5 rounded-full text-[15px] font-medium text-slate-200 transition-colors"
      >
        <Briefcase className="w-4 h-4" />
        My path
      </a>
      
      <a 
        href="#projects" 
        onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="flex items-center gap-2 px-6 py-3 bg-[#1C1A24] hover:bg-[#2D243B] border border-white/5 rounded-full text-[15px] font-medium text-slate-200 transition-colors"
      >
        <FolderGit2 className="w-4 h-4" />
        What I build
      </a>
      
      <a 
        href="#contact" 
        onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        className="flex items-center gap-2 px-6 py-3 bg-[#1C1A24] hover:bg-[#2D243B] border border-white/5 rounded-full text-[15px] font-medium text-slate-200 transition-colors"
      >
        <Mail className="w-4 h-4" />
        Let's talk
      </a>

      {/* Special Ask Me Button */}
      <button 
        onClick={() => {
          const chatInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (chatInput) {
            chatInput.focus();
          } else {
            // If chat window is minimized, click the toggle button
            const toggleBtn = document.getElementById('chat-toggle-btn');
            if (toggleBtn) toggleBtn.click();
          }
        }}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 rounded-full text-[15px] font-bold text-white shadow-lg shadow-purple-500/20 transition-all transform hover:scale-105"
      >
        <Bot className="w-4 h-4" />
        Ask me
      </button>
    </motion.div>
  );
};
