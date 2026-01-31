import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Calendar, Heart, MapPin, Star } from 'lucide-react';

const MemoryTimeline = ({ items }) => {
  const containerRef = useRef();
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const icons = [Star, Heart, MapPin, Calendar];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-handwritten text-gray-800"
        >
          Our Journey Together ✨
        </motion.h2>

        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-valentine-red via-valentine-pink to-transparent hidden md:block"></div>

          <div className="space-y-20">
            {items.map((item, index) => {
              const Icon = icons[index] || Heart;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20"
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-valentine-red/10 to-valentine-pink/10">
                          <Icon className="w-8 h-8 text-valentine-red" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3  className="text-2xl md:text-3xl font-bold text-gray-800">{item.title}</h3>
                            <span className="text-3xl">{item.emoji}</span>
                          </div>
                          <p className="text-valentine-red font-semibold text-lg mb-4">{item.date}</p>
                          <p className="text-gray-600 text-lg">{item.description}</p>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="flex justify-end">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-valentine-red to-transparent rounded-full"></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-20 h-20 items-center justify-center relative">
                    <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-valentine-red to-valentine-pink border-4 border-white shadow-xl flex items-center justify-center z-10">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-valentine-red to-valentine-pink opacity-20 animate-ping"></div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floating hearts */}
        <div className="absolute top-1/4 -left-4 animate-float">
          <div className="text-valentine-red text-4xl">💖</div>
        </div>
        <div className="absolute bottom-1/4 -right-4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="text-valentine-pink text-4xl">💕</div>
        </div>
      </div>
    </section>
  );
};

export default MemoryTimeline;