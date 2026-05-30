import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter Template",
      price: "$5",
      features: ["Modern UI Design", "Responsive Layout", "Basic Animations", "Clean Code", "Documentation"],
      button: "Buy Template",
      highlight: false
    },
    {
      name: "Premium Portfolio",
      price: "$49",
      features: ["Ultra Modern Design", "Advanced GSAP/Framer", "Three.js Effects", "AI Chat Integration", "Custom Domain Support", "Priority Support"],
      button: "Get Premium",
      highlight: true
    },
    {
      name: "Custom Project",
      price: "Custom",
      features: ["Tailored Solutions", "End-to-End Development", "Full Support", "SEO Optimization", "Unlimited Revisions"],
      button: "Contact Me",
      highlight: false
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title inline-block">Simple Pricing</h2>
          <p className="text-white/60 mt-4">Choose the perfect plan for your digital presence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-10 flex flex-col ${plan.highlight ? 'border-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.2)] relative' : ''}`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-xs font-bold uppercase tracking-widest">
                  Recommended
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-white/50 text-sm">/one-time</span>}
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check size={18} className="text-primary" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                plan.highlight 
                ? 'bg-primary hover:bg-secondary text-white' 
                : 'bg-white/5 hover:bg-white/10 text-white'
              }`}>
                {plan.button} <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
