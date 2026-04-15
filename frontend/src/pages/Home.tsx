import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import WhyChooseUs from '../components/WhyChooseUs';

export default function Home() {
  return (
    <div className="antialiased text-slate-100 min-h-screen bg-[#07111f] flex flex-col selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <ProcessSection />
        <WhyChooseUs />
      </main>
    </div>
  );
}
