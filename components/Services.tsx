import React, { useRef, useEffect, useState } from 'react';

interface BentoCardProps {
  children?: React.ReactNode;
  className?: string;
  title: string;
  description: string;
  delay?: string;
  light?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = "", 
  title, 
  description, 
  delay = "0s",
  light = false
}) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
        light 
          ? 'bg-white border-gray-200 shadow-xl' 
          : 'bg-navy dark:bg-white/5 border-navy/5 dark:border-white/10 shadow-lg'
      } ${className}`}
      style={{ animationDelay: delay }}
    >
      {/* Background Content Container (Image/Graphic) */}
      <div className="absolute inset-0 z-0">
          {children}
      </div>

      {/* Text Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-white mb-2 group-hover:text-brand-magenta transition-colors duration-300">{title}</h3>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed opacity-90">{description}</p>
      </div>

      {/* Hover Highlight */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" ref={ref} className="py-24 bg-slate-50 dark:bg-enterprise-dark transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-brand-magenta font-bold tracking-widest uppercase text-xs mb-3 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white font-heading leading-tight mb-6">
            Everything you need to <br/> <span className="text-brand-blue">dominate digital.</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-lg">
            We don't just build websites; we engineer comprehensive digital ecosystems tailored to your business goals.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* 1. Web Architecture (Large, 2x2) */}
          <BentoCard 
            title="Web Architecture"
            description="High-performance applications built on React & Next.js. Engineered for scale, speed, and SEO."
            className={`md:col-span-2 md:row-span-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            delay="0.1s"
          >
             {/* Abstract Code Visual */}
             <div className="w-full h-full bg-slate-900 relative p-8 group-hover:scale-[1.02] transition-transform duration-700">
                <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700 opacity-90">
                    <div className="h-8 bg-slate-950 flex items-center px-4 gap-2 border-b border-slate-700">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-6 font-mono text-xs md:text-sm text-slate-300 space-y-2">
                         <div className="flex gap-2"><span className="text-purple-400">import</span> <span className="text-yellow-300">{`{ Future }`}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@rescue/click'</span>;</div>
                         <div className="flex gap-2 mt-4"><span className="text-blue-400">const</span> <span className="text-yellow-300">App</span> = <span className="text-blue-400">()</span> <span className="text-blue-400">=&gt;</span> <span className="text-yellow-300">{`{`}</span></div>
                         <div className="pl-4 flex gap-2"><span className="text-purple-400">return</span> (</div>
                         <div className="pl-8 text-green-400">{`<DigitalExperience`}</div>
                         <div className="pl-12 text-blue-300">speed=<span className="text-orange-400">{`{100}`}</span></div>
                         <div className="pl-12 text-blue-300">scale=<span className="text-green-400">"infinite"</span></div>
                         <div className="pl-8 text-green-400">{`/>`}</div>
                         <div className="pl-4">);</div>
                         <div className="text-yellow-300">{`}`}</div>
                    </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-magenta/30 blur-[100px] pointer-events-none"></div>
             </div>
          </BentoCard>

          {/* 2. Mobile Ecosystems (Tall, 1x2) */}
          <BentoCard 
            title="Mobile Ecosystems"
            description="Native iOS & Android apps that provide seamless user experiences."
            className={`md:col-span-1 md:row-span-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            delay="0.2s"
          >
             <div className="absolute inset-0 bg-navy">
                 <img 
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80" 
                    alt="Mobile App" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 group-hover:opacity-40"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"></div>
                 {/* Floating Element */}
                 <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 animate-float-slow">
                     <i className="fas fa-mobile-alt text-white text-xl"></i>
                 </div>
             </div>
          </BentoCard>

          {/* 3. UI/UX Design (Square, 1x1) */}
          <BentoCard 
            title="UI/UX Design"
            description="Interfaces designed for delight and conversion."
            className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            delay="0.3s"
          >
            <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80"
                  alt="UI/UX Design"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-navy/75 to-brand-blue/70 mix-blend-multiply"></div>
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 animate-float-slow">
                  <i className="fas fa-pen-nib text-white text-lg"></i>
                </div>
                <div className="absolute bottom-8 left-8 px-4 py-2 bg-white/12 border border-white/20 rounded-full text-xs text-white tracking-wide backdrop-blur-md">
                  Wireframes · Prototypes · Systems
                </div>
            </div>
          </BentoCard>

          {/* 4. Digital Growth (Square, 1x1) */}
          <BentoCard 
            title="Digital Growth"
            description="SEO, PPC, and analytics to scale revenue."
            className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            delay="0.4s"
          >
             <div className="absolute inset-0 bg-slate-900 flex items-end justify-center px-8 pb-16 pt-8 gap-3 group-hover:pb-20 transition-all duration-500">
                <div className="w-1/5 bg-slate-700 h-[40%] rounded-t-sm group-hover:bg-brand-blue group-hover:h-[50%] transition-all duration-500"></div>
                <div className="w-1/5 bg-slate-600 h-[60%] rounded-t-sm group-hover:bg-brand-purple group-hover:h-[75%] transition-all duration-500 delay-75"></div>
                <div className="w-1/5 bg-slate-500 h-[50%] rounded-t-sm group-hover:bg-brand-magenta group-hover:h-[65%] transition-all duration-500 delay-100"></div>
                <div className="w-1/5 bg-slate-400 h-[80%] rounded-t-sm group-hover:bg-white group-hover:h-[95%] transition-all duration-500 delay-150"></div>
             </div>
          </BentoCard>

          {/* 5. Cloud & DevOps (Square, 1x1) */}
          <BentoCard 
            title="Cloud & DevOps"
            description="Secure infrastructure on AWS & Google Cloud."
            className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            delay="0.5s"
          >
             <div className="absolute inset-0 overflow-hidden">
                 <img
                   src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80"
                   alt="Cloud infrastructure"
                   className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/60 to-brand-blue/70 mix-blend-multiply"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                     <i className="fas fa-cloud text-6xl text-white/70 group-hover:text-white transition-colors duration-500 transform group-hover:scale-110"></i>
                 </div>
                 <div className="absolute -right-8 -top-8 w-36 h-36 border-[16px] border-white/10 rounded-full animate-pulse-slow"></div>
                 <div className="absolute -left-10 -bottom-10 w-40 h-40 border-[18px] border-white/10 rounded-full animate-float-slow"></div>
             </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default Services;