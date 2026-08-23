import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';

export const EventProposalCTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#4A6482] text-white relative overflow-hidden text-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-15 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#C49B5E] max-w-3xl leading-tight"
        >
          Punya Ide Kegiatan untuk Komunitas?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-white/90 text-sm md:text-base max-w-2xl leading-relaxed"
        >
          Masjid Al-Hikmah terbuka untuk saran dan usulan event dari jamaah. Mari kita ramaikan masjid bersama!
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
            className="px-8 py-3.5 text-sm md:text-base w-full sm:w-auto font-semibold bg-[#8C6428] text-white hover:bg-[#785420] border-none shadow-md"
            onClick={() => {
              const el = document.getElementById('usulkan-event');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Usulkan Event
          </Button>

          <Button
            variant="secondary"
            className="px-8 py-3.5 text-sm md:text-base w-full sm:w-auto font-semibold border-2 border-[#C49B5E] text-white hover:bg-[#C49B5E] hover:text-[#13294B]"
            onClick={() => {
              const el = document.getElementById('arsip-event');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Lihat Arsip Event
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
