import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnimationEvent, CSSProperties, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';
import './StarWarsExperienceModal.css';

interface StarWarsExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const baseCrawlDuration = 118;
const audioStartDelayMs = 5000;
const starWarsAudioSrc = '/audio/starwars_5min.mp3';

const StarWarsExperienceModal = ({ isOpen, onClose }: StarWarsExperienceModalProps) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isManualScrub, setIsManualScrub] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [hasCrawlStarted, setHasCrawlStarted] = useState(false);
  const [isAudioLockedOff, setIsAudioLockedOff] = useState(false);
  const [isCrawlComplete, setIsCrawlComplete] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [showAudioRestartNotice, setShowAudioRestartNotice] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [scrub, setScrub] = useState(0);
  const [manualCrawlY, setManualCrawlY] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const crawlRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioStartTimerRef = useRef<number | null>(null);
  const pausedAudioPositionRef = useRef<number | null>(null);
  const isPausedRef = useRef(isPaused);
  const isManualScrubRef = useRef(isManualScrub);
  const isAudioEnabledRef = useRef(isAudioEnabled);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const stopAudio = useCallback((resetToStart = true) => {
    if (audioStartTimerRef.current !== null) {
      window.clearTimeout(audioStartTimerRef.current);
      audioStartTimerRef.current = null;
    }

    const audio = audioRef.current;
    if (!audio) {
      pausedAudioPositionRef.current = null;
      return;
    }

    audio.pause();
    audio.muted = false;
    pausedAudioPositionRef.current = null;

    if (resetToStart) {
      try {
        audio.currentTime = 0;
      } catch {
        // Some browsers reject seeking before media metadata is ready.
      }
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (audioStartTimerRef.current !== null) {
      window.clearTimeout(audioStartTimerRef.current);
      audioStartTimerRef.current = null;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const shouldResumeFromCurrentPosition = !audio.paused && !audio.muted;
    const currentPosition = audio.currentTime;
    audio.pause();
    audio.muted = false;

    if (shouldResumeFromCurrentPosition) {
      pausedAudioPositionRef.current = currentPosition;
    }
  }, []);

  const scheduleAudioPlayback = useCallback(() => {
    if (!isAudioEnabledRef.current || isManualScrubRef.current) {
      return;
    }

    stopAudio();

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.85;
    audio.muted = true;
    audio.currentTime = 0;

    void audio.play().catch(() => {
      // The audible retry happens after the requested delay.
    });

    audioStartTimerRef.current = window.setTimeout(() => {
      audioStartTimerRef.current = null;

      if (!isAudioEnabledRef.current || isManualScrubRef.current || isPausedRef.current) {
        stopAudio();
        return;
      }

      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 0.85;
      void audio.play().catch(() => stopAudio());
    }, audioStartDelayMs);
  }, [stopAudio]);

  const resumeAudioPlayback = useCallback(() => {
    if (!isAudioEnabledRef.current || isManualScrubRef.current) {
      return;
    }

    const audio = audioRef.current;
    const pausedAudioPosition = pausedAudioPositionRef.current;

    if (!audio || pausedAudioPosition === null) {
      scheduleAudioPlayback();
      return;
    }

    if (audioStartTimerRef.current !== null) {
      window.clearTimeout(audioStartTimerRef.current);
      audioStartTimerRef.current = null;
    }

    audio.muted = false;
    audio.volume = 0.85;
    audio.currentTime = pausedAudioPosition;
    pausedAudioPositionRef.current = null;
    void audio.play().catch(() => stopAudio(false));
  }, [scheduleAudioPlayback, stopAudio]);

  const setManualProgress = useCallback((value: number) => {
    const percent = Math.max(0, Math.min(100, value));
    const crawlHeight = crawlRef.current?.scrollHeight ?? 0;
    const distance = crawlHeight + window.innerHeight * 1.8;
    isManualScrubRef.current = true;
    isPausedRef.current = true;
    stopAudio();
    setScrub(percent);
    setManualCrawlY(-distance * (percent / 100));
    setIsManualScrub(true);
    setIsPaused(true);
  }, [stopAudio]);

  useEffect(() => {
    isPausedRef.current = isPaused;
    isManualScrubRef.current = isManualScrub;
    isAudioEnabledRef.current = isAudioEnabled;
  }, [isPaused, isManualScrub, isAudioEnabled]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(focusTimer);
      stopAudio();
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, stopAudio]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !isManualScrub) {
      return;
    }

    const updateProgressOnResize = () => {
      setManualProgress(scrub);
    };

    window.addEventListener('resize', updateProgressOnResize);
    return () => window.removeEventListener('resize', updateProgressOnResize);
  }, [isOpen, isManualScrub, scrub, setManualProgress]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  const resetManualProgress = () => {
    isManualScrubRef.current = false;
    setIsManualScrub(false);
    setScrub(0);
    setManualCrawlY(0);
  };

  const startCrawl = (withAudio: boolean) => {
    resetManualProgress();
    setShowAudioPrompt(false);
    setShowAudioRestartNotice(false);
    setIsCrawlComplete(false);
    setHasCrawlStarted(true);
    setIsAudioLockedOff(!withAudio);
    isPausedRef.current = false;
    setIsPaused(false);

    if (withAudio) {
      isAudioEnabledRef.current = true;
      setIsAudioEnabled(true);
      scheduleAudioPlayback();
      return;
    }

    isAudioEnabledRef.current = false;
    setIsAudioEnabled(false);
    stopAudio();
  };

  const replayCrawl = () => {
    resetManualProgress();
    setShowAudioPrompt(false);
    setShowAudioRestartNotice(false);
    setIsCrawlComplete(false);
    setHasCrawlStarted(true);
    setIsAudioLockedOff(!isAudioEnabledRef.current);
    isPausedRef.current = false;
    setIsPaused(false);
    setAnimationKey((currentKey) => currentKey + 1);

    if (isAudioEnabledRef.current) {
      scheduleAudioPlayback();
      return;
    }

    stopAudio();
  };

  const toggleMotion = () => {
    if (isManualScrub) {
      replayCrawl();
      return;
    }

    if (!hasCrawlStarted && isPaused && !isAudioEnabled) {
      setShowAudioPrompt(true);
      return;
    }

    if (!hasCrawlStarted && isPaused) {
      startCrawl(true);
      return;
    }

    const nextPausedState = !isPaused;
    isPausedRef.current = nextPausedState;
    setIsPaused(nextPausedState);

    if (nextPausedState) {
      pauseAudio();
      return;
    }

    resumeAudioPlayback();
  };

  const toggleAudio = () => {
    if (isAudioLockedOff && hasCrawlStarted && !isCrawlComplete) {
      setShowAudioRestartNotice(true);
      return;
    }

    const nextAudioState = !isAudioEnabled;
    isAudioEnabledRef.current = nextAudioState;
    setIsAudioEnabled(nextAudioState);

    if (!nextAudioState) {
      if (hasCrawlStarted && !isCrawlComplete) {
        setIsAudioLockedOff(true);
      }
      stopAudio();
      return;
    }

    if (!isPaused && !isManualScrub) {
      resumeAudioPlayback();
    }
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleCrawlAnimationEnd = (event: AnimationEvent<HTMLElement>) => {
    if (event.animationName !== 'starwars-crawl-scroll') {
      return;
    }

    setIsCrawlComplete(true);
    setIsPaused(true);
    isPausedRef.current = true;
    stopAudio(false);
  };

  const crawlDuration = baseCrawlDuration / speed;
  const modalStyle = {
    '--starwars-crawl-duration': `${crawlDuration}s`,
    '--starwars-manual-crawl-y': `${manualCrawlY}px`,
  } as CSSProperties;
  const modalClassName = [
    'starwars-modal',
    isPaused ? 'is-paused' : '',
    isManualScrub ? 'is-manual-scrub' : '',
    isCrawlComplete ? 'is-complete' : '',
  ].filter(Boolean).join(' ');

  return createPortal(
    <div className={modalClassName} style={modalStyle} onMouseDown={closeFromBackdrop}>
      <div
        ref={dialogRef}
        className="starwars-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Star Wars Experience"
        tabIndex={-1}
      >
        <button type="button" className="starwars-close" onClick={onClose} aria-label="Close Star Wars Experience">
          <X size={18} aria-hidden="true" />
          <span>Close</span>
        </button>

        <div className="starwars-starfield" aria-hidden="true"></div>
        <audio ref={audioRef} src={starWarsAudioSrc} preload="auto" />

        <div className="starwars-scene" aria-label="Opening crawl resume for Stephen Skalamera">
          <p key={`intro-${animationKey}`} className="starwars-intro">
            A long time ago in a support queue far, far away...
          </p>
          <img
            key={`title-${animationKey}`}
            className="starwars-title-card"
            src="/starwars_title_name.png"
            alt="Stephen Skalamera Star Wars-style title"
          />

          <section className="starwars-crawl-frame" aria-label="Professional history">
            <article
              key={`crawl-${animationKey}`}
              ref={crawlRef}
              className="starwars-crawl"
              onAnimationEnd={handleCrawlAnimationEnd}
            >
              <header>
                <p className="starwars-episode">EPISODE 2026</p>
                <h1>Stephen Skalamera<br />Support Operations Leader</h1>
              </header>

              <p>
                Stephen Skalamera is a New York-based Technical Support and Operations leader with 10+ years in high-growth SaaS.
                His work centers on global Technical Support Engineering teams, developer-facing platforms, APIs, integrations,
                incident response, and AI support tooling.
              </p>

              <p>
                Across the saga, he has built support systems that cut resolution time, raised CSAT, and helped Engineering,
                Product, Customer Success, and Support work from the same facts.
              </p>

              <h2>Sigma</h2>
              <p>
                September 2025 to present. Technical Support Engineering Manager in New York. Stephen leads the New York Technical
                Support Engineering team, manages hiring, onboarding, coaching, and performance, and sustains a 4.84 out of 5 CSAT
                across enterprise customers.
              </p>

              <p>
                He works as a player-coach on complex technical issues across live chat, email, and Slack while maintaining a
                23-second average first response time. He built workforce models and a Python ML forecasting app that reduced planned
                headcount additions by 2 FTE through more accurate ticket volume prediction.
              </p>

              <p>
                He directs queue health, staffing strategy, dashboards, and playbooks, holding average resolution time near 1.1 hours.
                He also leads SEV-0 and SEV-1 escalations with Engineering, Product, and Customer Success, then delivers clear updates
                and post-incident summaries.
              </p>

              <h2>Benchmark Education Company</h2>
              <p>
                March 2022 to August 2025. Lead, Customer Technical Support and Support Operations in New Rochelle. Stephen led a
                hybrid team of 15 support agents and a 5-person offshore vendor team while reporting to the Director of Technology.
              </p>

              <p>
                He automated Freshdesk, Zendesk, and RingCentral workflows and API connections, reducing resolution time by 38%,
                improving first response time by 45%, cutting average handling time by 32%, and keeping CSAT above 98% annually.
              </p>

              <p>
                He drove the launch of an in-house ticketing application and an AI performance review platform, built a Power BI
                Support Operations Hub with Python and RingCentral API monitoring, and turned support feedback into product work for
                Product, Engineering, and Customer Success.
              </p>

              <h2>BuildingLink</h2>
              <p>
                October 2019 to March 2022. Technical Support and Training in New York. Stephen ran on-site and remote platform
                training for property management companies across the country, translated user feedback into bug reports and feature
                requests, managed adoption of Freshdesk, and helped redesign the company help site.
              </p>

              <h2>1010data</h2>
              <p>
                April 2016 to August 2019. Customer Experience and Technical Support Lead in New York. Stephen reviewed support KPIs
                with upper management, checked support tickets, helped interview, hire, train, and grow the Customer Experience team,
                and managed customer issues through conflict resolution and platform support.
              </p>

              <p>
                He also built the Confluence knowledge base from the ground up, giving the support team a working source for customer
                answers and internal process.
              </p>

              <h2>Lytx</h2>
              <p>
                July 2014 to April 2016. Senior Technical Support Engineer, Tier 3, in San Diego. Stephen acted as the main escalation
                point for Tier 3 technical support, confirmed and documented technical issues, used SQL to troubleshoot large
                databases, and worked with infrastructure, database, QA, and development teams.
              </p>

              <h2>Project: Jedana AI</h2>
              <p>
                Stephen is the founder and developer of Jedana AI, a spare-time support analytics project for agent quality assurance,
                team performance, and customer health. It reviews ticket interactions, suggests skill ratings, tracks sentiment and
                KPIs, and creates weighted performance reviews across support channels.
              </p>

              <h2>Skills, certifications, and awards</h2>
              <p>
                His toolkit includes REST APIs, Freshdesk, Zendesk, RingCentral, Jira, Salesforce, NetSuite, Confluence, Power BI,
                Tableau, BigQuery, Redshift, Azure, Snowflake, Python, HTML, CSS, JavaScript, SQL, GCP, Zapier, Vercel, Supabase,
                React, Docker, Databricks, Cursor, Gemini, ChatGPT, Pinecone, Langfuse, MCP, Claude, Claude Code, Codex, and agentic
                AI workflows.
              </p>

              <p>
                His certifications include Anthropic AI Fluency and Claude developer programs, Microsoft Career Essentials in
                generative AI, data analysis, and project management, Zendesk and Freshdesk credentials, Harvard CS50x for AI, and
                Babson AI for Leaders.
              </p>

              <p>
                He earned a bachelor's degree in Economics from the University of Maryland, Baltimore County, and won a Gold Stevie
                Award in the 2025 American Business Awards.
              </p>

              <section className="starwars-contact" aria-label="Contact links">
                <h2>Contact</h2>
                <p className="starwars-contact-row">
                  <span className="starwars-contact-label">Email</span>
                  <span className="starwars-contact-value">skalamera@gmail.com</span>
                </p>
                <p className="starwars-contact-row">
                  <span className="starwars-contact-label">LinkedIn</span>
                  <span className="starwars-contact-value">linkedin.com/in/skalamera</span>
                </p>
                <p className="starwars-contact-row">
                  <span className="starwars-contact-label">GitHub</span>
                  <span className="starwars-contact-value">github.com/skalamera</span>
                </p>
                <p className="starwars-contact-row">
                  <span className="starwars-contact-label">Portfolio</span>
                  <span className="starwars-contact-value">skalamera.me</span>
                </p>
              </section>
            </article>
          </section>
        </div>

        {isCrawlComplete && (
          <div className="starwars-complete-screen" role="status" aria-label="Star Wars Experience complete">
            <div className="starwars-prompt-card">
              <p>The crawl is complete.</p>
              <div className="starwars-prompt-actions">
                <button type="button" onClick={onClose}>
                  <X size={16} aria-hidden="true" />
                  <span>Close Star Wars Experience</span>
                </button>
                <button type="button" onClick={replayCrawl}>
                  <RotateCcw size={16} aria-hidden="true" />
                  <span>Replay</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {showAudioPrompt && (
          <div className="starwars-audio-prompt" role="alertdialog" aria-modal="true" aria-label="Enable audio">
            <div className="starwars-prompt-card">
              <p>Would you like to enable audio?</p>
              <div className="starwars-prompt-actions">
                <button type="button" onClick={() => startCrawl(true)}>
                  <Volume2 size={16} aria-hidden="true" />
                  <span>Start with audio</span>
                </button>
                <button type="button" onClick={() => startCrawl(false)}>
                  <VolumeX size={16} aria-hidden="true" />
                  <span>Continue without audio</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {showAudioRestartNotice && (
          <div className="starwars-audio-notice" role="alertdialog" aria-modal="true" aria-label="Audio restart required">
            <div className="starwars-prompt-card">
              <p>The Star Wars Experience will need to start over in order to enable audio.</p>
              <div className="starwars-prompt-actions">
                <button type="button" onClick={() => {
                  isAudioEnabledRef.current = true;
                  setIsAudioEnabled(true);
                  replayCrawl();
                }}>
                  <Volume2 size={16} aria-hidden="true" />
                  <span>Restart with audio</span>
                </button>
                <button type="button" onClick={() => setShowAudioRestartNotice(false)}>
                  <span>Keep watching</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="starwars-controls" aria-label="Crawl controls">
          <button type="button" onClick={toggleMotion} aria-pressed={isPaused}>
            {isPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            <span>{isPaused ? 'Play' : 'Pause'}</span>
          </button>
          <button type="button" onClick={replayCrawl} disabled={!hasCrawlStarted}>
            <RotateCcw size={15} aria-hidden="true" />
            <span>Replay</span>
          </button>
          <button
            type="button"
            onClick={toggleAudio}
            aria-pressed={isAudioEnabled}
            data-audio-locked={isAudioLockedOff && hasCrawlStarted && !isCrawlComplete ? 'true' : undefined}
            className={isAudioLockedOff && hasCrawlStarted && !isCrawlComplete ? 'is-audio-locked' : undefined}
          >
            {isAudioEnabled ? <Volume2 size={15} aria-hidden="true" /> : <VolumeX size={15} aria-hidden="true" />}
            <span>Audio {isAudioEnabled ? 'On' : 'Off'}</span>
          </button>
          <label className="starwars-speed-control" htmlFor="starwars-speed">
            <span>Speed</span>
            <input
              type="range"
              id="starwars-speed"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onInput={(event) => setSpeed(Number(event.currentTarget.value))}
            />
            <span>{speed.toFixed(1)}x</span>
          </label>
          <label className="starwars-scrub-control" htmlFor="starwars-scrub">
            <span>Scroll</span>
            <input
              type="range"
              id="starwars-scrub"
              min="0"
              max="100"
              step="1"
              value={scrub}
              aria-label="Manual crawl position"
              onInput={(event) => setManualProgress(Number(event.currentTarget.value))}
            />
            <span>{Math.round(scrub)}%</span>
          </label>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StarWarsExperienceModal;
