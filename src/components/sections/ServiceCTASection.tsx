import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '../common/Button';

export const ServiceCTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#2E4A62] text-white relative overflow-hidden text-center">
      {/* Background Lighting/Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#C49B5E] max-w-3xl leading-tight"
        >
          Siap untuk Belajar dan Beribadah?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-white/90 text-base md:text-lg max-w-xl font-medium"
        >
          Daftarkan dirimu untuk program yang tersedia
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
            className="px-8 py-3.5 text-base w-full sm:w-auto font-semibold bg-[#8C6428] text-white hover:bg-[#785420] border-none"
            onClick={() => {
              const el = document.getElementById('daftar-program');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Daftar Program Sekarang
          </Button>

          <Button
            variant="secondary"
            className="px-8 py-3.5 text-base w-full sm:w-auto font-semibold flex items-center justify-center gap-2 border-2 border-[#C49B5E] text-white hover:bg-[#C49B5E] hover:text-[#13294B]"
            onClick={() => {
              const el = document.getElementById('jadwal-sholat');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Calendar className="w-4 h-4" />
            <span>Lihat Jadwal Lengkap</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
