import React, { useState, useEffect } from 'react';

export const FuturisticClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="flex flex-col items-end gap-1 font-mono tracking-[0.2em] text-cyan-500/80 select-none">
      <div className="text-[10px] md:text-xs font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
        SYS.TIME // {formatDate(time)}
      </div>
      <div className="text-sm md:text-base text-white/90 font-light drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse hidden md:block"></span>
        {formatTime(time)}
        <span className="text-[10px] text-cyan-500/50 ml-1">EDT</span>
      </div>
    </div>
  );
};
