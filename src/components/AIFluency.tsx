import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, GraduationCap } from 'lucide-react';
import { certifications } from '../data/cv-data';

export const AIFluency: React.FC = () => {
  // Find the specific certifications based on their IDs from cv-data.ts
  const teachingCert = certifications.find(c => c.id === 'anthropic-5');
  const frameworkCert = certifications.find(c => c.id === 'anthropic-4');
  const educatorsCert = certifications.find(c => c.id === 'anthropic-6');
  const studentsCert = certifications.find(c => c.id === 'anthropic-7');

  const links = [
    { title: "Teaching AI Fluency", url: teachingCert?.url || "#" },
    { title: "AI Fluency: Framework & Foundations", url: frameworkCert?.url || "#" },
    { title: "AI Fluency for Educators", url: educatorsCert?.url || "#" },
    { title: "AI Fluency for Students", url: studentsCert?.url || "#" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="bg-[#1C1A24]/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#2D243B] flex items-center justify-center border border-white/5">
            <GraduationCap className="w-6 h-6 text-[#A78BFA]" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-white tracking-tight">AI Fluency Educator</h3>
            <span className="px-3 py-1 text-xs font-medium bg-[#2D243B] text-[#D8B4FE] rounded-full border border-white/5">
              Change Management • AI Fluency
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6 relative z-10">
          <p className="text-[#9CA3AF] text-sm md:text-[15px] leading-relaxed">
            Certified by Anthropic to teach teams and organizations how to adopt AI. The 4D framework: Delegation, Description, Discernment, Diligence - deciding what to delegate, communicating it well, evaluating outputs, and collaborating responsibly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 relative z-10">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-[#2D243B]/80 hover:bg-[#3B2D4C] border border-white/5 hover:border-purple-500/30 rounded-md text-[13px] font-medium text-[#D1D5DB] hover:text-white transition-all duration-300"
            >
              <BadgeCheck className="w-3.5 h-3.5 text-[#9CA3AF]" />
              {link.title}
            </a>
          ))}
        </div>

      </div>
    </motion.div>
  );
};