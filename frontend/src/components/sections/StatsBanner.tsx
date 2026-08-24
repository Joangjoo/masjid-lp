import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statItems as fallbackStats } from '../../data/landingData';
import { apiService } from '../../services/api';

export const StatsBanner: React.FC = () => {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    apiService.getProfileInfo()
      .then((data) => {
        if (data) {
          setStats([
            { id: '1', value: data.active_jamaah || data.activeJamaah || '500+', label: 'Jamaah Aktif' },
            { id: '2', value: data.total_programs || data.totalPrograms || '15+', label: 'Program Keagamaan' },
            { id: '3', value: data.established_year || data.establishedYear || 'Sejak 2010', label: 'Berdiri Melayani' },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-12 -mt-12 md:-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(19,41,75,0.16)] border border-[#13294B]/5 p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100"
      >
        {stats.map((stat, idx) => (
          <div
            key={stat.id}
            className={`flex flex-col items-center text-center ${
              idx !== 0 ? 'pt-6 md:pt-0' : ''
            }`}
          >
            <span className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#13294B]">
              {stat.value}
            </span>
            <span className="mt-2 text-sm md:text-base font-medium text-[#7A7A7A]">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
