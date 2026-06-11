import React from 'react';
import { Navbar } from '../components/sections/Navbar';
import Hero from '../components/sections/Hero';
import Credibility from '../components/sections/Credibility';
import Problem from '../components/sections/Problem';
import HowItWorks from '../components/sections/HowItWorks';
import Proof from '../components/sections/Proof';
import FAQ from '../components/sections/FAQ';
import FinalCTA from '../components/sections/FinalCTA';
import Footer from '../components/sections/Footer';

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-900 bg-white antialiased selection:bg-[#00B7F5] selection:text-white">
      <Navbar />
      <Hero />
      <Credibility />
      <Problem />
      <HowItWorks />
      <Proof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
