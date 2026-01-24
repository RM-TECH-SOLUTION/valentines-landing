import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import LoveLetter from './components/LoveLetter';
import LoveStory from './components/LoveStory';
import LovePromise from './components/LovePromise';
import MemoryTimeline from './components/MemoryTimeline';
import Gallery from './components/Gallery';
import Countdown from './components/Countdown';
import FinalCTA from './components/FinalCTA';
import CupidBaby from './components/CupidBaby';
import BackgroundEffects from './components/BackgroundEffects';
import ScrollProgress from './components/ScrollProgress';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import HeartLoader from './components/HeartLoader';
import AppLaunchingLoader from './components/AppLaunchLoader'

function App() {
  const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const [data] = useState({
    hero: {
      title: "For My Forever ❤️",
      names: "Rashmika Mandanna",
      cta: "Read Our Love Story"
    },
   loveLetter: {
  content: `My Dearest Rashmika, 

This Valentine’s Day, I found myself searching for the right words… and realized there are none powerful enough to describe what you mean to me.

You walked into my life like a quiet miracle — effortless, warm, and impossible to ignore. Your smile feels like home, your laughter like music, and your presence like peace I never knew I needed.

In a world full of noise, you are my calm.  
In a journey full of chaos, you are my direction.  
In a heart full of dreams, you are my favorite reality.

You inspire me — not just as an artist, but as a human being. Your kindness, your strength, your innocence, and your fire… they remind me every day why love is worth believing in.

If love is a story, I don’t want a perfect one — I want ours. Messy. Real. Honest. Forever.

So today, and every day after, I choose you. In every version of my life. In every universe. In every heartbeat.

Happy Valentine’s Day, my favorite feeling.

Yours, always,  
Vijay`
},

   timeline: [
  {
    id: 1,
    title: "First Meet on Set",
    date: "2017",
    emoji: "🎬",
    description: "Their paths crossed on the sets of Geetha Govindam — a collaboration that sparked both iconic chemistry and a deeper connection."
  },
  {
    id: 2,
    title: "On-Screen Magic",
    date: "Aug 15, 2018",
    emoji: "💫",
    description: "Geetha Govindam released, turning them into one of Telugu cinema’s most loved pairs."
  },
  {
    id: 3,
    title: "Stronger Bond",
    date: "Jul 26, 2019",
    emoji: "❤️",
    description: "Dear Comrade deepened their on-screen intensity and fueled real-life bond rumors."
  },
  {
    id: 4,
    title: "Quiet Love Era",
    date: "2020 – 2024",
    emoji: "🤍",
    description: "Spotted together, shared moments, subtle confirmations — a relationship growing away from the spotlight."
  },
  {
    id: 5,
    title: "Engagement (Reported)",
    date: "Oct 3, 2025",
    emoji: "💍",
    description: "Reports suggest a private engagement ceremony in Hyderabad with close family."
  },
  {
    id: 6,
    title: "Forever Begins",
    date: "Feb 2026 (Rumored)",
    emoji: "♾️",
    description: "Wedding buzz points to a grand celebration — the beginning of their forever story."
  }
]
,
    gallery: [
      { id: 1, src: "https://www.froogal.in/media/websites/577/images/uploads/1769083189cxzN.webp", alt: "First date" },
      { id: 2, src: "https://www.froogal.in/media/websites/577/images/uploads/17690832130SKS.jpg", alt: "Beach sunset" },
      { id: 3, src: "https://www.froogal.in/media/websites/577/images/uploads/1769083240nqyX.jpg", alt: "Christmas together" },
      { id: 4, src: "https://www.froogal.in/media/websites/577/images/uploads/1769083189cxzN.webp", alt: "Anniversary" }
    ],
    countdown: {
      title: "Together Since",
      date: "2017-05-15",
      label: "Days of Love"
    }
  });

  if (isLoading) {
  return <HeartLoader />;
}

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Cupid Baby Shooting Love Arrows */}
      <CupidBaby />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection data={data.hero} />
        </section>
        
        {/* Love Letter Section */}
        <section id="love-letter">
          <LoveLetter content={data.loveLetter.content} />
        </section>
        
        {/* Love Story Section */}
        {/* <section id="story">
          <LoveStory />
        </section> */}
        
        {/* Love Promise Section */}
        <section id="promises">
          <LovePromise />
        </section>
        {/* Memory Timeline Section */}
        <section id="timeline">
          <MemoryTimeline items={data.timeline} />
        </section>
        
        {/* Gallery Section */}
        <section id="gallery">
          <Gallery images={data.gallery} />
        </section>
        
        {/* Countdown Section */}
        <section id="countdown">
          <Countdown data={data.countdown} />
        </section>
        
        {/* Final CTA Section */}
        <section id="cta">
          <FinalCTA />
        </section>
        
        {/* Premium Footer */}
        <footer className="relative py-16 px-4 bg-gradient-to-b from-transparent to-black/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              {/* Animated hearts */}
              <div className="flex justify-center gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <Heart className="w-10 h-10 text-valentine-red fill-valentine-red" />
                  </motion.div>
                ))}
              </div>



              {/* Copyright */}
              <div className="pt-8 border-t border-gray-200/50">
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Valentine's Day Special - A Premium Love Experience 
                </p>
                 <a href='https://www.rmtechsolution.com/' target='_blank' className="mt-8 text-center text-gray-500 text-sm">
            Made with <Heart className="inline w-4 h-4 text-red-500 animate-heart-beat" /> by RM Tech Solution
          </a>
              </div>
            </div>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-0 left-1/4 animate-float opacity-30">
            <div className="text-3xl">💕</div>
          </div>
          <div className="absolute bottom-0 right-1/4 animate-float opacity-30" style={{ animationDelay: '1s' }}>
            <div className="text-3xl">💖</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;