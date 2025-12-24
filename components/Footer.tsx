import React from 'react';
import logo from "../src/assets/rescue-logo.png";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-tr-xl rounded-bl-xl  flex items-center justify-center mr-2">
                <img
                  src={logo}
                  alt="Rescue Click Logo"
                  className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
              <span className="font-heading font-bold text-2xl text-white tracking-tight">
                Rescue<span className="text-transparent bg-clip-text bg-gradient-primary">Click</span>
              </span>
            </div>
            <p className="text-gray-300 mb-8 max-w-sm leading-relaxed text-sm">
              A forward-thinking digital agency transforming ideas into digital reality. We build fast, scalable, and beautiful solutions for modern businesses.
            </p>
           

            <div className="flex space-x-2 ">
              {[
                { icon: 'instagram', link: 'https://www.instagram.com/rescue_click/#' },
                { icon: 'linkedin-in', link: 'https://www.linkedin.com/company/rescue-click-pvt-ltd/' }, 
                { icon: 'facebook-f', link: 'https://www.facebook.com/rescueclickbpo/' },
                
              ].map(({ icon, link }) => (
                <a
                  key={icon}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#0F172A] transition-all duration-300"
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>

          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6">Agency</h4>
            <ul className="space-y-4 text-gray-200 text-sm">
              <li><a href="#home" onClick={(e) => handleScroll(e, 'home')} className="hover:text-brand-magenta transition-colors">Home</a></li>
              <li><a href="#expertise" onClick={(e) => handleScroll(e, 'expertise')} className="hover:text-brand-magenta transition-colors">Services</a></li>
              <li><a href="#work" onClick={(e) => handleScroll(e, 'work')} className="hover:text-brand-magenta transition-colors">Portfolio</a></li>
              <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="hover:text-brand-magenta transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6">Services</h4>
            <ul className="space-y-4 text-gray-200 text-sm">
              <li><a href="#expertise" onClick={(e) => handleScroll(e, 'expertise')} className="hover:text-brand-magenta transition-colors">Web Development</a></li>
              <li><a href="#expertise" onClick={(e) => handleScroll(e, 'expertise')} className="hover:text-brand-magenta transition-colors">Mobile Apps</a></li>
              <li><a href="#expertise" onClick={(e) => handleScroll(e, 'expertise')} className="hover:text-brand-magenta transition-colors">Digital Marketing</a></li>
              <li><a href="#expertise" onClick={(e) => handleScroll(e, 'expertise')} className="hover:text-brand-magenta transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-6">Internal</h4>
            <ul className="space-y-4 text-gray-200 text-sm">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-magenta transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-magenta transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-300 text-xs">
          <p className="text-gray-300">&copy; {year} Rescue Click. All rights reserved.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Accepting New Projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;