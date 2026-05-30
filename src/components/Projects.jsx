import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const Projects = () => {
  const { t } = usePortfolio();

  const projects = [
    {
      title: 'TheBestTeam.uz',
      category: {
        en: 'Team Management Platform',
        uz: 'Jamoa Boshqaruv Platformasi',
        ru: 'Платформа управления командой',
      },
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      tags: ['React', 'Node.js', 'MongoDB'],
      link: 'https://thebestteam.uz',
      github: '#',
    },
    {
      title: 'Bans.ByteMc.uz',
      category: {
        en: 'Ban Management System',
        uz: 'Ban Boshqaruv Tizimi',
        ru: 'Система управления банами',
      },
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
      tags: ['React', 'Express', 'MySQL'],
      link: 'https://bans.bytemc.uz',
      github: '#',
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="section-title mb-0">{t.projects.title}</h2>
            <p className="mt-4 max-w-xl text-white/60">
              {t.projects.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, i) => {
            const { language } = usePortfolio();
            const category = project.category[language] || project.category.en;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a href={project.link} target="_blank" rel="noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors">
                      <ExternalLink size={20} />
                    </a>
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-primary transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
                    {category}
                  </span>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors text-white">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
