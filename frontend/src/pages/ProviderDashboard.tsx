import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/provider/Sidebar';
import DashboardCards from '../components/provider/DashboardCards';
import ChartSection from '../components/provider/ChartSection';
import BookingTable from '../components/provider/BookingTable';
import MultiStepForm from '../components/provider/MultiStepForm';

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden font-sans">
      {/* Homepage Navbar */}
      <Navbar />

      <div className="flex pt-[70px]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-600/10 blur-[100px]"></div>
      </div>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <main className={`flex-1 transition-all duration-300 z-10 p-6 md:p-10 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} overflow-y-auto h-screen`}>
        <AnimatePresence mode="wait">
          {activeTab === 'Dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto space-y-8"
            >
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Provider</h1>
                <p className="text-blue-200/70">Here's what's happening with your services today.</p>
              </header>

              <DashboardCards />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ChartSection />
                </div>
                <div className="lg:col-span-1">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full shadow-xl flex flex-col justify-center items-center text-center">
                     <p className="text-blue-200/50 text-sm mb-4">Quick Action</p>
                     <button onClick={() => setActiveTab('Add Service')} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all scale-100 hover:scale-105 mx-auto">
                       + Add New Service
                     </button>
                  </div>
                </div>
              </div>

              <BookingTable />
            </motion.div>
          )}

          {activeTab === 'Add Service' && (
            <motion.div
              key="add-service"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
               <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Add New Service</h1>
                <p className="text-blue-200/70">Fill out the details to list a new service offering.</p>
              </header>
              <MultiStepForm onComplete={() => setActiveTab('Dashboard')} />
            </motion.div>
          )}

          {/* Placeholders for other tabs */}
          {['Manage Services', 'Bookings', 'Earnings', 'Notifications', 'Booking History', 'Profile Settings'].includes(activeTab) && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center"
            >
               <div className="text-center p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                 <h2 className="text-2xl font-bold text-white mb-2">{activeTab}</h2>
                 <p className="text-blue-200/50">This section is coming soon.</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>
    </div>
  );
}
