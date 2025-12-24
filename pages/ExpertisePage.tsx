import React from 'react';

const ExpertisePage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 bg-white min-h-screen">

      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-brand-purple/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <span className="text-brand-magenta font-bold tracking-widest uppercase text-sm mb-4 block">Our Capabilities</span>
            <h1 className="text-5xl md:text-6xl font-bold text-navy font-heading mb-6 leading-tight">
              Comprehensive <br /> <span className="text-transparent bg-clip-text bg-gradient-primary">Digital Solutions.</span>
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              We combine design, technology, and strategy to build products that drive real business results.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dive Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">

          {/* Web Dev */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 text-brand-blue">
                <i className="fas fa-laptop-code text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-6">Web Development</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Your website is your digital storefront. We build lightning-fast, SEO-optimized, and visually stunning websites that convert visitors into customers.
              </p>
              <ul className="space-y-4">
                {[
                  'Custom React & Next.js Applications',
                  'E-commerce Solutions (Shopify/WooCommerce)',
                  'Corporate Websites & Portals',
                  'CMS Development'
                ].map(item => (
                  <li key={item} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-brand-magenta mr-3"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100 aspect-video">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80" alt="Web Development" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* App Dev */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-1 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100 aspect-video">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Mobile Apps" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="order-2 lg:order-2 animate-fade-in-up">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 text-brand-purple">
                <i className="fas fa-mobile-alt text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-6">App Development</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Reach your customers wherever they are. We design and develop intuitive mobile applications for iOS and Android that users love.
              </p>
              <ul className="space-y-4">
                {[
                  'Native iOS & Android Apps',
                  'Cross-Platform (Flutter/React Native)',
                  'UI/UX Design & Prototyping',
                  'App Store Optimization (ASO)'
                ].map(item => (
                  <li key={item} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-brand-magenta mr-3"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Marketing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-8 text-brand-magenta">
                <i className="fas fa-bullhorn text-3xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-6">Digital Marketing</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Build your brand and grow your revenue. Our data-driven marketing strategies ensure you reach the right audience at the right time.
              </p>
              <ul className="space-y-4">
                {[
                  'Search Engine Optimization (SEO)',
                  'Pay-Per-Click Advertising (PPC)',
                  'Social Media Management',
                  'Content Marketing Strategy'
                ].map(item => (
                  <li key={item} className="flex items-center text-gray-700">
                    <i className="fas fa-check-circle text-brand-magenta mr-3"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-100 aspect-video">
                <img src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80" alt="Digital Marketing" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>



          
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8">Ready to start your project?</h2>
          <a href="/#contact" className="inline-block bg-gradient-primary text-white text-lg font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-brand-magenta/30 transition-all transform hover:-translate-y-1">
            Get a Free Consultation
          </a>
        </div>
      </section>

    </div>
  );
};

export default ExpertisePage;