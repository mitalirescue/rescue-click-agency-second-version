




import React, { useState, useEffect } from 'react';
import logo from "../src/assets/rescue-logo.png";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark: _isDark, toggleTheme: _toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Scroll effect for navbar and active link
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'expertise', 'work', 'contact'];
      if (window.scrollY < 100) {
        setActiveLink('home');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveLink(targetId);

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { name: 'Home', link: 'home' },
    { name: 'Expertise', link: 'expertise' },
    { name: 'Work', link: 'work' },
  ];

  // Dark mode toggle effect on html
  // useEffect(() => {
  //   if (isDark) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [isDark]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-0'}`}>
      <nav
        className={`transition-all duration-500 ease-in-out ${
          scrolled
            ? 'w-full md:w-auto bg-white/95 md:bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg px-4 py-3 md:px-4 md:py-2 md:rounded-full'
            : 'w-full bg-transparent py-6 px-4 md:px-8'
        }`}
      >
        <div className={`flex items-center justify-between ${scrolled ? 'max-w-none' : 'max-w-7xl mx-auto'}`}>

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className={`flex items-center gap-2`}
          >
         
            <img
              src={logo}
              alt="Rescue Click Logo"
              className="w-12 h-10 object-contain transition-transform duration-300 hover:scale-110"
            />
          
            <span className="font-bold text-xl text-gray-900 hidden sm:block">
              Rescue<span className="text-blue-600">Click</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-5 ml-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.link}`}
                onClick={(e) => handleNavClick(e, item.link)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${activeLink === item.link
                  ? 'bg-brand-blue text-white shadow'
                  : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Let's Talk Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="bg-brand-blue text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all ml-3"
            >
              Let's Talk
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-1 text-gray-900 focus:outline-none p-2"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-2 pb-2 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.link}`}
                onClick={(e) => handleNavClick(e, item.link)}
                className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${activeLink === item.link
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
