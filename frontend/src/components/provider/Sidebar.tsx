import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Briefcase, 
  CalendarCheck, 
  PieChart, 
  Bell, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '../../utils/cn';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Add Service', icon: PlusCircle },
  { name: 'Manage Services', icon: Briefcase },
  { name: 'Bookings', icon: CalendarCheck },
  { name: 'Earnings', icon: PieChart },
  { name: 'Notifications', icon: Bell },
  { name: 'Booking History', icon: History },
  { name: 'Profile Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: { activeTab: string, setActiveTab: (t: string) => void, isOpen: boolean, setIsOpen: (o: boolean) => void }) {
  return (
    <>
      {/* Mobile Hamburger Overlay */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-indigo-600 rounded-lg text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 256 : 80 }}
        className={cn(
          "fixed top-0 left-0 h-full z-40 bg-white/5 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-all duration-300 shadow-2xl",
          !isOpen && "lg:block hidden", // fully hide on mobile if collapsed, optionally
          "translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          <div className={cn("flex items-center gap-3 overflow-hidden", !isOpen && "justify-center w-full")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg shadow-blue-500/30">
              P
            </div>
            {isOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                <h3 className="text-white font-semibold leading-tight">Provider Pro</h3>
                <span className="text-xs text-blue-300">Verified Partner</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto custom-scrollbar">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-blue-600/20 text-blue-200 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
                title={!isOpen ? item.name : undefined}
              >
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
                )}
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-blue-400" : "group-hover:text-blue-300")} />
                {isOpen && (
                  <span className="font-medium whitespace-nowrap text-sm">{item.name}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Collapse Toggle (Desktop only) */}
        <div className="hidden lg:flex p-4 border-t border-white/10">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-center p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
