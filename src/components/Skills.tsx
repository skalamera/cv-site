import React from 'react';
import { motion } from 'framer-motion';
import { techStack, sideSkills } from '../data/cv-data';

const Skills: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" className="py-24 relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#161b22] opacity-50 -z-10 w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]"></div>

      <div className="flex items-center gap-4 mb-16">
        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Skills</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-[1400px] mx-auto">
        
        {/* Left Column: Side Skills */}
        <div className="w-full lg:w-1/4 flex flex-col gap-10 shrink-0">
          
          <div>
            <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              Support & Ops
            </h3>
            <ul className="flex flex-col gap-4">
              {sideSkills.operations.map((skill, idx) => (
                <li key={idx} className="flex justify-between items-center border-b border-slate-800 pb-3 text-slate-300">
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Leadership</h3>
            <ul className="flex flex-col gap-3">
              {sideSkills.leadership.map((skill, idx) => (
                <li key={idx}>
                  <div className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-200 text-sm hover:bg-purple-500/20 transition-colors">
                    {skill}
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Column: Tech Stack */}
        <div className="w-full lg:w-3/4">
          <h3 className="text-xl font-bold text-white mb-8">Tech Stack</h3>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {techStack.map((category, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className="bg-[#1c2128] border border-slate-700/60 rounded-2xl p-6 hover:border-slate-500 transition-colors"
              >
                <h4 className="text-sm font-bold text-cyan-400 tracking-wider uppercase mb-6">{category.category}</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-4">
                  {category.skills.map((skill, j) => (
                    <div key={j} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors w-fit">
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        <img src={skill.icon} alt={skill.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <span className="text-slate-200 text-sm font-medium whitespace-nowrap">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Skills;