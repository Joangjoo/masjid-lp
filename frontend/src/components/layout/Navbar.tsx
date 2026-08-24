import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { navLinks } from '../../data/landingData';
import { useScrollNavbar } from '../../hooks/useScrollNavbar';
import { Button } from '../common/Button';
import { apiService } from '../../services/api';

interface NavbarProps {
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/' }) => {
  const isScrolled = useScrollNavbar(40);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'solid-nav py-3' : 'glass-nav py-5'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#C49B5E]/20 border border-[#C49B5E] flex items-center justify-center text-[#C49B5E] group-hover:scale-105 transition-transform duration-300">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L15 8H9L12 2Z" />
              <path d="M3 21V10L12 4L21 10V21H3Z" />
              <path d="M9 21V15H15V21" />
            </svg>
          </div>
          <span className="font-playfair text-xl md:text-2xl font-bold text-white tracking-wide">
            {masjidName}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`text-[15px] font-medium transition-colors duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#C49B5E] font-semibold after:w-full'
                    : 'text-white/90 hover:text-[#C49B5E] after:w-0 hover:after:w-full'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C49B5E] after:transition-all after:duration-300`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center">
          <Button
            variant="primary"
            className="px-7 py-2.5 text-[14px]"
            onClick={() => {
              const el = document.getElementById('donasi');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Donasi
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={26} className="text-[#C49B5E]" /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#13294B]/98 border-b border-[#C49B5E]/20 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-white/5 ${
                    currentPath === link.href ? 'text-[#C49B5E] font-semibold' : 'text-white/90 hover:text-[#C49B5E]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  variant="primary"
                  className="w-full py-3 text-base flex items-center justify-center gap-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <Heart size={18} /> Donasi Sekarang
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
