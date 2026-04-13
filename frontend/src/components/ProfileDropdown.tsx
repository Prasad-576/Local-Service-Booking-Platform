import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LayoutDashboard, Settings, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface UserInfo {
  name: string;
  email: string;
  image?: string;
}

interface ProfileDropdownProps {
  isLoggedIn: boolean;
  user?: UserInfo;
}

export default function ProfileDropdown({ isLoggedIn, user }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        className="w-9 h-9 rounded-full border border-blue-300/50 shadow-sm overflow-hidden hover:border-blue-200 hover:scale-105 transition-all duration-300 focus:outline-none bg-blue-800/50 flex flex-col items-center justify-center text-blue-100"
      >
        {isLoggedIn && user?.image ? (
          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-5 h-5" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-[200px] rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden z-50 origin-top-right"
          >
            {isLoggedIn ? (
              <>
                {/* Logged In State */}
                <div className="p-3 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center text-blue-600">
                    {user?.image ? (
                      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || "user@example.com"}</p>
                  </div>
                </div>
                
                <div className="p-2 flex flex-col gap-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </div>

                <div className="border-t border-gray-100"></div>
                
                <div className="p-2 flex flex-col gap-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 bg-transparent rounded-lg hover:bg-red-50 transition-colors duration-200">
                    <LogOut className="w-4 h-4 text-red-500" /> Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Logged Out State */}
                <div className="p-2 flex flex-col gap-1">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <LogIn className="w-4 h-4" /> Login / Sign Up
                  </Link>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 bg-transparent rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
