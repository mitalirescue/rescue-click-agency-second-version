import React, { useEffect, useRef, useState } from 'react';

const WhyUs: React.FC = () => {
  // State to track if the section is visible in the viewport
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Setup the observer to trigger animations when the user scrolls to this section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Unobserve after triggering to run animation only once
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-enterprise-dark transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Side - Creative Startup Vibe */}
          {/* Apply animation classes based on visibility state */}
          <div className={`relative order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
            <div className="relative rounded-2xl overflow-hidden aspect-[5/6] shadow-2xl">
                <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Creative Team" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white text-lg font-light italic">"Great things in business are never done by one person."</p>
                </div>
            </div>
            
            {/* Geometric Accents */}
            <div className="absolute -z-10 top-12 -left-12 w-full h-full border border-gray-100 dark:border-white/5 rounded-2xl"></div>
            <div className="absolute -z-20 top-24 -left-24 w-full h-full border border-gray-50 dark:border-white/5 rounded-2xl"></div>
          </div>

          {/* Text Side - Startup Philosophy */}
          {/* Added staggered delay for better visual flow */}
          <div className={`order-1 lg:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white font-heading mb-8 leading-tight">
              Driven  by <br /> <span className="text-brand-blue">Passion.</span>
            </h2>
            
            <div className="space-y-8">
                <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-1 rounded-full bg-brand-magenta"></div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-navy dark:text-white mb-2">Agile & Adaptive</h4>
                        <p className="text-gray-500 dark:text-slate-400 leading-relaxed">
                            We move fast without breaking things. Our agile methodology ensures you get to market quicker with a product that truly fits your users' needs.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-1 rounded-full bg-brand-purple"></div>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-navy dark:text-white mb-2">Client-Centric</h4>
                        <p className="text-gray-500 dark:text-slate-400 leading-relaxed">
                            We treat every project as our own. You get direct access to the team, transparent updates, and a partner who cares about your bottom line.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 flex items-center gap-12 border-t border-gray-100 dark:border-white/10 pt-8">
              {/* <div>
                <p className="text-5xl font-bold text-navy dark:text-white font-heading">50<span className="text-brand-magenta">+</span></p>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-2">Projects Delivered</p>
              </div> */}
             <div className="ml-14">
                <p className="text-5xl font-bold text-navy dark:text-white font-heading">100<span className="text-brand-magenta">%</span></p>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-2">Client Satisfaction</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyUs;