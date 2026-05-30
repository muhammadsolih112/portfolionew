import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechFlow",
      text: "The level of creativity and attention to detail is unmatched. Our website conversion increased by 40% after the redesign.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "David Chen",
      role: "Product Manager",
      text: "Exceptional technical skills combined with a great sense of design. Highly recommended for any high-end project.",
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    {
      name: "Elena Rodriguez",
      role: "Founder of Artify",
      text: "A true professional who delivers beyond expectations. The animations are smooth and the UI is absolutely beautiful.",
      avatar: "https://i.pravatar.cc/150?u=elena"
    }
  ];

  return (
    <section className="py-24 bg-white/[0.01]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="section-title">Client Voices</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 relative text-left group hover:border-primary/50 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-8 text-primary/20 group-hover:text-primary/40 transition-colors" size={48} />
              <div className="flex items-center gap-4 mb-8">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-primary/30 p-1" />
                <div>
                  <h4 className="font-bold text-lg">{t.name}</h4>
                  <p className="text-sm text-white/50">{t.role}</p>
                </div>
              </div>
              <p className="text-white/70 italic leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
