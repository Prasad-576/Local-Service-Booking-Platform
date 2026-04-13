import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Bell } from "lucide-react";
import { cn } from "../utils/cn";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isLoggedIn] = useState(false); // Logged out state
  const user = {
    name: "John Doe",
    email: "john@gmail.com",
  };

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

          <ProfileDropdown isLoggedIn={isLoggedIn} user={user} />
        </div>
      </div>
    </motion.header>
  );
}
