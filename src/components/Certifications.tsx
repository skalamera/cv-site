import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '../data/cv-data';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const Certifications: React.FC = () => {
  const [anthropicExpanded, setAnthropicExpanded] = useState(false);

  const anthropicCerts = certifications.filter(c => c.issuer === 'Anthropic');
  const otherCerts = certifications.filter(c => c.issuer !== 'Anthropic');

  return (
    <section id="certifications" className="py-24">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-3xl font-bold text-white tracking-tight">Certifications</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
      </div>

      <div className="space-y-6">
        
        {/* Anthropic Dropdown Section */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-slate-700/50 rounded-xl bg-[#161b22]/50 overflow-hidden mb-8"
        >
          <button 
            onClick={() => setAnthropicExpanded(!anthropicExpanded)}
            className="w-full flex items-center justify-between p-6 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700/50 flex items-center justify-center p-2 shrink-0">
                  <img src="/icons/anthropic - white.png" alt="Anthropic" className="w-full h-full object-contain" />
               </div>
               <div className="text-left">
                 <h3 className="text-lg font-bold text-white">Anthropic AI Education & Certifications</h3>
                 <div className="text-sm text-slate-400 mt-1">{anthropicCerts.length} Verified Credentials</div>
               </div>
            </div>
            <div className="text-slate-400 bg-slate-800/80 p-2 rounded-full border border-slate-700">
               {anthropicExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </button>

          <AnimatePresence>
            {anthropicExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-slate-700/50"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/20">
                  {anthropicCerts.map((cert) => (
                    <a
                      key={cert.id}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-lg border border-slate-700/30 bg-slate-800/30 hover:bg-slate-700/50 hover:border-primary/30 transition-all duration-200"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-primary transition-colors">{cert.name}</h4>
                        <div className="text-xs text-slate-500 mt-1 font-mono">{cert.year}</div>
                      </div>
                      <div className="text-slate-500 group-hover:text-primary transition-colors ml-4 shrink-0">
                        <ExternalLinkIcon />
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Other Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherCerts.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group block glass p-5 rounded-xl hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700/50 flex flex-shrink-0 items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors">
                    {cert.logo ? (
                      <img src={cert.logo} alt={cert.issuer} className="w-full h-full object-cover p-2" />
                    ) : (
                      <span className="font-bold text-xl text-slate-600 group-hover:text-primary transition-colors">
                        {cert.issuer.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-200 group-hover:text-primary transition-colors line-clamp-1">
                      {cert.name}
                    </h3>
                    <div className="text-sm text-slate-400 mt-0.5">{cert.issuer}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="hidden sm:inline-block text-slate-500 font-mono text-sm">{cert.year}</span>
                  <div className="text-slate-600 group-hover:text-primary transition-colors">
                    <ExternalLinkIcon />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;