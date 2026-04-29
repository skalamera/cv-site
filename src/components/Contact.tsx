import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';
import { profileInfo } from '../data/cv-data';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's talk</h2>
        <p className="text-lg text-slate-300 leading-relaxed mb-12">
          Seeking a high-agency role where I can build multi-agent systems, 
          streamline global operations through automation, and drive technical strategy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Contact Button */}
          <a 
            href={`mailto:${profileInfo.email}`}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-base transition-colors w-full sm:w-auto justify-center"
          >
            <Mail size={18} />
            Contact
          </a>

          {/* LinkedIn Button */}
          <a 
            href={profileInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200 font-medium text-base transition-colors w-full sm:w-auto justify-center"
          >
            <div className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-sm">
                <span className="text-white text-xs font-bold font-serif leading-none tracking-tighter">in</span>
            </div>
            LinkedIn
            <ExternalLink size={14} className="text-slate-400 ml-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;