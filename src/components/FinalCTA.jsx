import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const FinalCTA = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // YES → Confetti → WhatsApp Redirect
  const handleYesClick = () => {
    setShowConfetti(true);
    setAnswered(true);

    const message = encodeURIComponent(
      "YES! 💖 I love you so much 🥰 Thank you for your precious gift and love. You mean the world to me. This is the beginning of our forever 💕"
    );

    setTimeout(() => {
      window.open(`https://wa.me/?text=${message}`, "_blank");
    }, 2500);

    setTimeout(() => setShowConfetti(false), 5000);
  };

  // NO → Emotional Popup + Button Escape
  const handleNoClick = () => {
    setNoPosition({
      x: Math.random() * 200 - 100,
      y: Math.random() * 120 - 60,
    });

    const emotionalMessages = [
      "It’s okay… but my heart chose you already 💔",
      "Even if you say no… I’ll still cherish you 💕",
      "Love doesn’t force… but I wish you felt what I feel 🥺",
      "You mean more to me than you’ll ever know 💖",
      "My heart is still waiting for your yes 💌",
      "Even a maybe would make me happy 🥹",
      "Some feelings are forever… even if unanswered 💞"
    ];

    setPopupMessage(
      emotionalMessages[Math.floor(Math.random() * emotionalMessages.length)]
    );
    setShowPopup(true);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">

      {/* CONFETTI */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {Array.from({ length: 120 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight,
                  rotate: 360,
                  x: Math.random() * window.innerWidth - window.innerWidth / 2
                }}
                transition={{ duration: Math.random() * 3 + 2, ease: "linear" }}
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

      {/* EMOTIONAL POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X />
              </button>

              <Heart className="w-14 h-14 mx-auto text-valentine-red fill-valentine-red mb-4" />

              <p className="text-xl font-semibold text-gray-800 mb-6">
                {popupMessage}
              </p>

              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-3 bg-gradient-to-r from-valentine-red to-valentine-pink text-white rounded-full font-bold shadow-lg"
              >
                I’ll Think About It 💗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CTA */}
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">

            <Heart className="w-20 h-20 mx-auto mb-8 text-valentine-red fill-valentine-red animate-heart-beat" />

            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-handwritten text-gray-800">
              {answered ? 'You Made My Heart So Happy 🥰' : 'Will you be my Valentine? 💌'}
            </h2>

            <p className="text-xl text-gray-600 mb-10">
              {answered 
                ? 'This moment means more to me than words can say...'
                : 'Every moment with you feels like magic and warmth.'
              }
            </p>

            {!answered ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative">

                {/* YES */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="px-12 py-4 bg-gradient-to-r from-valentine-red to-valentine-pink text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  YES! 💖
                </motion.button>

                {/* NO */}
                <motion.button
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onMouseEnter={handleNoClick}
                  onClick={handleNoClick}
                  className="px-12 py-4 bg-gray-100 text-gray-700 text-2xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  No 😢
                </motion.button>

              </div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-3xl font-handwritten text-valentine-red mt-6"
              >
                I love you forever 💕  
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
