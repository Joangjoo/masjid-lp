import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

export const FeaturedEventBanner: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeading
          title="Event Unggulan Bulan Ini"
          description="Jangan lewatkan momen istimewa bersama kami"
          centered={true}
        />

        {/* Large Split Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_-5px_rgba(19,41,75,0.08)] border border-[#13294B]/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left Column Image */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden h-[280px] md:h-[360px] shadow-sm relative group">
            <img
              src="https://i.pinimg.com/736x/e1/17/a2/e117a2fc5621ccaf3980d48a844d0a12.jpg"
              alt="Pesantren Ramadhan 2026"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Column Details */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 md:pr-4">
            <span className="inline-block bg-[#EAE5DC] text-[#7A7A7A] font-semibold text-xs px-3.5 py-1 rounded-md mb-4">
              15-25 Maret
            </span>

            <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-[#13294B] mb-4 leading-snug">
              Pesantren Ramadhan 2026
            </h3>

            <p className="text-[#7A7A7A] text-sm md:text-base leading-relaxed mb-6">
              Program intensif ramadhan untuk pemuda dan anak-anak.
            </p>

            <div className="flex items-center gap-2 text-xs md:text-sm text-[#7A7A7A] mb-8 font-medium">
              <MapPin className="w-4 h-4 text-[#7A7A7A]" />
              <span>Masjid Al-Hikmah</span>
            </div>

            <Button
              variant="primary"
              className="px-8 py-3 text-sm font-semibold bg-[#8C6428] text-white hover:bg-[#785420] border-none shadow-md"
              onClick={() => {
                const el = document.getElementById('daftar-event');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Daftar Sekarang
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
