import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AttackTracker: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/attacks')
      .then(res => res.json())
      .then(data => {
        if (data.count !== undefined) {
          setCount(data.count);
        }
      })
      .catch(err => console.error('Failed to load attack count:', err));
  }, []);

  return (
    <AnimatePresence>
      {count !== null && count > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 rounded-full"
        >
          <ShieldAlert size={16} className="text-rose-400" />
          <span className="text-xs font-semibold text-rose-300">
            <strong className="text-rose-400">{count}</strong> attacks thwarted
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
