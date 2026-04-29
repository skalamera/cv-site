import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Sparkles } from 'lucide-react';
import { certifications } from '../data/cv-data';

export const ClaudeCode: React.FC = () => {
  // Find the specific certifications based on their IDs from cv-data.ts
  const apiCert = certifications.find(c => c.id === 'anthropic-1');
  const actionCert = certifications.find(c => c.id === 'anthropic-2');
  const introMcpCert = certifications.find(c => c.id === 'anthropic-3');
  const advMcpCert = certifications.find(c => c.id === 'anthropic-16');

  const links = [
    { title: "Building with the Claude API", url: apiCert?.url || "#" },
    { title: "Advanced MCP Topics", url: advMcpCert?.url || "#" },
    { title: "Claude Code in Action", url: actionCert?.url || "#" },
    { title: "Introduction to MCP", url: introMcpCert?.url || "#" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20 max-w-4xl mx-auto"
    >
      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bold text-white">Claude Code Power User</h3>
            <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20">
              High-Agency • AI-Fluency
            </span>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4 mb-8 relative z-10">
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            My daily workflow is a multi-agent orchestration lab. The problems I solve (context management, inter-agent communication, memory persistence) are the same ones enterprise customers face.
          </p>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">›</span>
              <span><strong className="text-slate-200 font-medium">Multi-agent orchestration:</strong> 5+ specialized agents running in parallel via tmux, each with its own context, skills, and hooks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">›</span>
              <span><strong className="text-slate-200 font-medium">Inter-agent IPC:</strong> async communication protocol between agents via JSON — they consult each other for cross-domain decisions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">›</span>
              <span><strong className="text-slate-200 font-medium">Memory persistence:</strong> pre-compact hook that crystallizes knowledge with Haiku before each compaction — memory that survives sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">›</span>
              <span><strong className="text-slate-200 font-medium">Reusable custom skills:</strong> automated deploy, tech translation, design systems, SEO, career consulting</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 relative z-10">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-all duration-300"
            >
              <BadgeCheck className="w-4 h-4 text-purple-400" />
              {link.title}
            </a>
          ))}
        </div>

      </div>
    </motion.div>
  );
};