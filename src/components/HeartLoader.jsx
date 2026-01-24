import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeartLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-50 z-50">
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        <Heart className="w-24 h-24 text-valentine-red fill-valentine-red drop-shadow-xl" />
        <p className="mt-6 text-lg font-semibold text-valentine-red tracking-wide">
          Loading Love...
        </p>
      </motion.div>
    </div>
  );
}
