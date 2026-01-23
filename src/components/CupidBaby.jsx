import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Heart, ArrowRight, Target, Zap, Sparkles } from 'lucide-react';

const CupidBaby = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [arrows, setArrows] = useState([]);
  const cupidRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const cupidControls = useAnimation();

  // Sections for Cupid to target
  const sections = ['hero', 'love-letter', 'timeline', 'gallery', 'countdown', 'cta'];
  
  // Cupid movement based on scroll
  const cupidX = useTransform(scrollYProgress, [0, 1], ['5%', '90%']);
  const cupidY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['10%', '30%', '60%', '30%', '10%']);
  const cupidScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const cupidRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Shooting animation
  const shootArrow = (targetSection) => {
    if (!cupidRef.current) return;
    
    setIsShooting(true);
    
    // Get cupid position
    const cupidRect = cupidRef.current.getBoundingClientRect();
    const cupidX = cupidRect.left + cupidRect.width / 2;
    const cupidY = cupidRect.top + cupidRect.height / 2;
    
    // Get target section position
    const targetElement = document.getElementById(targetSection);
    if (!targetElement) return;
    
    const targetRect = targetElement.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;
    
    // Create new arrow
    const newArrow = {
      id: Date.now(),
      startX: cupidX,
      startY: cupidY,
      endX: targetX,
      endY: targetY,
      section: targetSection
    };
    
    setArrows(prev => [...prev, newArrow]);
    
    // Remove arrow after animation
    setTimeout(() => {
      setArrows(prev => prev.filter(arrow => arrow.id !== newArrow.id));
    }, 2000);
    
    // Reset shooting state
    setTimeout(() => setIsShooting(false), 500);
    
    // Animate cupid
    cupidControls.start({
      x: [0, -10, 10, 0],
      y: [0, -5, 5, 0],
      transition: { duration: 0.5 }
    });
  };

  // Auto-shoot arrows when scrolling to sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition > elementTop && scrollPosition < elementBottom) {
            if (currentSection !== index) {
              setCurrentSection(index);
              // Shoot arrow after a delay when entering new section
              setTimeout(() => shootArrow(section), 500);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  // Auto-shoot occasional arrows
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSection = sections[Math.floor(Math.random() * sections.length)];
      shootArrow(randomSection);
    }, 8000); // Shoot every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Cupid Baby */}
      <motion.div
        ref={cupidRef}
        style={{
          x: cupidX,
          y: cupidY,
          scale: cupidScale,
          rotate: cupidRotate
        }}
        animate={cupidControls}
        className="fixed z-50 pointer-events-none"
      >
        {/* Cupid Container */}
        <div className="relative">
          {/* Cupid Baby */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Cupid Wings */}
            <motion.div
              animate={{ scaleY: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute -left-6 top-1/2 transform -translate-y-1/2"
            >
              <div className="text-4xl">🪽</div>
            </motion.div>
            
            <motion.div
              animate={{ scaleY: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
              className="absolute -right-6 top-1/2 transform -translate-y-1/2"
            >
              <div className="text-4xl">🪽</div>
            </motion.div>

            {/* Cupid Body */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              {/* Face */}
              <div className="relative">
                <div className="absolute -top-8 -left-4 text-2xl">👼</div>
                <div className="text-5xl">🥰</div>
                
                {/* Bow and Arrow */}
                <motion.div
                  animate={{ x: isShooting ? 50 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute -top-2 -right-8"
                >
                  <div className="relative">
                    <div className="text-3xl">🏹</div>
                    {isShooting && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Heart Aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="absolute -inset-8"
                >
                  <div className="w-full h-full border-2 border-pink-400/50 rounded-full"></div>
                </motion.div>
              </div>
            </div>

            {/* Floating Hearts */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.cos(i * 2) * 40}px`,
                  top: `${Math.sin(i * 2) * 40}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                <Heart className="w-6 h-6 text-red-400 fill-red-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* Cupid Message Bubble */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            className="absolute -top-20 left-1/2 transform -translate-x-1/2"
          >
            {/* <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/20">
              <div className="flex items-center gap-2">
                <span className="font-handwritten text-sm text-pink-600">Shooting love to:</span>
                <div className="text-pink-500 font-bold">
                  {sections[currentSection].replace('-', ' ')}
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/90 rotate-45"></div>
            </div> */}
          </motion.div>

          {/* Cupid Trail Sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-yellow-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Flying Arrows */}
      {arrows.map((arrow) => (
        <motion.div
          key={arrow.id}
          className="fixed z-40 pointer-events-none"
          initial={{
            x: arrow.startX,
            y: arrow.startY,
            rotate: 0,
            opacity: 1
          }}
          animate={{
            x: arrow.endX,
            y: arrow.endY,
            rotate: 360,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
        >
          {/* Arrow with trail */}
          <div className="relative">
            {/* Arrow */}
            <div className="text-3xl">💘</div>
            
            {/* Sparkle trail */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Heart Impacts on Sections */}
      {arrows.map((arrow) => (
        <motion.div
          key={`impact-${arrow.id}`}
          className="fixed z-30 pointer-events-none"
          style={{
            left: arrow.endX,
            top: arrow.endY,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1.5], opacity: [0, 1, 0] }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-12 h-12 text-red-500 fill-red-500" />
        </motion.div>
      ))}

      {/* Section Highlight Effect */}
      <motion.div
        className="fixed z-20 pointer-events-none"
        animate={{
          opacity: isShooting ? [0, 0.3, 0] : 0
        }}
        transition={{ duration: 1 }}
      >
        {sections.map((section, index) => (
          currentSection === index && (
            <div key={section} className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-400/20"></div>
            </div>
          )
        ))}
      </motion.div>

      {/* Click to Shoot Button (for fun) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const randomSection = sections[Math.floor(Math.random() * sections.length)];
          shootArrow(randomSection);
        }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all"
      >
        <Target className="w-6 h-6" />
      </motion.button>

      Love Counter

      {/* Floating Love Messages */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {[
          { text: "Love is in the air! 💕", x: "20%", y: "40%" },
          { text: "You're hit by Cupid's arrow! 🏹", x: "80%", y: "60%" },
          { text: "Feeling the love yet? ❤️", x: "40%", y: "80%" }
        ].map((msg, index) => (
          <motion.div
            key={index}
            className="absolute bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
            style={{ left: msg.x, top: msg.y }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 1.5
            }}
          >
            <span className="text-sm text-gray-700 font-handwritten">{msg.text}</span>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default CupidBaby;