import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, Sparkles, MessageCircle, ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import gsap from 'gsap';


const HeroSection = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef();


  // Text slides as shown in the screenshot
  const textSlides = [
    {
      id: 1,
      text: 'i love you',
      subtext: 'A timeless expression of affection and devotion',
      color: 'from-rose-600 to-pink-500',
      fontStyle: 'font-handwritten text-6xl md:text-7xl',
      textColor: 'text-white',
      backgroundImage:"https://www.froogal.in/media/websites/577/images/uploads/17690840387fjr.jpg"
    },
    {
      id: 2,
      text: 'Be Mine',
      subtext: 'An invitation to share hearts forever',
      color: 'from-purple-600 to-pink-600',
      fontStyle: 'font-bold text-5xl md:text-6xl uppercase tracking-wider',
      textColor: 'text-white',
      backgroundImage:"https://www.froogal.in/media/websites/577/images/uploads/1769084266eEnw.webp"
    }
  ];

  const banners = data?.banners?.length 
  ? data.banners 
  : textSlides.map(slide => slide.backgroundImage);

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % textSlides.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, textSlides.length]);

  // Floating elements animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating hearts
    for (let i = 0; i < 40; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = ['❤️', '💕', '💖', '💘'][i % 4];
      heart.className = 'absolute text-xl opacity-50';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.fontSize = `${Math.random() * 20 + 20}px`;
      container.appendChild(heart);

      gsap.to(heart, {
        duration: Math.random() * 10 + 15,
        y: -window.innerHeight,
        x: Math.random() * 300 - 150,
        rotation: Math.random() * 720,
        opacity: 0,
        ease: "power1.out",
        repeat: -1,
        delay: Math.random() * 10
      });
    }

    // Text reveal animation
    gsap.from('.hero-title', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: "back.out(1.7)"
    });

   gsap.fromTo(
  '.hero-names',
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: 0.7,
    ease: "power4.out",
    clearProps: 'opacity,transform'
  }
);


    // Heart beat animation
    gsap.to('.heart-beat', {
      duration: 1,
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % textSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + textSlides.length) % textSlides.length);
  };

  return (
    <motion.section 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-20 md:pt-0 overflow-hidden"
      id="hero"
    >
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-valentine-light via-pink-100 to-valentine-pink"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-valentine-red/30 via-valentine-pink/20 to-pink-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-pink-400/30 via-rose-400/20 to-red-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        
        {/* Light sparkle effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto">
        {/* Title - Moved to top */}
        <div className="mb-12 relative">
          <motion.h1 
            className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold font-handwritten leading-tight"
          >
            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-lg">
              {data.title}
            </span>
          </motion.h1>
          
          {/* Decorative underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="h-1.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-6 rounded-full"
          />
        </div>

        {/* Text Slider Container */}
        {/* Slider Container */}
<div className="relative h-80 md:h-96 overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm">

  {/* SVG Heart Clip Mask */}
  <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full pointer-events-none">
    <defs>
      <clipPath id="heartClip">
  <path d="
    M160 290
    C30 200 0 120 80 70
    C140 20 160 60 160 60
    C160 60 180 20 240 70
    C320 120 290 200 160 290
    Z
  " />
</clipPath>

    </defs>
  </svg>

  {/* Heart Mask Wrapper */}
  <div className="absolute inset-0 overflow-hidden" stystyle={{
  clipPath: 'url(#heartClip)',
  transform: 'scale(0.92)',
  transformOrigin: 'center'
}}>

    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 bg-gradient-to-br ${textSlides[currentSlide].color} flex flex-col items-center justify-center p-8`}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${banners[currentSlide] || textSlides[currentSlide].backgroundImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />

        
        {/* Decorative hearts */}
        <div className="absolute top-6 left-6 opacity-30">
          <Heart className="w-12 h-12" fill="white" />
        </div>
        <div className="absolute bottom-6 right-6 opacity-30">
          <Heart className="w-12 h-12" fill="white" />
        </div>
        
      </motion.div>
    </AnimatePresence>

  </div>

  {/* Navigation Arrows — UNCHANGED */}
  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-20"
  >
    <ArrowLeft className="w-6 h-6 text-red-600" />
  </button>

  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-20"
  >
    <ArrowRight className="w-6 h-6 text-red-600" />
  </button>

  {/* Play/Pause — UNCHANGED */}
  <button
    onClick={() => setIsPlaying(!isPlaying)}
    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center gap-2 px-4 z-20"
  >
    {isPlaying ? (
      <>
        <Pause className="w-5 h-5 text-red-600" />
        <span className="text-red-700 font-medium">Pause</span>
      </>
    ) : (
      <>
        <Play className="w-5 h-5 text-red-600" />
        <span className="text-red-700 font-medium">Play</span>
      </>
    )}
  </button>

</div>


        {/* Names Section - Prominent and Visible */}
        <div className="relative mb-16">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-8 mx-auto"
          />
          
          <div className="hero-names opacity-100 text-4xl md:text-6xl lg:text-7xl font-bold font-handwritten mb-8 px-4">
            <span className="bg-gradient-to-r from-red-700 via-pink-600 to-rose-600 bg-clip-text text-transparent px-8 py-4 rounded-3xl inline-block shadow-2xl bg-white/10 backdrop-blur-sm border border-white/30">
              {data.names}
            </span>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mt-8 mx-auto"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(220, 38, 38, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-bold text-xl shadow-2xl group overflow-hidden"
            onClick={() => document.getElementById('love-letter').scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-3">
              {data.cta}
              <Heart className="w-6 h-6 fill-white" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>

        </div>

        {/* Love Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
          {[
            { number: '∞', label: 'Forever Love', emoji: '💘', color: 'from-red-500 to-pink-500' },
            { number: '24/7', label: 'Always Thinking', emoji: '🤍', color: 'from-pink-500 to-rose-500' },
            { number: '100%', label: 'Pure Happiness', emoji: '😊', color: 'from-rose-500 to-red-400' },
            { number: '∞', label: 'Beautiful Memories', emoji: '📸', color: 'from-red-600 to-pink-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              className="text-center group"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} mx-auto mb-4 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-3xl text-white">{stat.emoji}</div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-red-800 mb-1">{stat.number}</div>
              <div className="text-sm text-red-700/90 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* Floating Love Quotes */}
      <motion.div
        className="absolute top-1/4 left-4 hidden lg:block"
        animate={{
          y: [0, -15, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        <div className="bg-gradient-to-br from-white/90 to-pink-50/90 backdrop-blur-sm rounded-2xl p-4 max-w-xs border border-red-200/30 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            <p className="text-sm text-red-800 font-medium italic">"Our love story is my favorite"</p>
          </div>
          <div className="text-right text-xs text-red-600">- Love Note</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-4 hidden lg:block"
        animate={{
          y: [0, 15, 0],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <div className="bg-gradient-to-br from-red-500/90 to-pink-500/90 backdrop-blur-sm rounded-2xl p-4 max-w-xs border border-red-300/30 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-white font-medium italic">"You complete my world"</p>
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
          <div className="text-right text-xs text-white/90">- Love Note</div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;