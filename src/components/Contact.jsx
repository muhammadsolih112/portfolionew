import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Instagram, Github, Youtube } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Contact = () => {
  const { t } = usePortfolio();

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="text-white/60 text-lg mb-12">
              {t.contact.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{t.contact.email}</p>
                  <a href="mailto:igamberdiyevmuhammadsolih77@gmail.com" className="text-lg font-medium text-white hover:text-primary transition-colors">
                    igamberdiyevmuhammadsolih77@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">{t.contact.location}</p>
                  <p className="text-lg font-medium text-white">{t.contact.locationText}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 transition-colors">
                  <Github size={24} className="text-white" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 transition-colors">
                  <Youtube size={24} className="text-white" />
                </a>
                <a href="https://instagram.com/hirooosama" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-primary/20 transition-colors">
                  <Instagram size={24} className="text-white" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">{t.contact.yourName}</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">{t.contact.yourEmail}</label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">{t.contact.yourMessage}</label>
                <textarea
                  rows="5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder=""
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-5 text-lg font-bold flex items-center justify-center gap-3"
              >
                {t.contact.sendMessage} <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
