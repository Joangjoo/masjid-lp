import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'dark';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold text-[15px] rounded-[50px] transition-all duration-300 shadow-md cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-[#C49B5E]/50';

  const variants = {
    primary: 'bg-[#C49B5E] text-[#F8F6F3] hover:bg-[#b2894d] shadow-[0_8px_30px_rgba(196,155,94,0.35)] hover:shadow-lg border border-[#C49B5E]',
    secondary: 'bg-transparent text-white border-2 border-[#C49B5E] hover:bg-[#C49B5E] hover:text-[#F8F6F3] shadow-sm',
    dark: 'bg-[#13294B] text-[#F8F6F3] hover:bg-[#1c3c6d] shadow-md border border-[#1c3c6d]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, translateY: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};
