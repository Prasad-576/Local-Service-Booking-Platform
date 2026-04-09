import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="antialiased text-gray-900 min-h-screen bg-gray-50 flex flex-col selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
