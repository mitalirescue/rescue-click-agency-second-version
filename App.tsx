import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const isDark = false;
  const toggleTheme = () => {};

  return (
    <div className="min-h-screen bg-white">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Home />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;