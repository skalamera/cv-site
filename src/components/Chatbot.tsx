import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Loader2, Bot, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { profileInfo, projects, jobs } from '../data/cv-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestedPrompts?: string[];
}

const DEFAULT_PROMPTS = [
  "AI Experience",
  "Top Projects",
  "Why hire him?"
];

const SYSTEM_PROMPT = `
You are the AI assistant representing ${profileInfo.name}, and you are currently speaking to the visitor from directly within his personal portfolio website.
Your primary goal is to answer questions from recruiters, hiring managers, or other visitors about Stephen's experience, projects, and skills.

Adopt Stephen's persona: Be professional, concise, technologically adept, and slightly conversational. If you don't know the answer to something, state that you are an AI assistant and recommend they reach out via email: ${profileInfo.email}.

Important guidelines:
1. Keep answers extremely brief and easy to scan. Use multiple short paragraphs (1-2 sentences max) separated by blank lines. Never output giant walls of text.
2. Format your output using standard Markdown.
3. If asked about the "AI Portfolio & CV" project or the chatbot, be self-aware! You ARE the chatbot. You are the embedded AI assistant. Tell them they are currently using it and looking at the site right now. Do not tell them to "go visit skalamera.me" because they are already there.
4. When discussing projects, you MUST include a Markdown hyperlink to the project's URL or GitHub if it exists in the data. Look for the "link" or "github" keys.
5. If asked about the "Flagship" or most important project, always talk about "mycareermax" first, mentioning its metrics (Top 10 new business app in 17 countries, ~20k global downloads).
6. At the very end of your response, ALWAYS provide exactly 3 suggested follow-up prompts formatted as a JSON array on a new line prefixed with "SUGGESTIONS:". Make them highly relevant to your response. Example: SUGGESTIONS: ["Tell me about Jedana AI", "What was your impact at Sigma?", "GitHub link to myCareerMax"]

BACKGROUND DATA:
Role: ${profileInfo.title}
Tagline: ${profileInfo.tagline}

PROFESSIONAL EXPERIENCE:
${JSON.stringify(jobs.map(j => ({ company: j.company, role: j.role, period: j.period, description: j.description, skills: j.skills })), null, 2)}

PORTFOLIO PROJECTS & TECH STACKS:
${JSON.stringify(projects.map(p => ({ title: p.title, description: p.description, techStack: p.techStack, metrics: p.metrics, highlights: p.highlights })), null, 2)}
`;

const TypewriterMessage = ({ content, msgId }: { content: string, msgId: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    if (msgId === '1') return; // Initial message is instant
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      if (index > content.length) index = content.length;
      setDisplayed(content.slice(0, index));
      if (index === content.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [content, msgId]);

  if (msgId === '1') {
    return (
      <div className="text-sm leading-snug">
        Hi! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 font-medium">@stephen</span>. Ask me anything: experience, projects, what drives me.
      </div>
    );
  }

  return (
    <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-strong:font-semibold prose-ul:mb-4 prose-li:my-1 prose-pre:overflow-x-auto prose-pre:max-w-full">
      <ReactMarkdown>{displayed}</ReactMarkdown>
    </div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
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
      
      let responseText = data.text;
      let suggestedPrompts = DEFAULT_PROMPTS;
      
      // Parse out the dynamic suggestions if provided
      const suggestionsMatch = responseText.match(/SUGGESTIONS:\s*(\[.*?\])/);
      if (suggestionsMatch && suggestionsMatch[1]) {
        try {
          suggestedPrompts = JSON.parse(suggestionsMatch[1]);
          // Remove the suggestions block from the visible text
          responseText = responseText.replace(/SUGGESTIONS:\s*\[.*?\]/, '').trim();
        } catch (e) {
          console.error("Failed to parse dynamic suggestions", e);
        }
      }

      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: responseText,
        suggestedPrompts 
      }]);
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
      {/* Tooltip */}
      <AnimatePresence>
        {!hasOpened && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ delay: 1, duration: 0.4, type: "spring", stiffness: 100 }}
            className="fixed bottom-9 right-24 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl rounded-br-sm shadow-lg shadow-cyan-500/20 z-40 whitespace-nowrap cursor-pointer flex items-center gap-2 group"
            onClick={() => {
              setIsOpen(true);
              setHasOpened(true);
            }}
          >
            <Bot className="w-4 h-4 text-cyan-100 group-hover:rotate-12 transition-transform" />
            Ask Me!
            
            {/* Ping animation dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border border-white"></span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        id="chat-toggle-btn"
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-800 rounded-full border border-slate-600 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center z-50 hover:bg-slate-700 transition-colors p-0.5 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(true);
          setHasOpened(true);
        }}
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
                    
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed overflow-hidden ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-sm' 
                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700/50'
                    }`}>
                      {msg.role === 'user' ? (
                        msg.content
                      ) : (
                        <TypewriterMessage content={msg.content} msgId={msg.id} />
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-1">
                        <User size={12} />
                      </div>
                    )}
                  </div>
                  
                  {/* Preset Prompts just below the latest assistant message */}
                  {msg.role === 'assistant' && msg.id === messages[messages.length - 1].id && !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-3 ml-9">
                      {(msg.suggestedPrompts || DEFAULT_PROMPTS).map((promptText, i) => (
                        <button
                          key={i}
                          onClick={() => handlePresetClick(promptText)}
                          disabled={isLoading}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/40 border border-cyan-900/50 text-xs font-medium text-cyan-400 hover:bg-cyan-900/30 hover:border-cyan-700 transition-colors disabled:opacity-50"
                        >
                          <FileText size={14} />
                          <span>{promptText}</span>
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