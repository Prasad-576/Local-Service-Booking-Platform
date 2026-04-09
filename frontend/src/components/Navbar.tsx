import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Bell, User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { cn } from "../utils/cn";

export default function Navbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  const menuItems = ["Home", "Services", "Pricing", "Contact"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#2563eb] shadow-[0_4px_20px_rgba(30,58,138,0.3)] border-b border-blue-400/20"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4 text-white">
          <button className="lg:hidden p-2 rounded-full hover:bg-white/10 hover:text-blue-200 transition-all active:scale-95 duration-300">
            <Menu className="w-6 h-6" />
          </button>

          <a href="#" className="hidden sm:block text-2xl font-bold tracking-wider text-white">
            Local<span className="font-light text-blue-200">Serve</span>
          </a>
          {/* Mobile Logo */}
          <a href="#" className="sm:hidden text-lg font-bold tracking-wider text-white">
            Precision<span className="font-light text-blue-200">Svc</span>
          </a>
        </div>

        {/* Center: Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveMenu(item)}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-all duration-300 h-[70px] flex items-center group",
                activeMenu === item ? "text-white" : "text-blue-100 hover:text-white"
              )}
            >
              {item}
              {/* Active Indicator & Hover Underline Animation */}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[3px] bg-blue-400 transition-all duration-300 rounded-t-sm",
                activeMenu === item ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              )}></span>
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6 relative">
          <button className="p-2 rounded-full text-white hover:text-blue-200 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-[#1e3a8a] shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full border border-blue-300/50 shadow-sm overflow-hidden hover:border-blue-200 hover:scale-105 transition-all duration-300 focus:outline-none"
            >
              <div className="w-full h-full bg-blue-800/50 flex items-center justify-center text-blue-100">
                <User className="w-5 h-5" />
              </div>
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-56 rounded-xl bg-white backdrop-blur-xl shadow-2xl border border-gray-100 py-2 overflow-hidden z-50 origin-top-right"
                >
                  <div className="px-4 py-3 border-b border-gray-50 mb-1 bg-gray-50/50">
                    <p className="text-sm font-bold text-gray-900 leading-tight">Marcus Chen</p>
                    <p className="text-xs text-gray-500 mt-0.5">marcus@example.com</p>
                  </div>
                  
                  <div className="py-1">
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#2563eb] transition-colors duration-200">
                      <LayoutDashboard className="w-4 h-4 text-gray-400" /> Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-[#2563eb] transition-colors duration-200">
                      <Settings className="w-4 h-4 text-gray-400" /> Settings
                    </a>
                  </div>
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="py-1">
                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200">
                      <LogOut className="w-4 h-4 text-red-400" /> Sign out
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
