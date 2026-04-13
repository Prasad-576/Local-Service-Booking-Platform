import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Zap, MapPin, CreditCard, Headset } from 'lucide-react';

const features = [
  {
    title: "Trusted Professionals",
    description: "Verified and skilled service providers",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden charges, clear upfront costs",
    icon: Tag,
  },
  {
    title: "Fast & Reliable Service",
    description: "Quick booking and on-time service delivery",
    icon: Zap,
  },
  {
    title: "Location-Based Matching",
    description: "Find nearby professionals بسهولة (based on user location)",
    icon: MapPin,
  },
  {
    title: "Secure Payments",
    description: "Safe and reliable payment system",
    icon: CreditCard,
  },
  {
    title: "24/7 Support",
    description: "Dedicated support anytime you need help",
    icon: Headset,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block pb-1">
            Why Choose LocalServe
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            We are committed to delivering reliable, high-quality home services with a seamless experience for both customers and service providers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-300/50 group"
              >
                <div className="bg-blue-100 text-blue-600 rounded-xl p-3 inline-flex mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[2rem] p-8 md:p-12 text-center shadow-xl hover:shadow-blue-500/20 transition-shadow duration-300 relative overflow-hidden"
        >
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Experience hassle-free home services with LocalServe today.
            </h3>
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
              Get Started
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
