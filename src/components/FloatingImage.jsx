import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, Music } from 'lucide-react';

const FloatingImage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for different scroll positions
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  // Interactive floating effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 30,
        y: (e.clientY - window.innerHeight / 2) / 30,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePlayMusic = () => {
    setIsPlaying(!isPlaying);
    // In production, add actual music player
    if (!isPlaying) {
      const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-sunset-687.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  return (
    <>
      {/* Main Floating Heart Container */}
      <motion.div
        style={{
          x: mousePosition.x,
          y: y,
          rotate,
          scale,
          opacity,
        }}
        className="fixed z-40 top-1/4 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        {/* Glowing background orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -inset-32"
        >
          <div className="w-full h-full bg-gradient-to-r from-valentine-red/10 via-valentine-pink/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Interactive Couple Avatar */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Main heart container */}
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            {/* Outer glow ring */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full border-4 border-valentine-red/30"
            ></motion.div>

            {/* Floating hearts ring */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.cos((i * Math.PI) / 6) * 140}px`,
                  top: `${Math.sin((i * Math.PI) / 6) * 140}px`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <Heart className="w-8 h-8 text-valentine-red fill-valentine-red" />
              </motion.div>
            ))}

            {/* Center couple image */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-8 border-white/90 shadow-2xl animate-glow">
              {/* Replace with actual couple image */}
              <div className="w-full h-full bg-gradient-to-br from-valentine-red via-valentine-pink to-pink-300 flex flex-col items-center justify-center">
                <div className="text-5xl mb-2">💑</div>
                <div className="text-white text-center px-2">
                  <div className="text-lg font-bold">Alex</div>
                  <div className="text-xs opacity-80">&</div>
                  <div className="text-lg font-bold">Taylor</div>
                </div>
              </div>
              
              {/* Interactive hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlayMusic}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm"
                >
                  <Music className="w-6 h-6 text-valentine-red" />
                </motion.button>
              </div>
            </div>

            {/* Floating text labels */}
            <motion.div
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-valentine-red to-valentine-pink text-white px-6 py-3 rounded-full shadow-xl"
              animate={{
                y: [0, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <span className="font-handwritten text-xl whitespace-nowrap">True Love ❤️</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl"
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <span className="font-handwritten text-xl text-valentine-dark whitespace-nowrap">Together Forever 💕</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Connection particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-valentine-red"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Interactive sparkles */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        ))}
      </div>

      {/* Floating message bubbles */}
      <motion.div
        className="fixed top-20 left-10 z-30 hidden lg:block"
        animate={{
          y: [0, -10, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs">
          <p className="text-sm text-gray-700">"Every moment with you is magical" 💫</p>
          <div className="text-right text-xs text-gray-500 mt-1">- Love Note</div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-20 right-10 z-30 hidden lg:block"
        animate={{
          y: [0, 10, 0],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div className="bg-valentine-red/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs">
          <p className="text-sm text-white">"You're my favorite hello and hardest goodbye" 💖</p>
          <div className="text-right text-xs text-white/80 mt-1">- Love Note</div>
        </div>
      </motion.div>

      {/* Music player indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 left-10 z-40 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 text-white flex items-center gap-2"
        >
          <Music className="w-4 h-4 animate-pulse" />
          <span className="text-sm">Love Song Playing...</span>
        </motion.div>
      )}
    </>
  );
};

export default FloatingImage;