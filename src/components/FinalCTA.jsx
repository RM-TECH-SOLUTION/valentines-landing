import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const FinalCTA = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [proposalMode, setProposalMode] = useState(false);
  const [finalScene, setFinalScene] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/romantic-music.mp3");
    audioRef.current.loop = true;
  }, []);

  // YES FLOW — CINEMATIC
  const handleYesClick = () => {
    setAnswered(true);
    setShowConfetti(true);

    audioRef.current?.play();

    setTimeout(() => setProposalMode(true), 1800);
    setTimeout(() => setFinalScene(true), 4200);

    const message = encodeURIComponent(
      "YES 💖 I choose you forever. Thank you for loving me. This moment is eternal. Our forever begins now 💍💕"
    );

    setTimeout(() => {
      window.open(`https://wa.me/?text=${message}`, "_blank");
    }, 7200);

    setTimeout(() => setShowConfetti(false), 8000);
  };

  // NO FLOW — EMOTIONAL & POETIC
  const handleNoClick = () => {
    setNoPosition({
      x: Math.random() * 200 - 100,
      y: Math.random() * 140 - 70,
    });

    const emotionalMessages = [
      "It’s okay… my heart will still whisper your name 💔",
      "Even a no can’t erase what I feel for you 💞",
      "Some hearts love silently… mine loves you 🥺",
      "I’ll carry this feeling gently, without forcing 💕",
      "You already live in my heart, no matter what 💌",
      "If love had a sound… mine would say your name 💘"
    ];

    setPopupMessage(emotionalMessages[Math.floor(Math.random() * emotionalMessages.length)]);
    setShowPopup(true);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-rose-100 via-white to-pink-200">

      {/* FLOATING HEARTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0.3 }}
            animate={{ y: "-120%" }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity }}
            className="absolute text-pink-300 text-3xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* CONFETTI */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {Array.from({ length: 160 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight, rotate: 360 }}
                transition={{ duration: Math.random() * 3 + 2 }}
                className="absolute text-2xl"
              >
                {['❤️', '💖', '💕', '💘', '💝'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* NO EMOTIONAL POPUP */}
      <AnimatePresence>
        {showPopup && (
          <motion.div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 max-w-sm text-center shadow-2xl relative"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-gray-400">
                <X />
              </button>

              <Heart className="w-16 h-16 mx-auto text-valentine-red fill-valentine-red mb-4 animate-pulse" />

              <p className="text-xl font-semibold text-gray-800 mb-6">
                {popupMessage}
              </p>

              <button onClick={() => setShowPopup(false)} className="px-6 py-3 bg-gradient-to-r from-valentine-red to-valentine-pink text-white rounded-full font-bold shadow-lg">
                My Heart Feels It 💗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="max-w-2xl mx-auto text-center relative z-10">

        {/* NORMAL MODE */}
        {!proposalMode && !finalScene && (
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">

              <Heart className="w-20 h-20 mx-auto mb-8 text-valentine-red fill-valentine-red animate-heart-beat" />

              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-handwritten text-gray-800">
                {answered ? 'My Heart Is Yours 🥰' : 'Will you be my Valentine? 💌'}
              </h2>

              <p className="text-xl text-gray-600 mb-10">
                {answered 
                  ? 'This moment will live forever in my soul...'
                  : 'Every heartbeat leads me closer to you.'
                }
              </p>

              {!answered ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative">

                  {/* YES */}
                  <motion.button
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYesClick}
                    className="px-12 py-4 bg-gradient-to-r from-valentine-red to-valentine-pink text-white text-2xl font-bold rounded-full shadow-xl glow-btn"
                  >
                    YES! 💖
                  </motion.button>

                  {/* NO */}
                  <motion.button
                    animate={{ x: noPosition.x, y: noPosition.y }}
                    transition={{ type: "spring", stiffness: 160 }}
                    onMouseEnter={handleNoClick}
                    onClick={handleNoClick}
                    className="px-12 py-4 bg-gray-100 text-gray-700 text-2xl font-bold rounded-full shadow-lg"
                  >
                    No 😢
                  </motion.button>

                </div>
              ) : (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl font-handwritten text-valentine-red mt-6">
                  I choose you forever 💕  
                  <br />
                  Let love lead us… 💌
                </motion.div>
              )}

            </div>
          </motion.div>
        )}

        {/* 💍 PROPOSAL MODE */}
        {proposalMode && !finalScene && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-pink-600 to-rose-500 rounded-3xl p-14 shadow-2xl text-white">

            <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ duration: 1.2 }} className="text-7xl mb-6">
              💍
            </motion.div>

            <h2 className="text-5xl font-handwritten mb-6">
              Our Forever Begins
            </h2>

            <p className="text-xl mb-8 opacity-90">
              Thank you for choosing love.  
              Thank you for choosing me. 💖
            </p>

            <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-3xl font-bold">
              I Choose You 💕
            </motion.div>
          </motion.div>
        )}

        {/* 🌌 FINAL CINEMATIC SCENE */}
        {finalScene && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-black text-white rounded-3xl p-16 shadow-2xl">

            <motion.h2 className="text-6xl font-handwritten mb-6" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              This Is Our Love Story 💞
            </motion.h2>

            <p className="text-xl opacity-80 mb-6">
              From this moment on,  
              every heartbeat belongs to us.
            </p>

            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl font-bold text-pink-400">
              Forever & Always 💖
            </motion.div>

          </motion.div>
        )}

      </div>
    </section>
  );
};

export default FinalCTA;
