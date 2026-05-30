import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Youtube, Instagram, Send, Globe } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.videoEdit, href: "#video-edit" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "uz", name: "O'zbek", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'} bg-dark/80 backdrop-blur-xl`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          MS.DEV
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Globe size={20} className="text-white" />
                <span className="text-white/70 text-sm font-medium">
                  {languages.find(l => l.code === language)?.flag}
                </span>
              </button>
              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 glass-card p-2"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                          language === lang.code ? 'bg-primary/20 text-primary' : 'text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/70 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white/70 hover:text-primary transition-colors">
              <Youtube size={20} />
            </a>
            <a href="https://instagram.com/hirooosama" target="_blank" rel="noreferrer" className="text-white/70 hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://t.me/Iego_oI" target="_blank" rel="noreferrer" className="text-white/70 hover:text-primary transition-colors">
              <Send size={20} />
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Globe size={20} className="text-white" />
            <span className="text-white/70 text-sm font-medium ml-2">
              {languages.find(l => l.code === language)?.flag}
            </span>
          </button>
          <AnimatePresence>
            {languageMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-16 right-6 md:right-0 md:top-auto glass-card p-2 z-50"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLanguageMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                      language === lang.code ? 'bg-primary/20 text-primary' : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark/95 backdrop-blur-xl border-b border-white/10 py-8 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-medium text-white/70 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex justify-center space-x-6 pt-6">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white/70">
                  <Github size={24} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white/70">
                  <Youtube size={24} />
                </a>
                <a href="https://instagram.com/hirooosama" target="_blank" rel="noreferrer" className="text-white/70">
                  <Instagram size={24} />
                </a>
                <a href="https://t.me/Iego_oI" target="_blank" rel="noreferrer" className="text-white/70">
                  <Send size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
