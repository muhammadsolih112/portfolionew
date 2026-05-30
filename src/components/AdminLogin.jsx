import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const AdminLogin = ({ onLogin }) => {
  const { t } = usePortfolio();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'muhammadsolih' && password === '016016') {
      onLogin();
    } else {
      setError(t.admin.login.invalid);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">{t.admin.login.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">{t.admin.login.username}</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                placeholder=""
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">{t.admin.login.password}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                placeholder=""
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn-primary w-full py-3 text-lg font-medium"
          >
            {t.admin.login.login}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
