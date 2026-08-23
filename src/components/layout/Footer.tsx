import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#051124] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Description */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h3 className="font-playfair text-2xl font-bold text-[#C49B5E] tracking-wide mb-3">
              Masjid Al-Hikmah
            </h3>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-sm">
              Menjadi pusat peradaban Islam yang menyejukkan, membina umat, dan menyebarkan rahmat bagi alam semesta.
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="font-playfair text-sm font-bold text-white mb-4">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#beranda" className="hover:text-[#C49B5E] transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="hover:text-[#C49B5E] transition-colors">Tentang</a></li>
              <li><a href="#layanan" className="hover:text-[#C49B5E] transition-colors">Layanan</a></li>
              <li><a href="#event" className="hover:text-[#C49B5E] transition-colors">Event</a></li>
            </ul>
          </div>

          {/* Services Links Column 2 */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="font-playfair text-sm font-bold text-white mb-4">
              Layanan
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#jadwal" className="hover:text-[#C49B5E] transition-colors">Jadwal Sholat</a></li>
              <li><a href="#kajian" className="hover:text-[#C49B5E] transition-colors">Kajian</a></li>
              <li><a href="#tahfidz" className="hover:text-[#C49B5E] transition-colors">Hafalan Qur'an</a></li>
              <li><a href="#konsultasi" className="hover:text-[#C49B5E] transition-colors">Konsultasi</a></li>
            </ul>
          </div>

          {/* Social Media Circles (FB, IG, YT, TK - Sesuai image6.png) */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end">
            <h4 className="font-playfair text-sm font-bold text-white mb-4">
              Ikuti Kami
            </h4>
            <div className="flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center text-[10px] font-bold hover:bg-[#C49B5E] hover:border-[#C49B5E] transition-colors">
                FB
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center text-[10px] font-bold hover:bg-[#C49B5E] hover:border-[#C49B5E] transition-colors">
                IG
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center text-[10px] font-bold hover:bg-[#C49B5E] hover:border-[#C49B5E] transition-colors">
                YT
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/30 text-white flex items-center justify-center text-[10px] font-bold hover:bg-[#C49B5E] hover:border-[#C49B5E] transition-colors">
                TK
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar Copyright Notice (Sesuai image6.png) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50">
          <p>© 2026 Masjid Al-Hikmah. Dibangun dengan Iman dan Ketakwaan.</p>
        </div>
      </div>
    </footer>
  );
};
