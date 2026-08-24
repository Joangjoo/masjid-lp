import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';

export const ShareStoryCTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F8F6F3] text-[#1E1E24] text-center">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#13294B] max-w-3xl leading-tight"
        >
          Punya Kisah Bersama Kami?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            variant="primary"
            className="px-8 py-3.5 text-sm md:text-base w-full sm:w-auto font-semibold bg-[#8C6428] text-white hover:bg-[#785420] border-none shadow-md"
            onClick={() => {
              const el = document.getElementById('tulis-testimoni');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Tulis Testimoni
          </Button>

          <Button
            variant="dark"
            className="px-8 py-3.5 text-sm md:text-base w-full sm:w-auto font-semibold bg-[#13294B] text-white hover:bg-[#1c3c6d]"
            onClick={() => window.open('https://instagram.com', '_blank')}
          >
            Lihat di Instagram Kami
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
