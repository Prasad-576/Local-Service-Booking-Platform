import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Bell } from "lucide-react";
import { cn } from "../utils/cn";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isLoggedIn] = useState(false); // Logged out state
  const [isScrolled, setIsScrolled] = useState(false);
  const user = {
    name: "John Doe",
    email: "john@gmail.com",
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ["Home", "Services", "Pricing", "Contact"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-[#08101c]/88 backdrop-blur-xl shadow-[0_8px_24px_rgba(2,6,23,0.35)] border-white/10"
          : "bg-gradient-to-r from-[#081120] via-[#0c1728] to-[#132238] shadow-[0_10px_30px_rgba(2,6,23,0.45)] border-sky-500/10"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-4 text-white">
          <button className="lg:hidden p-2 rounded-full hover:bg-white/10 hover:text-blue-200 transition-all active:scale-95 duration-300">
            <Menu className="w-6 h-6" />
          </button>

          <a href="#" className="hidden sm:block text-2xl font-bold tracking-wider text-white">
            Local<span className="font-light text-slate-400">Serve</span>
          </a>
          {/* Mobile Logo */}
          <a href="#" className="sm:hidden text-lg font-bold tracking-wider text-white">
            Local<span className="font-light text-slate-400">Serve</span>
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
                activeMenu === item ? "text-white" : "text-slate-300 hover:text-white"
              )}
            >
              {item}
              {/* Active Indicator & Hover Underline Animation */}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[3px] bg-sky-400 transition-all duration-300 rounded-t-sm",
                activeMenu === item ? "opacity-100" : "opacity-0 group-hover:opacity-40"
              )}></span>
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6 relative">
          <button className="p-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full border border-[#132238] shadow-[0_0_8px_rgba(251,113,133,0.7)]"></span>
          </button>

          <ProfileDropdown isLoggedIn={isLoggedIn} user={user} />
        </div>
      </div>
    </motion.header>
  );
}
