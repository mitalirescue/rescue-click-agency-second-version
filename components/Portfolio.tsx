import React, { useState, useEffect, useRef } from 'react';

 const trustlineWeb = new URL("../src/assets/Trustline_web.png", import.meta.url).href;
 const funzo_web = new URL("../src/assets/funzo_web.png", import.meta.url).href;
 const funzoApp = new URL("../src/assets/funzo_app.png",import.meta.url).href;
 const trustlineApp =new URL("../src/assets/trustline_app.png",import.meta.url).href;
 
const projects = [
  {
    id: 1,
    // title: "Trustline Fintech",
    // category: "Fintech App",
    image: trustlineWeb,
    // description: "A complete fintech platform for loan processing, partner onboarding, KYC verification, EMI calculation, and earnings tracking."
  },
  {
    id: 4,
    // title: "Urban EcoBoost",
    // category: "Marketing Campaign",
    image:trustlineApp ,
    // description: "Data-driven growth strategy resulting in 300% ROI."
  },

  {
    id: 2,
    // title: "Luxe Interiors",
    // category: "E-Commerce",
    image:funzo_web,
    // description: "Immersive 3D shopping experience for high-end furniture."
  },
  {
    id: 3,
    // title: "Urban EcoBoost",
    // category: "Marketing Campaign",
    image:funzoApp,
    // description: "Data-driven growth strategy resulting in 300% ROI."
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
    <section id="work" ref={ref} className="py-24 bg-white dark:bg-enterprise-dark border-t border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <span className="text-brand-purple font-bold tracking-widest uppercase text-xs mb-2 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white font-heading leading-tight">
              Crafted with   <br /> <span className="text-brand-blue">Precision.</span>
            </h2>
          </div>
          <button onClick={e => e.preventDefault()} className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy dark:text-white hover:text-brand-magenta transition-colors">
            View Case Studies <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>

        {/* Project Grid with Focus Effect */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 group/grid"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 group/grid">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`group/card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out 
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${hoveredId !== null && hoveredId !== project.id ? 'opacity-40 scale-95 blur-[2px]' : 'opacity-100 scale-100'}
              `}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800"> */}
              <div className="h-72 md:h-96 overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover/card:translate-y-0 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                <span className="text-brand-magenta text-xs font-bold uppercase tracking-wider mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-white font-heading mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.description}</p>
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
