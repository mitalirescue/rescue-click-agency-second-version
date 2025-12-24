import React from 'react';

const TrustStrip: React.FC = () => {
  const techs = [
    { name: 'Google Ads', icon: 'fa-google' },
    { name: 'Meta', icon: 'fa-facebook' },
    { name: 'Shopify', icon: 'fa-shopify' },
    { name: 'React', icon: 'fa-react' },
    { name: 'AWS', icon: 'fa-aws' },
    { name: 'Figma', icon: 'fa-figma' },
    { name: 'HubSpot', icon: 'fa-hubspot' },
    { name: 'WordPress', icon: 'fa-wordpress' },
  ];

  const marqueeTechs = [...techs, ...techs, ...techs];

  return (
    <div className="w-full bg-slate-50 dark:bg-black/50 border-y border-slate-100 dark:border-white/5 py-12 transition-colors duration-300 overflow-hidden relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
         <p className="text-xs font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
          Platforms & Technologies We Use
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
          {marqueeTechs.map((tech, index) => (
            <div key={index} className="flex items-center space-x-3 mx-10 md:mx-16 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer grayscale hover:grayscale-0">
              <i className={`fab ${tech.icon} text-3xl md:text-4xl text-navy dark:text-white`}></i>
              <span className="text-xl font-bold font-heading text-navy dark:text-white hidden md:block">{tech.name}</span>
            </div>
          ))}
        </div>
        
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-enterprise-dark to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-enterprise-dark to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default TrustStrip;