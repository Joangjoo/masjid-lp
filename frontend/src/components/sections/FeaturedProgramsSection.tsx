import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, HeartHandshake, HelpCircle, ArrowRight } from 'lucide-react';
import { programItems as fallbackPrograms } from '../../data/landingData';
import { SectionHeading } from '../common/SectionHeading';
import { apiService } from '../../services/api';

export const FeaturedProgramsSection: React.FC = () => {
  const [programs, setPrograms] = useState<any[]>(fallbackPrograms);

  useEffect(() => {
    apiService.getPrograms()
      .then((data) => {
        if (data && data.length > 0) {
          setPrograms(data);
        }
      })
      .catch(() => {});
  }, []);

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return <Clock className="w-6 h-6 text-[#13294B]" />;
      case 'users':
        return <Users className="w-6 h-6 text-[#13294B]" />;
      case 'book-open':
      case 'book':
        return <BookOpen className="w-6 h-6 text-[#13294B]" />;
      case 'heart-handshake':
      case 'heart':
        return <HeartHandshake className="w-6 h-6 text-[#13294B]" />;
      case 'help-circle':
        return <HelpCircle className="w-6 h-6 text-[#13294B]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#13294B]" />;
    }
  };

  const featuredProgram = programs.find((p) => p.is_featured || p.featured) || programs[0];
  const otherPrograms = programs.filter((p) => p !== featuredProgram);

  return (
    <section className="py-20 md:py-28 bg-[#F8F6F3]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <SectionHeading
          title="Program Pilihan untuk Jamaah"
          description="Ikuti kegiatan yang sesuai dengan kebutuhanmu"
          centered={true}
        />

        {/* Asymmetrical Asymmetric Bento Grid (Sesuai image2.png) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Top Left (2 cards stacked vertically or grid layout) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPrograms.slice(0, 2).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#F3F0EC]/80 rounded-2xl p-6 border border-[#13294B]/5 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gray-200/80 flex items-center justify-center mb-4">
                      {getProgramIcon(item.icon)}
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-[#13294B] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#7A7A7A] text-xs md:text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  <a
                    href={item.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#13294B] hover:text-[#C49B5E] transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Featured Highlighted Large Card (Program Hafalan Qur'an - Warm Beige Gradient Card) */}
            {featuredProgram && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-[#FAF6F0] via-[#F4EDE2] to-[#EBE2D3] rounded-2xl p-8 border border-[#C49B5E]/30 shadow-sm flex flex-col justify-between flex-1 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#C49B5E]/20 flex items-center justify-center mb-6 border border-[#C49B5E]/40">
                    {getProgramIcon(featuredProgram.icon)}
                  </div>
                  <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#13294B] mb-4">
                    {featuredProgram.title}
                  </h3>
                  <p className="text-[#1E1E24]/80 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                    {featuredProgram.description}
                  </p>
                </div>
                <a
                  href={featuredProgram.linkHref}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#13294B] hover:text-[#C49B5E] transition-colors"
                >
                  <span>{featuredProgram.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>
              </motion.div>
            )}
          </div>

          {/* Right Column (2 Stacked Cards on Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {otherPrograms.slice(2, 4).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#F3F0EC]/80 rounded-2xl p-6 md:p-8 border border-[#13294B]/5 flex flex-col justify-between flex-1 hover:bg-white hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gray-200/80 flex items-center justify-center mb-4">
                    {getProgramIcon(item.icon)}
                  </div>
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#13294B] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#7A7A7A] text-xs md:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <a
                  href={item.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#13294B] hover:text-[#C49B5E] transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
