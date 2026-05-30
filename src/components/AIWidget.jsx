import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, Image, Paperclip } from 'lucide-react';

const AIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: "Hello! This premium portfolio was exclusively crafted by Muhammad Solih. If you're interested in owning this template or hiring me, feel free to drop a message!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    
    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    // Simulated static response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "Thank you for reaching out! This masterpiece was developed by Muhammad Solih. If you'd like to purchase this portfolio template or collaborate, please contact me via the contact section or Telegram.",
        timestamp: new Date() 
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
            className="mb-6 w-[380px] md:w-[420px] h-[600px] glass-morphism rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col border border-white/20 backdrop-blur-2xl"
          >
            {/* Premium Header */}
            <div className="p-6 bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-inner">
                    <Bot size={28} className="text-white animate-float" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg tracking-tight">Nexus AI</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-xs text-white/70 font-medium uppercase tracking-widest">Active Assistant</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-dark/40">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                      <Bot size={16} className="text-primary" />
                    </div>
                  )}
                  <div className={`relative max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-none shadow-lg' 
                    : 'bg-white/5 text-white/90 rounded-bl-none border border-white/10 backdrop-blur-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-2 opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                      <User size={16} className="text-white/60" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Bot size={16} className="text-primary animate-spin" />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/10">
                    <div className="flex gap-1">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Premium Input */}
            <div className="p-6 border-t border-white/10 bg-dark/60 backdrop-blur-xl">
              <div className="relative group flex items-center gap-2">
                <div className="flex gap-2">
                  <button className="p-2 text-white/40 hover:text-primary transition-colors">
                    <Image size={20} />
                  </button>
                  <button className="p-2 text-white/40 hover:text-primary transition-colors">
                    <Paperclip size={20} />
                  </button>
                </div>
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isLoading ? "Processing link..." : "Send a message..."}
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all pr-14 disabled:opacity-50 placeholder:text-white/20"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      input.trim() && !isLoading 
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]' 
                      : 'bg-white/5 text-white/20'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-center text-white/20 mt-4 uppercase tracking-[0.2em] font-medium">
                Nexus Interactive Experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group z-[1000]"
      >
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-500" />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 90, 0]
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-accent"
        >
          <Sparkles size={24} />
        </motion.div>

        <div className={`relative w-16 h-16 flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'bg-dark border border-white/10' : 'bg-[#7c3aed]'
        } rounded-2xl shadow-2xl overflow-visible`}>
          <div className={`absolute bottom-0 right-4 w-4 h-4 transform translate-y-1/2 rotate-45 ${
            isOpen ? 'bg-dark border-r border-b border-white/10' : 'bg-[#7c3aed]'
          }`} />
          
          {isOpen ? (
            <X size={32} className="text-white" />
          ) : (
            <div className="relative">
              <MessageSquare size={32} className="text-white fill-white" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary font-bold text-lg select-none">
                1
              </div>
            </div>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default AIWidget;
