import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'Top' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'experience', label: 'Experience' },
  { id: 'claude', label: 'Claude Code' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(navItems[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // offset for header room
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50 mix-blend-difference"
    >
      <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/10 -z-10" />
      
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className="group flex items-center gap-4 text-sm font-mono tracking-wider transition-all duration-300"
        >
          <div className={\w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 \\}>
            <div className={\w-1.5 h-1.5 rounded-full \\} />
          </div>
          <span className={\	ransition-all duration-300 \\}>
            {item.label}
          </span>
        </button>
      ))}
    </motion.div>
  );
};
