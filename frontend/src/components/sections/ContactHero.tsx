import React from 'react';
import { motion } from 'framer-motion';

export const ContactHero: React.FC = () => {
  return (
    <section className="relative h-[480px] md:h-[540px] bg-[#13294B] flex items-center justify-center overflow-hidden">
      {/* Background Image Grid / Repeater Tile */}
      <div 
        className="absolute inset-0 bg-repeat bg-center opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=600&auto=format&fit=crop')`,
          backgroundSize: '400px 300px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#13294B] via-[#13294B]/80 to-[#13294B]/60" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center pt-20">
        {/* Golden Wave Divider (Sesuai image6.png) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-[#C49B5E]"
        >
          <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6C5 1 10 11 15 6C20 1 25 11 30 6C35 1 40 11 45 6C50 1 55 11 60 6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#C49B5E] tracking-tight"
        >
          Hubungi Kami
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 font-inter text-base md:text-xl text-white/90 font-medium tracking-wide max-w-2xl"
        >
          Sampaikan Salam, Doa, atau Pertanyaanmu. Kami Senang Mendengar dari Anda.
        </motion.p>
      </div>
    </section>
  );
};
