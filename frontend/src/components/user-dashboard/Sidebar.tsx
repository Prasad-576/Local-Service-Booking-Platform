import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  Heart,
  Bell,
  Settings,
  X,
  Menu,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Book Service', icon: CalendarPlus, highlight: true },
  { label: 'My Bookings', icon: ClipboardList },
  { label: 'Saved Providers', icon: Heart },
  { label: 'Notifications', icon: Bell },
  { label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const handleTabClick = (label: string) => {
    setActiveTab(label);
    setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Mobile close button */}
      <div className="lg:hidden flex justify-end px-4 pt-4">
        <button
          onClick={() => setIsMobileOpen(false)}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 pt-6 pb-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.label;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              onClick={() => handleTabClick(item.label)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group',
                isActive
                  ? 'bg-blue-500/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                  : 'text-blue-100/70 hover:text-white hover:bg-white/5'
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-blue-400 rounded-r-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}

              <Icon
                className={cn(
                  'w-5 h-5 transition-colors duration-300',
                  isActive ? 'text-blue-400' : 'text-blue-200/50 group-hover:text-blue-300'
                )}
              />
              <span>{item.label}</span>

              {/* Highlight badge for Book Service */}
              {item.highlight && !isActive && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-bold bg-blue-500 text-white rounded-full">
                  NEW
                </span>
              )}

              {/* Notification count */}
              {item.label === 'Notifications' && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full">
                  3
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4 border border-white/5">
          <p className="text-white text-xs font-semibold mb-1">Need Help?</p>
          <p className="text-blue-200/50 text-[11px] mb-3">Contact our 24/7 support team</p>
          <button className="w-full py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors shadow-md">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-[78px] left-4 z-40 p-2.5 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[250px] min-h-[calc(100vh-70px)] bg-gradient-to-b from-[#0f172a] via-[#1e3a8a]/95 to-[#1e3a8a] border-r border-white/5 fixed top-[70px] left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 w-[280px] h-full bg-gradient-to-b from-[#0f172a] via-[#1e3a8a]/95 to-[#1e3a8a] z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
