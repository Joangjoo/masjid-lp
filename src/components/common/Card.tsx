import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
}) => {
  return (
    <motion.div
      initial={hoverEffect ? { y: 0 } : false}
      whileHover={
        hoverEffect
          ? {
              y: -8,
              boxShadow: '0 20px 40px -10px rgba(19, 41, 75, 0.16)',
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`bg-white rounded-[20px] p-8 shadow-[0_10px_30px_-5px_rgba(19,41,75,0.08)] border border-[#13294B]/5 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};
