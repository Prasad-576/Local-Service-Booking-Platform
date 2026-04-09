import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';

export default function App() {
  return (
    <div className="antialiased text-gray-900 min-h-screen bg-gray-50 flex flex-col selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <ProcessSection />
      </main>
    </div>
  );
}
