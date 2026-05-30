import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';

const TechStack = () => {
  const { t } = usePortfolio();

  const technologies = [
    { name: 'JavaScript', level: 95, color: 'from-yellow-400 to-yellow-600' },
    { name: 'React.js', level: 92, color: 'from-blue-400 to-blue-600' },
    { name: 'HTML', level: 98, color: 'from-orange-400 to-orange-600' },
    { name: 'CSS', level: 96, color: 'from-blue-500 to-purple-500' },
    { name: 'MySQL', level: 85, color: 'from-blue-600 to-blue-800' },
    { name: 'Node.js', level: 88, color: 'from-green-400 to-green-600' },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">{t.skills.title}</h2>
            <p className="text-white/60 text-lg mb-10">
              {t.skills.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {t.skills.categories.map((cat, i) => (
                <span key={i} className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-white">
                  {cat}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            {technologies.map((tech, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-medium text-white">{tech.name}</span>
                  <span className="text-sm text-white/50">{tech.level}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: i * 0.1 }}
                    className={`h-full bg-gradient-to-r ${tech.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
