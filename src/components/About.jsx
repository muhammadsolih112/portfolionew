import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Cpu, Rocket } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const About = () => {
  const { t } = usePortfolio();

  const stats = [
    { label: t.about.stats.experience, value: "2+" },
    { label: t.about.stats.projects, value: "15+" },
    { label: t.about.stats.clients, value: "10+" },
    { label: t.about.stats.awards, value: "3" },
  ];

  const features = [
    { icon: <Code2 className="text-primary" />, title: t.about.features.cleanCode, desc: t.about.features.cleanCodeDesc },
    { icon: <Palette className="text-accent" />, title: t.about.features.modernUi, desc: t.about.features.modernUiDesc },
    { icon: <Cpu className="text-secondary" />, title: t.about.features.fullStack, desc: t.about.features.fullStackDesc },
    { icon: <Rocket className="text-primary" />, title: t.about.features.performance, desc: t.about.features.performanceDesc },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">{t.about.title}</h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              {t.about.description}
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <h4 className="text-3xl font-bold text-primary mb-1">{stat.value}</h4>
                  <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, i) => (
              <div key={i} className="glass-card p-8 group hover:border-primary/50 transition-all duration-500">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
