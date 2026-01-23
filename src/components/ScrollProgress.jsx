import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-valentine-red via-valentine-pink to-pink-400 origin-left z-50"
      />
      
      {/* Scroll percentage */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <span className="text-sm font-semibold text-valentine-red">
            <motion.span>
              {scrollYProgress => `${Math.round(scrollYProgress.get() * 100)}%`}
            </motion.span>
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;