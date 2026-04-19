import { motion, type Variants } from "framer-motion";
import { Zap, Droplet, Sparkles, Wind, Paintbrush, Hammer, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Electrician",
    description: "Expert electrical repairs, installations, and safety checks.",
    icon: Zap,
  },
  {
    title: "Plumbing",
    description: "Fix leaks, pipe repairs, and full bathroom installations.",
    icon: Droplet,
  },
  {
    title: "Cleaning",
    description: "Comprehensive deep cleaning for your home and office.",
    icon: Sparkles,
  },
  {
    title: "AC Repair",
    description: "Fast and reliable AC servicing, repair, and installation.",
    icon: Wind,
  },
  {
    title: "Painting",
    description: "Professional interior and exterior painting services.",
    icon: Paintbrush,
  },
  {
    title: "Carpentry",
    description: "Custom furniture sizing, repairs, and woodwork.",
    icon: Hammer,
  },
];

export default function ServicesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.5 }
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-[#0a1424] relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Intro Text */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-300 mb-6 inline-block pb-1"
          >
            Our Professional Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            We provide a wide range of expert home services designed to make your life easier. From electrical repairs to deep cleaning, our professionals deliver high-quality work with precision and reliability.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer bg-gradient-to-b from-[#111c2d] to-[#0b1422] rounded-2xl p-6 shadow-[0_12px_30px_rgba(2,6,23,0.28)] hover:shadow-[0_20px_40px_rgba(2,6,23,0.4)] transition-all duration-300 border border-white/8 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-sm transition-all duration-300 border border-white/10">
                    <Icon className="w-7 h-7 text-sky-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-sky-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-2 text-sm font-semibold text-sky-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 mt-auto">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
