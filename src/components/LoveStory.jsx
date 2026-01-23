import React from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Star, Diamond } from 'lucide-react';

const LoveStory = () => {
const chapters = [
  {
    title: "A Reel Beginning",
    date: "2018",
    description: "They first met on the sets of Geetha Govindam, where their on-screen chemistry sparked admiration and the whispers of something more beyond the camera lights.",
    icon: Star,
    color: "from-yellow-400 to-orange-400"
  },
  {
    title: "From Rumors to Reality",
    date: "2020 - 2024",
    description: "Years of speculation, subtle shared moments, and fan-driven excitement followed their collaborations and public appearances — hinting at a bond growing quietly stronger off-camera.",
    icon: Heart,
    color: "from-red-400 to-pink-400"
  },
  {
    title: "A Secret Engagement",
    date: "October 2025",
    description: "Reports emerged that the couple exchanged rings in a private ceremony in Hyderabad, marking a new chapter in their journey together, cherished by family and close friends.",
    icon: Diamond,
    color: "from-blue-400 to-purple-400"
  },
  {
    title: "Wedding Dreams in Motion",
    date: "February 2026",
    description: "With wedding plans said to be underway — possibly in Udaipur or a destination locale — their love story continues toward what fans hope will be a lifetime commitment.",
    icon: BookOpen,
    color: "from-green-400 to-teal-400"
  }
];


  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-valentine-red" />
            <h2 className="text-5xl md:text-6xl font-bold font-handwritten bg-gradient-to-r from-valentine-red to-valentine-pink bg-clip-text text-transparent">
              Our Love Story
            </h2>
            <BookOpen className="w-10 h-10 text-valentine-pink" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A journey of two hearts becoming one, told through cherished moments and endless love.
          </p>
        </motion.div>

        {/* Story timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chapters.map((chapter, index) => {
            const Icon = chapter.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                {/* Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 h-full transform transition-transform duration-300 group-hover:scale-105">
                  {/* Decorative number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-r from-valentine-red to-valentine-pink flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${chapter.color} p-4 mb-6`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{chapter.title}</h3>
                  <div className="text-valentine-red font-semibold mb-4">{chapter.date}</div>
                  <p className="text-gray-600 leading-relaxed">{chapter.description}</p>

                  {/* Decorative bottom */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="text-valentine-red"
                        >
                          ❤️
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector lines for desktop */}
                {index < chapters.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-valentine-red to-valentine-pink"></div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-4 animate-float">
          <div className="text-4xl">📖</div>
        </div>
        <div className="absolute bottom-1/4 right-4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="text-4xl">💌</div>
        </div>
      </div>
    </section>
  );
};

export default LoveStory;