import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Loader2, Briefcase, Rocket, HelpCircle, Mail, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { profileInfo } from '../data/cv-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_PROMPTS = [
  { icon: <Briefcase size={14}/>, text: "AI Experience" },
  { icon: <Rocket size={14}/>, text: "Top Projects" },
  { icon: <HelpCircle size={14}/>, text: "Why hire him?" },
  { icon: <Mail size={14}/>, text: "Contact" }
];

const SYSTEM_PROMPT = `
You are an AI assistant representing ${profileInfo.name}. You are integrated directly into their personal portfolio website.
Your primary goal is to answer questions from recruiters, hiring managers, or other visitors about Stephen's experience, projects, and skills.

Adopt Stephen's persona: Be professional, concise, technologically adept, and slightly conversational. If you don't know the answer to something, state that you are an AI assistant and recommend they reach out via email: ${profileInfo.email}.

Important guidelines:
1. Keep answers relatively brief and easy to read (use short paragraphs or bullet points).
2. When discussing projects, highlight the Tech Stack used.
3. If asked about the "Flagship" or most important project, always talk about "mycareermax" first, mentioning its metrics (Top 10 new business app in 17 countries, ~20k global downloads).
4. Format your output using standard Markdown.

BACKGROUND DATA:
Role: ${profileInfo.title}
Tagline: ${profileInfo.tagline}
Skills: AI, LLMs, Python, TypeScript, React, Cloud (GCP/Azure)
Experience: 10+ years in Technical Support Engineering, Operations Leadership, and Custom Tooling.
Key Roles:
- Sigma: Technical Support Engineering Manager (Sept 2025 - Present). Sustained 4.84/5 CSAT, built ML forecasting models.
- Benchmark Education: Lead, Customer Tech Support (Mar 2022 - Aug 2025). Reduced resolution time by 38%, built Power BI + Python Ops Hub.
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: `Hello! I'm an AI assistant trained on Stephen's resume and portfolio. What would you like to know about his experience or projects?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePresetClick = (text: string) => {
    setInput(text);
    // Use setTimeout to ensure state is updated before sending
    setTimeout(() => {
      handleSend(text);
    }, 0);
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) setInput('');
    else setInput(''); // clear it anyway
    setIsLoading(true);

    try {
      // Format history for Gemini. The API requires alternating user/model roles, starting with user.
      // We'll skip the first greeting message if it throws off the alternating pattern, or manually inject a dummy user prompt.
      const formattedHistory = [];
      let isFirst = true;

      for (const m of messages) {
         if (isFirst && m.role === 'assistant') {
            // Gemini strictly requires the first message to be from the 'user'.
            // If our UI starts with a greeting from the assistant, we skip adding it to the formal history
            // because the system prompt handles the persona setup anyway.
            isFirst = false;
            continue; 
         }
         isFirst = false;
         
         formattedHistory.push({
           role: m.role === 'assistant' ? 'model' : 'user',
           parts: [{ text: m.content }]
         });
      }

      // Call the serverless function instead of exposing the API key to the browser
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: formattedHistory,
          message: textToSend,
          systemInstruction: SYSTEM_PROMPT
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: "I apologize, but I am having trouble connecting to my neural net right now. Please try again later or contact Stephen directly." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="chat-toggle-btn"
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-800 rounded-full border border-slate-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center z-50 hover:bg-slate-700 transition-colors p-0.5 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#111827]">
          <img src="/profile.png" alt="Stephen" className="w-full h-full object-cover scale-110" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] glass-panel rounded-2xl border border-slate-700/50 shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-700/50 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex flex-shrink-0 items-center justify-center overflow-hidden p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#111827]">
                    <img src="/profile.png" alt="Stephen" className="w-full h-full object-cover scale-110" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{profileInfo.name}</h3>
                  <div className="text-xs text-slate-400">Ask me about my experience</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div 
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center shrink-0 mt-1 overflow-hidden p-[1px] bg-slate-800">
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#111827]">
                        <img src="/profile.png" alt="Stephen" className="w-full h-full object-cover scale-110" />
                      </div>
                    </div>
                  )}
                    
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700/50'
                    }`}>
                      {msg.role === 'user' ? (
                        msg.content
                      ) : (
                        <div className="prose prose-invert prose-sm max-w-none prose-p:leading-snug prose-ul:my-1 prose-li:my-0">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-1">
                        <User size={12} />
                      </div>
                    )}
                  </div>
                  
                  {/* Preset Prompts just below the initial assistant message */}
                  {msg.id === '1' && msg.role === 'assistant' && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-9">
                      {PRESET_PROMPTS.map((preset, i) => (
                        <button
                          key={i}
                          onClick={() => handlePresetClick(preset.text)}
                          disabled={isLoading}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-600/50 text-xs text-primary hover:bg-slate-700 hover:text-blue-300 hover:border-primary/50 transition-colors disabled:opacity-50"
                        >
                          {preset.icon}
                          <span>{preset.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} />
                  </div>
                  <div className="bg-slate-800 rounded-2xl rounded-tl-sm border border-slate-700/50 px-4 py-3">
                    <Loader2 size={16} className="text-primary animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-900/50 border-t border-slate-700/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 top-1.5 p-1.5 bg-primary text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;