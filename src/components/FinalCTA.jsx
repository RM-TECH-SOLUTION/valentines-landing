import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, MessageCircle } from 'lucide-react';

const FinalCTA = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleYesClick = () => {
    setShowConfetti(true);
    setAnswered(true);
    
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Will you be my Valentine?',
        text: 'Check out this beautiful Valentine\'s Day page made with love!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight,
                  rotate: 360,
                  x: Math.random() * window.innerWidth - window.innerWidth/2
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  ease: "linear"
                }}
                exit={{ opacity: 0 }}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 24 + 16}px`,
                }}
              >
                {['❤️', '💕', '💖', '💘', '💝'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <Heart className="w-20 h-20 mx-auto mb-8 text-valentine-red fill-valentine-red animate-heart-beat" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-handwritten text-gray-800">
              {answered ? 'You Made Me So Happy! 🥰' : 'Will you be my Valentine? 💌'}
            </h2>
            
            <p className="text-xl text-gray-600 mb-10">
              {answered 
                ? 'This is just the beginning of our forever story...'
                : 'Every day with you feels like a beautiful dream come true.'
              }
            </p>

            {!answered ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="px-12 py-4 bg-gradient-to-r from-valentine-red to-valentine-pink text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  YES! 💖
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const messages = [
                      "You can't say no to this love!",
                      "Try again with your heart ❤️",
                      "The yes button is calling you!",
                      "I know you want to say yes!"
                    ];
                    alert(messages[Math.floor(Math.random() * messages.length)]);
                  }}
                  className="px-12 py-4 bg-gray-100 text-gray-700 text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  No 😢
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-3xl font-handwritten text-valentine-red mb-8"
              >
                I love you! 💕
              </motion.div>
            )}

    
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;