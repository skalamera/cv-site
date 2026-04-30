import Hero from './components/Hero';
import Experience from './components/Experience';
import { ClaudeCode } from './components/ClaudeCode';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { AIFluency } from './components/AIFluency';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import { profileInfo } from './data/cv-data';
import { QuickNav } from './components/QuickNav';
import AIPortfolioCard from './components/AIPortfolioCard';
import { FloatingNav } from './components/FloatingNav';
import { FuturisticClock } from './components/FuturisticClock';

function App() {
  return (
    <div className="min-h-screen bg-[#111827] text-slate-300 selection:bg-primary/30 selection:text-white font-sans relative">
      
      {/* Global Background Grid */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

      <FloatingNav />

      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo or left side empty */}
          </div>
          <div className="hidden md:flex items-center">
            <FuturisticClock />
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main className="relative z-10">
        
        <section id="hero" className="pt-20 pb-12 max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
          <Hero />
        </section>

        <section className="py-10 bg-black/20 border-y border-white/5 mb-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
            <QuickNav />
          </div>
        </section>

        <section id="architecture" className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
          <AIPortfolioCard />
        </section>

        <section id="experience" className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0 mt-20">
          <Experience />
        </section>

        <section id="claude" className="py-16 bg-black/20 border-y border-white/5 mb-20 mt-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
            <ClaudeCode />
          </div>
        </section>

        <section id="projects" className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0 mt-20">
          <Projects />
        </section>

        <section id="skills" className="py-16 bg-black/20 border-y border-white/5 mb-20 mt-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
            <AIFluency />
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
          <Skills />
        </section>

        <section className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
          <Certifications />
        </section>

        <section className="py-16 bg-black/20 border-y border-white/5 mt-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-0">
            <Contact />
          </div>
        </section>

      </main>

      <Chatbot />

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm mt-12 border-t border-slate-800">
        <p>Built with React, Tailwind & Framer Motion.</p>
        <p className="mt-2">© {new Date().getFullYear()} {profileInfo.name}. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;