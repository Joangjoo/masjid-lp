import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { videoMoments } from '../../data/landingData';

export const VideoMomentsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center mb-10">
          <span className="text-[#C49B5E] font-semibold text-xs md:text-sm tracking-widest uppercase mb-2 block">
            VIDEO KEGIATAN
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#13294B]">
            Momen Terbaik dalam Video
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {videoMoments.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer ${
                item.active 
                  ? 'border-[#C49B5E] shadow-lg ring-2 ring-[#C49B5E]/30' 
                  : 'border-[#13294B]/5 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-black">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#C49B5E] transition-all duration-300">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Title Card Footer */}
              <div className="p-4 text-center">
                <h3 className="font-playfair text-base md:text-lg font-bold text-[#13294B]">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
