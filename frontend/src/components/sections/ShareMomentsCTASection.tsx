import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '../common/Button';

export const ShareMomentsCTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#2E4A62] text-white relative overflow-hidden text-center">
      {/* Curved Arch Dome Light Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />
      
      {/* Decorative Arc Curve overlay at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-40 bg-[#13294B]/40 rounded-[100%] pointer-events-none blur-xl" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#C49B5E] max-w-3xl leading-tight"
        >
          Abadikan Momen Bersama Kami
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-white/90 text-sm md:text-base max-w-2xl leading-relaxed"
        >
          Ikuti perjalanan spiritual dan kegiatan sosial kami melalui media sosial, atau bagikan momen berharga Anda di Masjid Baiturahim.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            variant="primary"
            className="px-8 py-3.5 text-sm md:text-base w-full sm:w-auto font-semibold bg-[#8C6428] text-white hover:bg-[#785420] border-none shadow-md flex items-center justify-center gap-2"
            onClick={() => window.open('https://instagram.com', '_blank')}
          >
            <Camera className="w-4 h-4" />
            <span>Follow Instagram</span>
          </Button>

          <Button
            variant="secondary"
            className="px-8 py-3.5 text-sm md:text-base w-full sm:w-auto font-semibold border-2 border-[#C49B5E] text-white hover:bg-[#C49B5E] hover:text-[#13294B] flex items-center justify-center gap-2"
            onClick={() => {
              const el = document.getElementById('kirim-foto');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Kirim Fotomu</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
