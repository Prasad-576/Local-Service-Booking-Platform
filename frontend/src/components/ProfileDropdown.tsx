import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LayoutDashboard, Settings, LogIn, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
    // Could add toast here: toast.success("Logged out successfully");
    alert("Logged out successfully");
  };

  // Close on Outside Click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/70 py-1.5 pl-1.5 pr-3 text-slate-200 shadow-sm transition-all duration-300 hover:border-sky-400/30 hover:bg-slate-800/80 hover:scale-105 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-sky-400/20 bg-slate-800">
          {isLoggedIn && user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-slate-300" />
          )}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-none">
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Account</span>
          <span className="text-sm font-semibold text-white">Profile</span>
        </span>
        <ChevronDown className={`hidden sm:block h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-[220px] rounded-xl bg-[#0b1422] shadow-[0_18px_40px_rgba(2,6,23,0.5)] border border-white/10 overflow-hidden z-50 origin-top-right"
          >
            {isLoggedIn ? (
              <>
                {/* Logged In State */}
                <div className="p-3 border-b border-white/10 flex items-center gap-3 bg-white/5">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-900 flex items-center justify-center text-sky-300 border border-white/10">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-bold text-slate-100 truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email || "user@example.com"}</p>
                  </div>
                </div>
                
                <div className="p-2 flex flex-col gap-1">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 bg-transparent rounded-lg hover:bg-white/5 hover:text-sky-300 transition-colors duration-200">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 bg-transparent rounded-lg hover:bg-white/5 hover:text-sky-300 transition-colors duration-200">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 bg-transparent rounded-lg hover:bg-white/5 hover:text-sky-300 transition-colors duration-200">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                </div>

                <div className="border-t border-white/10"></div>
                
                <div className="p-2 flex flex-col gap-1">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-300 bg-transparent rounded-lg hover:bg-rose-500/10 transition-colors duration-200">
                    <LogOut className="w-4 h-4 text-rose-300" /> Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Logged Out State */}
                <div className="p-2 flex flex-col gap-1">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 bg-transparent rounded-lg hover:bg-white/5 hover:text-sky-300 transition-colors duration-200">
                    <LogIn className="w-4 h-4" /> Login / Sign Up
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 bg-transparent rounded-lg hover:bg-white/5 hover:text-sky-300 transition-colors duration-200">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 bg-transparent rounded-lg hover:bg-white/5 hover:text-sky-300 transition-colors duration-200">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
