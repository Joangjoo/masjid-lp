import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';

export const Footer: React.FC = () => {
  const [masjidName, setMasjidName] = useState<string>('Masjid Baiturahim');

  useEffect(() => {
    apiService.getProfileInfo()
      .then(data => {
        if (data && data.name) {
          setMasjidName(data.name);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-[#051124] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Description */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h3 className="font-playfair text-2xl font-bold text-[#C49B5E] tracking-wide mb-3">
              {masjidName}
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
              <li><Link to="/" className="hover:text-[#C49B5E] transition-colors">Beranda</Link></li>
              <li><Link to="/tentang" className="hover:text-[#C49B5E] transition-colors">Tentang</Link></li>
              <li><Link to="/layanan" className="hover:text-[#C49B5E] transition-colors">Layanan</Link></li>
              <li><Link to="/event" className="hover:text-[#C49B5E] transition-colors">Event</Link></li>
            </ul>
          </div>

          {/* Services Links Column 2 */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="font-playfair text-sm font-bold text-white mb-4">
              Layanan
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><Link to="/layanan" className="hover:text-[#C49B5E] transition-colors">Jadwal Sholat</Link></li>
              <li><Link to="/layanan" className="hover:text-[#C49B5E] transition-colors">Kajian</Link></li>
              <li><Link to="/layanan" className="hover:text-[#C49B5E] transition-colors">Hafalan Qur'an</Link></li>
              <li><Link to="/layanan" className="hover:text-[#C49B5E] transition-colors">Konsultasi</Link></li>
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
          <p>© {new Date().getFullYear()} {masjidName}. Dibangun dengan Iman dan Ketakwaan.</p>
          <Link to="/admin" className="mt-2 sm:mt-0 hover:text-[#C49B5E] transition-colors">
            Login CMS Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};
