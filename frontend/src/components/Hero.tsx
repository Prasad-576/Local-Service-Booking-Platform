import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/images/Hero1.png";

export default function Hero() {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "tween", ease: "easeOut", duration: 0.6 } 
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-[70px]">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroImg})` }}
      ></div>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/80 via-[#1e3a8a]/70 to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-12 pb-20 lg:py-0">
        
        {/* Left Content Area */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-3/5 text-left"
        >
          {/* Subtle badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-blue-400/30 bg-blue-900/40 backdrop-blur-md shadow-sm">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold tracking-wide text-blue-100">
              Rated #1 Home Service Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white"
          >
            Book Trusted <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Home Services
            </span>
            <br />
            Instantly
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl mb-10 max-w-xl text-[#e5e7eb] leading-relaxed font-medium"
          >
            Professional electricians, plumbers, and more — verified, reliable, and just a click away for your ultimate peace of mind.
          </motion.p>

          {/* Actions Container */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mt-2">
            <motion.button 
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex justify-center items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-xl font-bold text-white text-lg shadow-[0_8px_20px_rgba(37,99,235,0.4)] transition-all duration-300 overflow-hidden"
            >
              Book Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] -translate-x-[150%] group-hover:animate-[shine_1s_ease-in-out]"></span>
            </motion.button>

            <motion.button 
              onClick={() => navigate('/provider-dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex justify-center items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] rounded-xl font-bold text-white text-lg shadow-[0_8px_20px_rgba(37,99,235,0.4)] transition-all duration-300 overflow-hidden"
            >
              Be a Provider Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] -translate-x-[150%] group-hover:animate-[shine_1s_ease-in-out]"></span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Content Area - Floating Glass Card */}
        <div className="w-full lg:w-2/5 flex lg:justify-end items-center relative lg:h-full mt-10 lg:mt-0">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: [0, -12, 0],
              opacity: 1
            }}
            transition={{
              opacity: { delay: 1, duration: 0.8 },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="w-full sm:max-w-sm rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] lg:ml-auto relative z-20"
          >
            {/* Minimal decorative blur */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20 -z-10"></div>
            
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=150&h=150" 
                  alt="Marcus Chen" 
                  className="w-12 h-12 rounded-full object-cover shadow-md border border-white/30"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1e3a8a]"></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-white font-bold text-sm tracking-wide">Marcus Chen</h4>
                  <CheckCircle className="w-3.5 h-3.5 text-blue-300" />
                </div>
                <p className="text-xs text-blue-200 font-medium mb-2">Smart Home Specialist</p>
                
                <div className="bg-[#0f172a]/60 rounded-lg p-3 border border-white/5 shadow-inner mt-2">
                  <p className="text-gray-100 text-[13px] leading-relaxed font-medium">
                    "Arriving in 15 mins for your smart home setup."
                  </p>
                </div>
              </div>
            </div>
            
          </motion.div>
        </div>
        
      </div>

      <style>{`
        @keyframes shine {
          100% { translate: 400% 0; }
        }
      `}</style>
    </section>
  );
}
