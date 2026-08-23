import React from 'react';
import { motion } from 'framer-motion';

export const HistoryVisionSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Image Card Comparison / History */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_-5px_rgba(19,41,75,0.08)] border border-[#13294B]/5 flex flex-col justify-between"
          >
            <div>
              <div className="text-center mb-6">
                <span className="text-[#7A7A7A] text-sm font-medium">Tentang Kami</span>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#13294B] mt-1">
                  Masjid Al-Hikmah
                </h3>
              </div>

              {/* Side-by-side or Split Image Comparison */}
              <div className="grid grid-cols-2 gap-3 rounded-xl overflow-hidden shadow-inner">
                <div className="relative group overflow-hidden">
                  <img
                    src="https://i.pinimg.com/736x/bf/ef/37/bfef375fc381f4e1491bcfe71b63fefd.jpg"
                    alt="Mushola Kayu 2010"
                    className="w-full h-48 md:h-60 object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                    <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded">2010</span>
                  </div>
                </div>

                <div className="relative group overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=600&auto=format&fit=crop"
                    alt="Masjid Megah Sekarang"
                    className="w-full h-48 md:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-2 text-center">
                    <span className="text-white text-xs font-semibold bg-[#C49B5E] px-2 py-1 rounded">Sekarang</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs md:text-sm text-[#7A7A7A] font-medium leading-relaxed">
              Perjalanan Kami: Dari 2010 yang Sederhana Menuju Kemegahan Hari Ini
            </p>
          </motion.div>

          {/* Right Column: Narrative History, Vision & Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#13294B] mb-6">
              Awal Mula yang Berkah
            </h2>

            <p className="text-[#1E1E24]/85 text-base md:text-lg leading-relaxed mb-8">
              Perjalanan kami dimulai pada tahun 2010 dari sebuah mushola kayu yang sederhana. Dengan niat tulus dan dukungan jamaah, Masjid Al-Hikmah kini bertransformasi menjadi pusat peradaban umat yang megah. Kami terus berkomitmen menjaga nilai-nilai luhur keislaman sambil terus beradaptasi dengan kemajuan zaman demi kemaslahatan bersama.
            </p>

            {/* Vision Card */}
            <div className="bg-[#2E4A62] text-white rounded-xl p-6 mb-5 border-l-4 border-[#C49B5E] shadow-md">
              <h4 className="font-playfair text-xl font-bold text-[#C49B5E] mb-2">Visi</h4>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Menjadi pusat ibadah dan dakwah yang mencerahkan serta mempersatukan umat.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-[#2E4A62] text-white rounded-xl p-6 border-l-4 border-[#C49B5E] shadow-md">
              <h4 className="font-playfair text-xl font-bold text-[#C49B5E] mb-2">Misi</h4>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Menyelenggarakan pelayanan ibadah dan program pendidikan berkualitas berlandaskan Al-Qur'an.
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
