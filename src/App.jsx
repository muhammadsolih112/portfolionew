import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import VideoEdit from './components/VideoEdit';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [videos, setVideos] = useState(() => {
    // Load videos from localStorage on initial render
    const savedVideos = localStorage.getItem('portfolioVideos');
    if (savedVideos) {
      try {
        return JSON.parse(savedVideos);
      } catch (e) {
        console.error('Failed to parse videos from localStorage:', e);
      }
    }
    // Default sample video if none found
    return [
      {
        id: 1,
        title: 'Sample Project Demo',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        likes: 12,
        dislikes: 2,
        comments: [
          { id: 1, username: 'JohnDoe', text: 'Great video!', pinned: true },
          { id: 2, username: 'JaneSmith', text: 'Very helpful, thanks!', pinned: false },
        ],
      },
    ];
  });

  // Save videos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolioVideos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#admin') {
          setShowAdminPanel(true);
          return;
        }
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    return () => clearTimeout(timer);
  }, []);

  if (showAdminPanel) {
    return isLoggedIn ? (
      <AdminPanel
        onLogout={() => {
          setIsLoggedIn(false);
          setShowAdminPanel(false);
        }}
        videos={videos}
        setVideos={setVideos}
      />
    ) : (
      <AdminLogin onLogin={() => setIsLoggedIn(true)} />
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      <CustomCursor />
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <VideoEdit videos={videos} setVideos={setVideos} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
