import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';

export const JoinCommunitySection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#2E4A62] text-white relative overflow-hidden text-center">
      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight"
        >
          Jadilah Bagian dari Keluarga Besar Kami
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-white/85 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          Kami mengundang Anda untuk berkontribusi, baik sebagai relawan maupun jamaah tetap, dalam memakmurkan rumah Allah ini.
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
            className="px-8 py-3.5 text-base w-full sm:w-auto font-semibold"
            onClick={() => {
              const el = document.getElementById('kontak');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Gabung Relawan
          </Button>

          <Button
            variant="secondary"
            className="px-8 py-3.5 text-base w-full sm:w-auto font-semibold"
            onClick={() => {
              const el = document.getElementById('kontak');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Hubungi Kami
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
