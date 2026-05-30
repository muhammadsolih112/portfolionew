import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Github, Youtube, Instagram, Send } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Hero = () => {
  const { t, language } = usePortfolio();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = {
    en: ["Full Stack Developer", "React Specialist", "Node.js Developer"],
    uz: ["Full Stack Dasturchi", "React Mutaxassisi", "Node.js Dasturchisi"],
    ru: ["Full Stack Разработчик", "Специалист по React", "Разработчик на Node.js"],
  };

  const currentTitles = titles[language] || titles.en;

  useEffect(() => {
    setText('');
    setLoopNum(0);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleType();
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, currentTitles]);

  const handleType = () => {
    const i = loopNum % currentTitles.length;
    const fullText = currentTitles[i];

    if (!isDeleting) {
      setText(fullText.substring(0, text.length + 1));
      setTypingSpeed(150);
      if (text === fullText) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      }
    } else {
      setText(fullText.substring(0, text.length - 1));
      setTypingSpeed(100);
      if (text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-primary uppercase bg-primary/10 border border-primary/20 rounded-full">
            {t.hero.available}
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
            Muhammad Solih<br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {text}
            </span>
            <span className="text-primary animate-pulse ml-1 font-extralight">|</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 mb-10">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 cursor-pointer"
            >
              {t.hero.viewProjects} <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white/20 rounded-full font-medium transition-all flex items-center gap-2 cursor-pointer text-white hover:bg-white/10"
            >
              {t.hero.contactMe}
            </motion.a>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Youtube, href: "https://youtube.com" },
              { icon: Instagram, href: "https://instagram.com/hirooosama" },
              { icon: Send, href: "https://t.me/Iego_oI" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
              >
                <social.icon size={24} className="text-white" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 cursor-pointer hover:text-white transition-colors"
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
