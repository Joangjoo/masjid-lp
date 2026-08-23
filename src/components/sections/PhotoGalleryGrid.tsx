import React from 'react';
import { motion } from 'framer-motion';
import { galleryPhotos } from '../../data/landingData';
import { SectionHeading } from '../common/SectionHeading';

export const PhotoGalleryGrid: React.FC = () => {
  const featuredPhoto = galleryPhotos.find((p) => p.featured);
  const regularPhotos = galleryPhotos.filter((p) => !p.featured);

  return (
    <section className="py-20 md:py-24 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeading
          title="Dokumentasi Setiap Momen"
          description="Kebersamaan yang Terabadikan dalam Bingkai"
          centered={true}
          className="mb-12"
        />

        {/* Asymmetrical 3-Column Masonry-Style Grid Layout (Sesuai image5.png) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Left Column (2 Cards Stacked Vertically) */}
          <div className="flex flex-col gap-6">
            {regularPhotos.slice(0, 2).map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl overflow-hidden shadow-sm h-52 sm:h-60 group relative cursor-pointer"
              >
                <img
                  src={photo.imageUrl}
                  alt="Momen Masjid"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Center Column (1 Large Featured Card Top + 1 Medium Card Bottom) */}
          <div className="flex flex-col gap-6">
            {featuredPhoto && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl overflow-hidden shadow-md h-80 sm:h-[340px] relative group cursor-pointer"
              >
                <img
                  src={featuredPhoto.imageUrl}
                  alt={featuredPhoto.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#C49B5E] mb-1">
                    {featuredPhoto.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/90 font-normal">
                    {featuredPhoto.subtitle}
                  </p>
                </div>
              </motion.div>
            )}

            {regularPhotos.slice(2, 3).map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-sm h-48 sm:h-52 group relative cursor-pointer"
              >
                <img
                  src={photo.imageUrl}
                  alt="Momen Masjid"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Right Column (2 Cards Stacked Vertically) */}
          <div className="flex flex-col gap-6">
            {regularPhotos.slice(3, 5).map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-2xl overflow-hidden shadow-sm h-52 sm:h-60 group relative cursor-pointer"
              >
                <img
                  src={photo.imageUrl}
                  alt="Momen Masjid"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
