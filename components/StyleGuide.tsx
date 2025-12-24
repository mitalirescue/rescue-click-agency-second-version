import React, { useEffect, useRef, useState } from 'react';

const StyleGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="design-system" className="py-24 bg-white dark:bg-enterprise-dark transition-colors duration-300 border-t border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`mb-16 border-b border-gray-200 dark:border-white/10 pb-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                 <span className="text-brand-magenta font-bold tracking-widest uppercase text-xs mb-2 block">Internal Docs</span>
                 <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white font-heading leading-tight">
                  Rescue Click <br/><span className="text-transparent bg-clip-text bg-gradient-primary">Design System</span>
                </h2>
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-lg max-w-xl leading-relaxed">
              Standardized guidelines for the Rescue Click brand identity. Use these specs to maintain consistency across all web and mobile products.
            </p>
          </div>
        </div>

        {/* 1. Color Palette */}
        <div className={`mb-24 transition-all duration-1000 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-navy dark:text-white mb-8 border-l-4 border-brand-magenta pl-4">1. Color Palette</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Primary */}
            <div className="space-y-3">
              <div className="h-28 rounded-xl bg-brand-magenta shadow-lg flex items-end p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-white font-mono font-bold">#D3127D</span>
              </div>
              <div>
                <p className="font-bold text-navy dark:text-white">Brand Magenta</p>
                <p className="text-sm text-gray-500">Primary Action, Creative</p>
              </div>
            </div>

            {/* Secondary */}
            <div className="space-y-3">
              <div className="h-28 rounded-xl bg-brand-purple shadow-lg flex items-end p-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <span className="text-white font-mono font-bold">#5F249F</span>
              </div>
              <div>
                <p className="font-bold text-navy dark:text-white">Brand Purple</p>
                <p className="text-sm text-gray-500">Secondary, Accents</p>
              </div>
            </div>

            {/* Dark/Navy */}
            <div className="space-y-3">
              <div className="h-28 rounded-xl bg-navy shadow-lg flex items-end p-4 border border-gray-100 dark:border-white/10">
                 <span className="text-white font-mono font-bold">#0F172A</span>
              </div>
              <div>
                <p className="font-bold text-navy dark:text-white">Trust Navy</p>
                <p className="text-sm text-gray-500">Typography, Structure</p>
              </div>
            </div>

            {/* Semantic */}
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-500 shadow-sm"></div>
                    <div>
                        <p className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300">#10B981</p>
                        <p className="text-xs text-gray-500">Success</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500 shadow-sm"></div>
                    <div>
                        <p className="text-xs font-mono font-bold text-gray-600 dark:text-gray-300">#F59E0B</p>
                        <p className="text-xs text-gray-500">Warning</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* 2. Typography */}
        <div className={`mb-24 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-navy dark:text-white mb-8 border-l-4 border-brand-purple pl-4">2. Typography System</h3>
          
          <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Font Families */}
                <div className="space-y-8">
                    <div>
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-mono">Headings / Poppins</p>
                        <p className="text-5xl font-bold text-navy dark:text-white font-heading">Aa Bb Cc</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-mono">Body / Inter</p>
                        <p className="text-5xl font-light text-navy dark:text-white font-sans">Aa Bb Cc</p>
                    </div>
                </div>

                {/* Type Scale Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-navy dark:text-white">
                        <thead className="border-b border-gray-200 dark:border-white/10">
                            <tr>
                                <th className="pb-4 font-mono text-sm text-gray-500">Element</th>
                                <th className="pb-4 font-mono text-sm text-gray-500">Size / Weight</th>
                                <th className="pb-4 font-mono text-sm text-gray-500">Preview</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/5 font-sans">
                            <tr>
                                <td className="py-4 font-bold text-brand-magenta">H1 Hero</td>
                                <td className="py-4 text-sm font-mono">60px / 700</td>
                                <td className="py-4 font-heading font-bold text-3xl">Hero Title</td>
                            </tr>
                            <tr>
                                <td className="py-4 font-bold text-brand-magenta">H2 Section</td>
                                <td className="py-4 text-sm font-mono">48px / 700</td>
                                <td className="py-4 font-heading font-bold text-2xl">Section Title</td>
                            </tr>
                            <tr>
                                <td className="py-4 font-bold text-brand-magenta">H3 Card</td>
                                <td className="py-4 text-sm font-mono">24px / 600</td>
                                <td className="py-4 font-heading font-bold text-xl">Card Title</td>
                            </tr>
                            <tr>
                                <td className="py-4 font-bold text-navy dark:text-white">Body</td>
                                <td className="py-4 text-sm font-mono">16px / 400</td>
                                <td className="py-4 text-base">Standard paragraph text.</td>
                            </tr>
                            <tr>
                                <td className="py-4 font-bold text-navy dark:text-white">Button</td>
                                <td className="py-4 text-sm font-mono">16px / 600</td>
                                <td className="py-4 text-base font-bold uppercase tracking-wide">Button Text</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>

        {/* 3. UI Components */}
        <div className={`mb-24 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-navy dark:text-white mb-8 border-l-4 border-brand-blue pl-4">3. UI Component Specs</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Buttons */}
            <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Buttons</h4>
                <div className="p-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col gap-4 items-start">
                    <div className="flex items-center gap-4 w-full">
                        <button onClick={e => e.preventDefault()} className="bg-brand-magenta text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-brand-magenta/30 transition-all">
                            Primary Button
                        </button>
                        <span className="text-xs font-mono text-gray-500">Pill Shape / Radius: 9999px</span>
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <button onClick={e => e.preventDefault()} className="bg-transparent border-2 border-navy dark:border-white text-navy dark:text-white px-8 py-2.5 rounded-full font-bold hover:bg-navy hover:text-white transition-all">
                            Secondary Button
                        </button>
                        <span className="text-xs font-mono text-gray-500">Border: 2px Solid</span>
                    </div>
                </div>
            </div>

            {/* Inputs */}
             <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Input Fields</h4>
                <div className="p-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl space-y-4">
                    <div className="group">
                        <label className="text-xs text-gray-500 mb-1 block">Default State</label>
                        <input type="text" placeholder="Enter text..." className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none" disabled />
                    </div>
                    <div className="group">
                        <label className="text-xs text-brand-magenta mb-1 block">Active / Focus State</label>
                        <input type="text" value="Typing..." className="w-full bg-white dark:bg-white/5 border-2 border-brand-magenta rounded-lg px-4 py-3 text-sm focus:outline-none text-navy dark:text-white" readOnly />
                    </div>
                </div>
            </div>

            {/* Cards */}
             <div className="md:col-span-2 space-y-6">
                <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Service Cards</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 dark:bg-white/5 rounded-2xl">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-white/5">
                        <h4 className="font-heading font-bold text-lg text-navy dark:text-white mb-2">Soft Shadow Card</h4>
                        <p className="text-sm text-gray-500">bg-white, rounded-xl, shadow-lg</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-brand-magenta shadow-none relative">
                        <span className="absolute -top-3 right-4 bg-brand-magenta text-white text-[10px] font-bold px-2 py-1 rounded">ACTIVE</span>
                        <h4 className="font-heading font-bold text-lg text-navy dark:text-white mb-2">Border Card</h4>
                        <p className="text-sm text-gray-500">Used for selection states.</p>
                    </div>
                </div>
            </div>

          </div>
        </div>

        {/* 4. Iconography */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-navy dark:text-white mb-8 border-l-4 border-gray-400 pl-4">4. Iconography</h3>
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-8">
             <div>
                 <p className="font-bold text-navy dark:text-white mb-2">Library: FontAwesome 6 (Free)</p>
                 <p className="text-sm text-gray-500 max-w-sm">We use Solid icons for primary actions and Regular/Outline icons for decorative elements to maintain visual weight balance.</p>
             </div>
             <div className="flex gap-6 text-3xl text-navy dark:text-white">
                 <div className="flex flex-col items-center gap-2">
                     <i className="fas fa-shield-alt text-brand-magenta"></i>
                     <span className="text-[10px] font-mono text-gray-400">Solid</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                     <i className="far fa-paper-plane"></i>
                     <span className="text-[10px] font-mono text-gray-400">Regular</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                     <i className="fas fa-rocket text-brand-purple"></i>
                     <span className="text-[10px] font-mono text-gray-400">Solid</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                     <i className="far fa-lightbulb"></i>
                     <span className="text-[10px] font-mono text-gray-400">Regular</span>
                 </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StyleGuide;