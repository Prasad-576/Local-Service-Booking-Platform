import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/user-dashboard/Sidebar';
import DashboardSummaryView from '../components/user-dashboard/views/DashboardSummaryView';
import BookServiceView from '../components/user-dashboard/views/BookServiceView';
import MyBookingsView from '../components/user-dashboard/views/MyBookingsView';
import SavedProvidersView from '../components/user-dashboard/views/SavedProvidersView';
import NotificationsView from '../components/user-dashboard/views/NotificationsView';
import SettingsView from '../components/user-dashboard/views/SettingsView';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('Book Service');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardSummaryView onNavigate={setActiveTab} />;
      case 'Book Service':
        return <BookServiceView />;
      case 'My Bookings':
        return <MyBookingsView />;
      case 'Saved Providers':
        return <SavedProvidersView />;
      case 'Notifications':
        return <NotificationsView />;
      case 'Settings':
        return <SettingsView />;
      default:
        return <BookServiceView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reuse existing Navbar */}
      <Navbar />

      {/* Dashboard Layout */}
      <div className="pt-[70px] flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-[250px] min-h-[calc(100vh-70px)]">
          <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
