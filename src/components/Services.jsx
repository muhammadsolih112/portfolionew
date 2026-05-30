import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Globe, Brain, Zap, ShieldCheck } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Globe size={32} className="text-primary" />,
      title: "Web Development",
      description: "Building high-performance, responsive websites with the latest frameworks like React and Next.js.",
      price: "Starting at $1,500"
    },
    {
      icon: <Layout size={32} className="text-accent" />,
      title: "UI/UX Design",
      description: "Creating visually stunning and user-friendly interfaces that provide an exceptional user experience.",
      price: "Starting at $1,000"
    },
    {
      icon: <Brain size={32} className="text-secondary" />,
      title: "AI Integration",
      description: "Implementing smart features and AI-driven solutions to enhance your business processes.",
      price: "Starting at $2,000"
    },
    {
      icon: <Smartphone size={32} className="text-primary" />,
      title: "Mobile Optimization",
      description: "Ensuring your website looks and performs perfectly across all devices and screen sizes.",
      price: "Included"
    },
    {
      icon: <Zap size={32} className="text-accent" />,
      title: "Performance Optimization",
      description: "Speeding up your website for better SEO and a smoother user experience.",
      price: "Starting at $500"
    },
    {
      icon: <ShieldCheck size={32} className="text-secondary" />,
      title: "Security & Maintenance",
      description: "Keeping your digital products secure and up-to-date with the latest security standards.",
      price: "Monthly Retainer"
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title inline-block"
          >
            Digital Solutions
          </motion.h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-6">
            Providing a wide range of services to help your business grow in the digital era.
            We combine creativity with technical expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 group hover:bg-white/[0.07] transition-all duration-500 relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                {service.icon}
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-2xl inline-block group-hover:bg-primary/20 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/60 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">{service.price}</span>
                <button className="text-sm font-medium hover:text-primary transition-colors">Learn More &rarr;</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
