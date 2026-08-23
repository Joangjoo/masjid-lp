import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Users, MessageSquare } from 'lucide-react';
import { serviceCategories } from '../../data/landingData';

export const ServiceCategories: React.FC = () => {
  const renderIcon = (iconName: string) => {
    const iconClasses = "w-8 h-8 text-[#C49B5E] group-hover:text-white transition-colors duration-300";
    switch (iconName) {
      case 'home':
        return <Home className={iconClasses} />;
      case 'book':
        return <BookOpen className={iconClasses} />;
      case 'users':
        return <Users className={iconClasses} />;
      case 'message':
        return <MessageSquare className={iconClasses} />;
      default:
        return <Home className={iconClasses} />;
    }
  };

  return (
    <div className="relative z-20 max-w-[1280px] mx-auto px-6 md:px-12 -mt-16 md:-mt-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {serviceCategories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_-5px_rgba(19,41,75,0.08)] border border-[#13294B]/5 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#C49B5E]/10 flex items-center justify-center mb-4 group-hover:bg-[#C49B5E] transition-colors duration-300">
              {renderIcon(cat.icon)}
            </div>

            <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#13294B] mb-2">
              {cat.name}
            </h3>

            <span className="text-[11px] font-semibold text-[#C49B5E] bg-[#C49B5E]/10 border border-[#C49B5E]/20 px-3 py-0.5 rounded-full">
              {cat.badge}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
