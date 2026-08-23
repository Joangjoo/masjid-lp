import React from 'react';
import { motion } from 'framer-motion';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative h-[480px] md:h-[540px] bg-[#13294B] flex items-center justify-center overflow-hidden">
      {/* Background Image / Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=1600&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#13294B] via-[#13294B]/70 to-[#13294B]/50" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
        >
          Tentang Masjid Al-Hikmah
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 font-inter text-base md:text-xl text-[#C49B5E] font-medium tracking-wide"
        >
          Berdiri di Atas Iman, Tumbuh Bersama Umat
        </motion.p>
      </div>
    </section>
  );
};
