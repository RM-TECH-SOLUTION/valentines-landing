import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MousePointerClick, ArrowDown, MessageCircle } from 'lucide-react';

const FormPointerCartoon = ({ onClose, isButtonHovered }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    "Hey there! 👋",
    "Want to create your own love story like this?",
    "Click the pink button below!",
    "It only takes 60 seconds! ⏱️",
    "Don't miss out on the magic! ✨"
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    if (isButtonHovered) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isButtonHovered, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
    // Store in localStorage that user dismissed
    localStorage.setItem('cartoonDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-32 right-6 z-50"
        >
          {/* Cartoon Character Container */}
          <div className="relative">
            {/* Speech Bubble */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-24 -left-48 bg-white rounded-2xl p-4 shadow-2xl border-2 border-pink-300 min-w-[200px]"
            >
              {/* Speech tail */}
              <div className="absolute -bottom-3 right-6 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
              
              {/* Message */}
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-pink-500" />
                <p className="text-sm font-semibold text-gray-800">
                  {messages[currentMessage]}
                </p>
              </div>
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
              >
                <X className="w-3 h-3 text-gray-600" />
              </button>
            </motion.div>

            {/* Cartoon Character */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative"
            >
              {/* Character Body */}
              <div className="w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full relative">
                {/* Face */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full">
                  {/* Eyes */}
                  <div className="absolute top-3 left-3 w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute top-3 right-3 w-3 h-3 bg-black rounded-full"></div>
                  
                  {/* Blush */}
                  <div className="absolute bottom-2 left-2 w-3 h-2 bg-pink-300 rounded-full opacity-70"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-2 bg-pink-300 rounded-full opacity-70"></div>
                </div>
                
                {/* Arms */}
                <motion.div
                  animate={{
                    rotate: [0, 45, 0, -45, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute top-8 -left-4 w-8 h-3 bg-blue-400 rounded-l-full"
                ></motion.div>
                <motion.div
                  animate={{
                    rotate: [0, -45, 0, 45, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute top-8 -right-4 w-8 h-3 bg-blue-400 rounded-r-full"
                ></motion.div>
              </div>
              
              {/* Pointing Arrow */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
              >
                <ArrowDown className="w-8 h-8 text-red-500 animate-bounce" />
              </motion.div>
              
              {/* Mouse Pointer */}
              <motion.div
                animate={{
                  x: [0, 20, 0],
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -bottom-20 left-8"
              >
                <MousePointerClick className="w-8 h-8 text-pink-500" />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-pink-400 blur-xl rounded-full -z-10"
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormPointerCartoon;