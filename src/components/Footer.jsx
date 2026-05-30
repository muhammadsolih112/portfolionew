import React from 'react';
import { Github, Send, Instagram, ArrowUp, Youtube } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Footer = () => {
  const { t } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              MS.DEV
            </h3>
            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Github size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Youtube size={18} />
              </a>
              <a href="https://instagram.com/hirooosama" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://t.me/Iego_oI" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300">
                <Send size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="hover:text-primary transition-colors text-white/50">{t.nav.home}</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors text-white/50">{t.nav.about}</a></li>
              <li><a href="#skills" className="hover:text-primary transition-colors text-white/50">{t.nav.skills}</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors text-white/50">{t.nav.projects}</a></li>
              <li><a href="#video-edit" className="hover:text-primary transition-colors text-white/50">{t.nav.videoEdit}</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors text-white/50">{t.nav.contact}</a></li>
              <li><a href="#admin" className="hover:text-primary transition-colors text-white/50">{t.footer.adminPanel}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#contact" className="hover:text-primary transition-colors text-white/50">{t.contact.title}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            © 2024 Muhammad Solih. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm font-medium text-white/50 hover:text-white transition-colors"
          >
            Back to Top
            <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary transition-colors">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10" />
    </footer>
  );
};

export default Footer;
