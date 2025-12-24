import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 100,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-32 pb-20">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay z-0"></div>
      
      <div 
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-purple/15 rounded-full blur-[100px] animate-pulse-slow"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-magenta/10 rounded-full blur-[100px] animate-pulse-slow"
        style={{ transform: `translateY(-${scrollY * 0.1}px)` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col items-start text-left space-y-8">
            
            {/* Trust Badge */}
            {/* <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-full px-3 py-1 backdrop-blur-md shadow-sm animate-fade-in-up">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white dark:border-navy overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Client" className="w-full h-full object-cover" />
                    </div>
                 ))}
              </div>
              <span className="text-xs font-semibold text-navy dark:text-white pl-1 pr-1">Trusted by 50+ Innovators</span>
            </div> */}
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading text-navy leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              We build <span className=" text-brand-blue">digital products</span> that scale.
            </h1>
            
            <p className="text-lg text-gray-700 max-w-lg leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Rescue Click is a full-service agency engineering robust ecosystems. From custom web platforms to AI-driven marketing strategies, we turn complexity into clarity.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a 
                href="#contact" 
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="group relative bg-navy text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-brand-purple/20 transition-all hover:-translate-y-1 overflow-hidden"
              >
                {/* <div className="absolute inset-0 bg-gradient-to-r from-brand-magenta to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue-dark"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Start Project <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </span>
              </a>
              <a 
                href="#expertise" 
                onClick={(e) => handleScrollTo(e, 'expertise')}
                className="px-8 py-4 rounded-full font-bold text-navy border border-gray-200 hover:bg-gray-50 transition-all"
              >
                View Services
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200 w-full animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div>
                    <h4 className="text-3xl font-bold text-navy">98%</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Retention</p>
                </div>
                {/* <div>
                    <h4 className="text-3xl font-bold text-navy dark:text-white">50+</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Launches</p>
                </div> */}
                <div>
                    <h4 className="text-3xl font-bold text-navy">24/7</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Support</p>
                </div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="relative perspective-1000 hidden lg:block">
            <div 
              className="relative z-10 bg-gradient-to-br from-gray-50 to-gray-200 rounded-[2.5rem] p-4 shadow-2xl border border-white/50 animate-fade-in will-change-transform"
              style={{ 
                transform: `rotateY(${mousePos.x * 2}deg) rotateX(${mousePos.y * -2}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
               <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3]">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80" 
                    alt="Agency Dashboard" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Glass Overlay Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-white/40 p-6 rounded-2xl flex items-center justify-between">
                      <div>
                          <p className="text-gray-600 text-xs font-bold uppercase tracking-wider mb-1">Current Revenue</p>
                          <p className="text-navy text-2xl font-bold font-heading">₹1,24,500 <span className="text-emerald-500 text-sm font-normal">+12%</span></p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-brand-magenta flex items-center justify-center text-white shadow-lg shadow-brand-magenta/40">
                          <i className="fas fa-chart-line"></i>
                      </div>
                  </div>
               </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 -right-10 w-24 h-24 bg-brand-blue rounded-2xl rotate-12 blur-xl opacity-40 animate-float-slow"></div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-brand-purple rounded-full blur-xl opacity-40 animate-float-slow" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Scroll</span>
          <i className="fas fa-chevron-down text-gray-400"></i>
      </div>
    </section>
  );
};

export default Hero;