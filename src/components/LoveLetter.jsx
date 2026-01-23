import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

const LoveLetter = ({ content }) => {
  const containerRef = useRef();

  return (
    <section id="love-letter" className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative envelope */}
          <div className="absolute -top-6 -left-6 text-valentine-red z-10">
            <Mail className="w-12 h-12" />
          </div>

          {/* Letter paper */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 paper-texture relative overflow-hidden">
            {/* Sealed heart */}
            <div className="absolute top-4 right-4">
              <div className="relative">
                <Heart className="w-10 h-10 text-valentine-red fill-valentine-red" />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full"></div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center font-handwritten text-gray-800">
              My Love Letter 💌
            </h2>
            
            <div className="relative">
              {/* Handwriting-style text */}
              <div className="text-lg md:text-xl leading-relaxed text-gray-700 font-handwritten min-h-[300px] whitespace-pre-line">
                {content}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 text-valentine-red text-6xl opacity-10">
                ❤️
              </div>
              <div className="absolute -bottom-4 -left-4 text-valentine-pink text-6xl opacity-10">
                💕
              </div>
            </div>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-gray-300/30">
              <div className="text-right">
                <div className="font-handwritten text-3xl text-valentine-red inline-block mb-2">
                  Forever Yours
                </div>
                <div className="w-48 h-px bg-gradient-to-r from-transparent via-valentine-red to-transparent ml-auto"></div>
              </div>
            </div>
          </div>

          {/* Floating hearts */}
          <motion.div
            className="absolute -right-4 top-1/2"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-valentine-red text-4xl">❤️</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;