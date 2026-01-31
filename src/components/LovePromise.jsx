import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Key, Shield, Crown, Target, Zap ,Heart} from 'lucide-react';

const LovePromise = ({ promises: finalPromisesData = [] }) => {

  const [activePromise, setActivePromise] = useState(null);

 const promises = [
  {
    id: 1,
    title: "Unbreakable Promise",
    description: "No matter how loud the world gets or how tough the storms become, I promise to stand with you — fearless, loyal, and unwavering.",
    icon: Lock,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Love Without Limits",
    description: "My love for you won’t follow rules, boundaries, or expectations. It will be wild, honest, endless, and unapologetically true.",
    icon: Heart,
    color: "from-red-500 to-orange-500"
  },
  {
    id: 3,
    title: "Rise Together",
    description: "I promise we’ll grow stronger together — chasing dreams, breaking limits, and becoming the best versions of ourselves, side by side.",
    icon: Target,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    title: "Protect Your Heart",
    description: "Your heart is my responsibility, my honor, and my forever priority. I’ll protect it with strength, respect, and devotion.",
    icon: Shield,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 5,
    title: "Partners in Madness",
    description: "From spontaneous trips to crazy dreams, I promise to live every adventure with you — boldly, passionately, and wholeheartedly.",
    icon: Zap,
    color: "from-yellow-500 to-amber-500"
  },
  {
    id: 6,
    title: "My Always, My Forever",
    description: "In every crowd, every success, and every quiet night — you will always be my constant, my comfort, and my forever choice.",
    icon: Crown,
    color: "from-indigo-500 to-purple-500"
  }
  ];


const iconList = [Lock, Heart, Target, Shield, Zap, Crown];
const colorList = [
  "from-purple-500 to-pink-500",
  "from-red-500 to-orange-500",
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-amber-500",
  "from-indigo-500 to-purple-500"
];

  const finalPromises = finalPromisesData.length
    ? finalPromisesData.map((p, i) => ({
        id: i + 1,
        title: p.title,
        description: p.description,
        icon: iconList[i % iconList.length],
        color: colorList[i % colorList.length]
      }))
    : promises;
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white/30 to-valentine-light/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-valentine-red text-8xl opacity-10"
            >
              ❤️
            </motion.div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold font-handwritten relative z-10">
            <span  className="bg-gradient-to-r from-valentine-red via-valentine-pink to-pink-400 bg-clip-text text-transparent">
              Promises From My Heart
            </span>
          </h2>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            These are not just words, but sacred vows that come from the deepest part of my soul.
          </p>
        </motion.div>

        {/* Interactive promises grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(finalPromises || promises).map((promise, index) => {
            const Icon = promise.icon;
            const isActive = activePromise === promise.id;

            return (
              <motion.div
                key={promise.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setActivePromise(isActive ? null : promise.id)}
                className="cursor-pointer"
              >
                <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 transition-all duration-300 ${
                  isActive ? 'border-valentine-red scale-105' : 'border-white/20'
                }`}>
                  {/* Icon with gradient */}
                  <motion.div
                    animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${promise.color} p-4 mb-6 flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3  className="text-2xl font-bold text-gray-800 mb-3">{promise.title}</h3>

                  {/* Description with expandable content */}
                  <motion.div
                    initial={false}
                    // animate={{ height: isActive ? 'auto' : '0' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 leading-relaxed">{promise.description}</p>
                    
                    {/* Signature for active state */}
                   
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 pt-6 border-t border-gray-100"
                      >
                        <div className="text-right">
                          <div  className="font-handwritten text-2xl text-valentine-red inline-block">
                            With All My Love
                          </div>
                          <div className="w-32 h-px bg-gradient-to-r from-transparent via-valentine-red to-transparent ml-auto mt-2"></div>
                        </div>
                      </motion.div>
                   
                  </motion.div>

                </div>

                {/* Connection dots */}
                {index < promises.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-valentine-red to-valentine-pink"></div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Love lock at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl">
            <Lock className="w-8 h-8 text-valentine-red" />
            <div>
              <div className="font-handwritten text-2xl text-gray-800">Our Love Is Locked Forever</div>
              <div className="text-sm text-gray-500">Thrown away the key to eternity</div>
            </div>
            <Key className="w-8 h-8 text-valentine-pink" />
          </div>
        </motion.div>

        {/* Floating hearts */}
        <div className="absolute top-10 left-10 animate-float">
          <div className="text-4xl">🔒</div>
        </div>
        <div className="absolute bottom-10 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="text-4xl">💝</div>
        </div>
      </div>
    </section>
  );
};

export default LovePromise;