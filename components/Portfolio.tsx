import React, { useState, useEffect, useRef } from 'react';

 const trustlineWeb = new URL("../src/assets/Trustline_web.png", import.meta.url).href;
 const funzo_web = new URL("../src/assets/funzo_web.png", import.meta.url).href;
 const funzoApp = new URL("../src/assets/funzo_app.png",import.meta.url).href;
 const trustlineApp =new URL("../src/assets/trustline_app.png",import.meta.url).href;
 
 type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
 };
 
const projects: Project[] = [
  {
    id: 1,
    title: "Trustline Fintech",
    category: "Fintech App",
    image: trustlineWeb,
    description: "A complete fintech platform for loan processing, partner onboarding, KYC verification, EMI calculation, and earnings tracking."
  },
  {
    id: 4,
    title: "Trustline App",
    category: "Fintech Mobile",
    image:trustlineApp ,
    description: "Mobile-first lending, repayment, and partner earnings experiences."
  },

  {
    id: 2,
    title: "Funzo Web",
    category: "Entertainment Web",
    image:funzo_web,
    description: "Landing and discovery experience for high-engagement media content."
  },
  {
    id: 3,
    title: "Funzo App",
    category: "Entertainment Mobile",
    image:funzoApp,
    description: "Immersive mobile UI tuned for retention and smooth playback."
  },
 
];

const Portfolio: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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
    <section id="work" ref={ref} className="py-24 bg-[#EFEEEC] dark:bg-enterprise-dark border-t border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <span className="text-brand-purple font-bold tracking-widest uppercase text-xs mb-2 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white font-heading leading-tight">
              Crafted with   <br /> <span className="text-brand-blue">Precision.</span>
            </h2>
          </div>
          {/* <button onClick={e => e.preventDefault()} className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy dark:text-white hover:text-brand-magenta transition-colors">
            View Case Studies <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button> */}
        </div>

        {/* Mobile: horizontal scroll cards */}
        <div className="md:hidden -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="snap-start min-w-[80%] xs:min-w-[72%] sm:min-w-[65%] rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm transition-all duration-500"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="h-64 bg-[#EFEEEC] dark:bg-gray-800 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-brand-magenta text-[11px] font-semibold uppercase tracking-[0.18em] block">{project.category}</span>
                <h3 className="text-xl font-bold text-brand-blue dark:text-brand-blue font-heading">{project.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: uniform 2x2 grid (same size cards) */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-7">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group/card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-slate-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm min-h-[340px] md:min-h-[360px]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${hoveredId !== null && hoveredId !== project.id ? 'md:opacity-50 md:scale-[0.99]' : 'opacity-100 scale-100'}
              `}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute inset-0 bg-[#EFEEEC] dark:bg-gray-800 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover/card:scale-[1.04]"
                />
              </div>
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-blue/95 via-brand-blue/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-300 z-20">
                <span className="text-white text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-white font-heading mb-2">{project.title}</h3>
                <p className="text-white text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;





// import React, { useEffect, useRef, useState } from "react";

// const projects = [
//   {
//     id: 1,
//     title: "Trustline Fintech",
//     category: "Fintech Web & Mobile App",
//     image: "/images/image.png",
//     description:
//       "A complete fintech platform for loan processing, partner onboarding, KYC verification, EMI calculation, and earnings tracking."
//   },
//   {
//     id: 2,
//     title: "Desktop Application",
//     category: "Desktop Software",
//     image: "/images/desktop1.png",
//     description:
//       "A desktop-based application designed for efficient data handling with a clean and user-friendly interface."
//   },
//   {
//     id: 3,
//     title: "Funzo",
//     category: "Entertainment App",
//     image: "/images/funzo.png",
//     description:
//       "An interactive entertainment application focused on smooth UI, responsiveness, and user engagement."
//   },
//   {
//     id: 4,
//     title: "Desktop Management Tool",
//     category: "System Utility",
//     image: "/images/desktop2.png",
//     description:
//       "A desktop management tool built to simplify administrative tasks with performance-focused architecture."
//   }
// ];

// const Portfolio: React.FC = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => entry.isIntersecting && setIsVisible(true),
//       { threshold: 0.1 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       id="work"
//       ref={ref}
//       className="py-24 bg-white dark:bg-enterprise-dark"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="mb-16">
//           <span className="text-brand-purple font-bold tracking-widest uppercase text-xs block mb-2">
//             Selected Works
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white">
//             Real Projects <br />
//             <span className="text-transparent bg-clip-text bg-gradient-primary">
//               Built with Precision
//             </span>
//           </h2>
//         </div>

//         {/* Project Grid (2x2) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {projects.map((project, index) => (
//             <div
//               key={project.id}
//               className={`bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl shadow-md overflow-hidden transition-all duration-700
//                 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
//               `}
//               style={{ transitionDelay: `${index * 0.15}s` }}
//             >
//               {/* Card Content */}
//               <div className="flex flex-col sm:flex-row h-full">
                
//                 {/* Image */}
//                 <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden">
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                   />
//                 </div>

//                 {/* Info */}
//                 <div className="sm:w-1/2 p-6 flex flex-col justify-center">
//                   <span className="text-brand-magenta text-xs font-bold uppercase tracking-wider mb-2">
//                     {project.category}
//                   </span>
//                   <h3 className="text-xl font-bold text-navy dark:text-white mb-3">
//                     {project.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
//                     {project.description}
//                   </p>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Portfolio;
