import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';

const Countdown = ({ data }) => {
  const [timeTogether, setTimeTogether] = useState({ days: 0 });
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const startDate = new Date(data.date);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (isInView) {
      let current = 0;
      const increment = diffDays / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= diffDays) {
          current = diffDays;
          clearInterval(timer);
        }
        setTimeTogether({ days: Math.floor(current) });
      }, 20);

      return () => clearInterval(timer);
    } else {
      setTimeTogether({ days: diffDays });
    }
  }, [data.date, isInView]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-valentine-red via-valentine-pink to-pink-400"></div>
          
          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Calendar className="w-12 h-12" />
                </div>
              </div>
              
              <h2 style={{fontFamily: "emoji"}} className="text-4xl md:text-5xl font-bold mb-6 font-handwritten">
                {data.title}
              </h2>
              
              <div className="mb-12">
                <motion.div
                  className="text-8xl md:text-9xl font-bold mb-4 flex items-center justify-center gap-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart className="w-16 h-16 fill-white" />
                  <span>{timeTogether.days.toLocaleString()}</span>
                  <Heart className="w-16 h-16 fill-white" />
                </motion.div>
                <div className="text-2xl font-semibold">{data.label}</div>
              </div>

              <p className="text-xl opacity-90 font-handwritten">
                Every moment with you is priceless 💖
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;