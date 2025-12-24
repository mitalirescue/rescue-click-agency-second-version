import React from 'react';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import WhyUs from '../components/WhyUs';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Portfolio />
      <WhyUs />
      <Contact />
    </>
  );
};

export default Home;