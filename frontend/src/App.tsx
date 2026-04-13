import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ProviderDashboard from './pages/ProviderDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="antialiased text-gray-900 min-h-screen bg-gray-50 flex flex-col selection:bg-blue-500 selection:text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
