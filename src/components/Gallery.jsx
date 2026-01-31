import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 px-4 bg-white/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-center mb-16 font-handwritten text-gray-800"
          style={{fontFamily: "emoji"}}
        >
          Precious Memories 📸
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-valentine-red/20 to-valentine-pink/20 shadow-lg">
                {/* <div className="w-full h-full flex items-center justify-center text-6xl">
                  {['❤️', '💕', '💖', '💘'][index % 4]}
                </div> */}
                {/* In a real app, you would use an actual image: */}
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
               
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-valentine-red transition-colors z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-10 h-10" />
              </button>

              <div className="relative max-w-4xl w-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative bg-gradient-to-br from-valentine-red/10 to-valentine-pink/10 rounded-3xl p-8"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-valentine-red/20 to-valentine-pink/20 flex items-center justify-center">
                     <img 
    src={images[selectedImage].src} 
    alt={images[selectedImage].alt} 
    className="w-full h-full object-contain rounded-2xl"
  />
                  </div>
                </motion.div>

                {/* Navigation buttons */}
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((selectedImage - 1 + images.length) % images.length);
                  }}
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>

                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-colors backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((selectedImage + 1) % images.length);
                  }}
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;