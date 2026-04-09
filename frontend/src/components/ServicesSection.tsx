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
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Intro Text */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700 mb-6 inline-block pb-1"
          >
            Our Professional Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
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
                className="group cursor-pointer bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#eff6ff] rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-blue-100 transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#2563eb]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#2563eb] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-2 text-sm font-semibold text-[#2563eb] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 mt-auto">
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
