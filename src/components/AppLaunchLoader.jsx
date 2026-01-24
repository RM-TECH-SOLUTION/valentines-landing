import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppLaunchCountdown({ onComplete }) {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 700);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  }, [count]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-8xl font-extrabold text-white tracking-tight">
            {count}
            Launching...
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
