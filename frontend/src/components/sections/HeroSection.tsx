import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { IslamicArchDivider } from '../common/IslamicArchDivider';
import type { PrayerTime } from '../../types';
import { apiService } from '../../services/api';

interface AladhanResponse {
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
  };
}

export const HeroSection: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: 'Subuh', time: '04:38' },
    { name: 'Dzuhur', time: '11:58' },
    { name: 'Ashar', time: '15:15' },
    { name: 'Maghrib', time: '18:02' },
    { name: 'Isya', time: '19:12' },
  ]);
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
  const [locationName, setLocationName] = useState<string>('Jakarta & Sekitarnya');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrayerTimes = async (lat: number, lng: number, cityStr?: string) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`
        );
        if (!response.ok) throw new Error('Gagal mengambil data sholat');
        const data: AladhanResponse = await response.json();
        const timings = data.data.timings;

        // Clean time format e.g. "04:38 (WIB)" -> "04:38"
        const cleanTime = (t: string) => t.split(' ')[0];

        const fetched: PrayerTime[] = [
          { name: 'Subuh', time: cleanTime(timings.Fajr) },
          { name: 'Dzuhur', time: cleanTime(timings.Dhuhr) },
          { name: 'Ashar', time: cleanTime(timings.Asr) },
          { name: 'Maghrib', time: cleanTime(timings.Maghrib) },
          { name: 'Isya', time: cleanTime(timings.Isha) },
        ];

        // Determine next upcoming prayer
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        let nextIdx = -1;
        for (let i = 0; i < fetched.length; i++) {
          const [h, m] = fetched[i].time.split(':').map(Number);
          const pMinutes = h * 60 + m;
          if (pMinutes > currentMinutes) {
            nextIdx = i;
            break;
          }
        }
        if (nextIdx === -1) nextIdx = 0; // Default to Subuh tomorrow if past Isha

        const updated = fetched.map((item, idx) => ({
          ...item,
          isNext: idx === nextIdx,
        }));

        setPrayerTimes(updated);
        if (cityStr) setLocationName(cityStr);
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Geolocation fallback
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude, 'Lokasi Anda (Real-time)');
        },
        () => {
          // Jakarta default coordinates
          fetchPrayerTimes(-6.2088, 106.8456, 'Jakarta & Sekitarnya');
        },
        { timeout: 5000 }
      );
    } else {
      fetchPrayerTimes(-6.2088, 106.8456, 'Jakarta & Sekitarnya');
    }
  }, []);
  return (
    <section id="beranda" className="relative min-h-screen bg-[#13294B] pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center">
      {/* Background Lighting & Atmospheric Glow */}
      <div className="absolute inset-0 bg-hero-pattern opacity-80 pointer-events-none" />
      
      {/* Mosque Dome Silhouette Backdrop (SVG / Pure CSS Artistry) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[60%] opacity-15 pointer-events-none flex justify-center items-end">
        <svg viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#C49B5E]">
          <path d="M500 50C420 50 400 150 350 200C300 250 200 250 150 300V500H850V300C800 250 700 250 650 200C600 150 580 50 500 50Z" fill="currentColor" opacity="0.3"/>
          <path d="M500 20C490 20 485 35 485 50H515C515 35 510 20 500 20Z" fill="currentColor" opacity="0.6"/>
          <rect x="497" y="0" width="6" height="25" fill="currentColor"/>
          <circle cx="500" cy="-5" r="8" fill="currentColor"/>
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        {/* Arabic Calligraphy */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-arabic text-[#C49B5E] text-2xl md:text-4xl leading-relaxed tracking-wide select-none">
            بسم الله الرحمن الرحيم
          </span>
        </motion.div>

        {/* Arch Divider */}
        <IslamicArchDivider className="mb-6" />

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-playfair text-4xl md:text-6xl lg:text-[52px] font-bold text-white tracking-tight leading-tight max-w-4xl"
        >
          {masjidName}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 font-inter text-lg md:text-2xl text-white/85 font-normal max-w-2xl"
        >
          Menemani Ibadahmu, Merajut Kebersamaan
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            variant="primary"
            className="px-8 py-3.5 text-base w-full sm:w-auto"
            onClick={() => {
              const el = document.getElementById('jadwal-sholat');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Jadwal Sholat
          </Button>

          <Button
            variant="secondary"
            className="px-8 py-3.5 text-base w-full sm:w-auto"
            onClick={() => {
              const el = document.getElementById('donasi');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Donasi Sekarang
          </Button>
        </motion.div>

        {/* Prayer Times Quick Widget Bar */}
        <motion.div
          id="jadwal-sholat"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 w-full max-w-3xl bg-[#2E4A62]/40 backdrop-blur-md border border-[#C49B5E]/20 rounded-2xl p-4 md:p-6 text-white shadow-xl"
        >
          <div className="flex items-center justify-between mb-3 text-[#C49B5E]">
            <div className="text-xs uppercase tracking-wider font-semibold">
              Jadwal Sholat Real-time
            </div>
            <div className="text-[11px] font-medium text-white/70">
              📍 {locationName}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-4 text-center">
            {prayerTimes.map((item) => (
              <div
                key={item.name}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  item.isNext
                    ? 'bg-[#C49B5E] text-[#13294B] font-bold shadow-lg scale-105'
                    : 'bg-[#13294B]/50 text-white/90 hover:bg-[#13294B]/80'
                }`}
              >
                <div className="text-xs md:text-sm font-medium">{item.name}</div>
                <div className="text-sm md:text-base font-bold mt-1">
                  {loading ? '--:--' : item.time}
                </div>
                {item.isNext && (
                  <div className="text-[10px] uppercase font-bold tracking-tight text-[#13294B]/80 mt-0.5">
                    Mendatang
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
