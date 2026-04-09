import { motion, type Variants } from "framer-motion";
import { User, Wrench, Search, CalendarCheck, CheckCircle2, UserPlus, ClipboardList, DollarSign, Bell, Briefcase } from "lucide-react";

const customerSteps = [
  {
    title: "Login / Sign Up",
    description: "User creates an account or logs into the platform securely.",
    icon: User,
  },
  {
    title: "Select Service",
    description: "Choose required service (electrician, plumbing, cleaning, etc.).",
    icon: Wrench,
  },
  {
    title: "View Providers",
    description: "See nearby service providers based on location, compare pricing and ratings.",
    icon: Search,
  },
  {
    title: "Book Service",
    description: "Select a convenient time slot and confirm the booking instantly.",
    icon: CalendarCheck,
  },
  {
    title: "Get Work Done",
    description: "Professional arrives and completes the job to your satisfaction.",
    icon: CheckCircle2,
  },
];

const providerSteps = [
  {
    title: "Login / Register",
    description: "Service provider creates an account and goes through verification.",
    icon: UserPlus,
  },
  {
    title: "List Services",
    description: "Add specific services and specializations that they offer.",
    icon: ClipboardList,
  },
  {
    title: "Set Pricing",
    description: "Define competitive pricing structure for each service category.",
    icon: DollarSign,
  },
  {
    title: "Receive Bookings",
    description: "Get notified instantly when a user books your offered service.",
    icon: Bell,
  },
  {
    title: "Accept & Complete Work",
    description: "Accept request, visit location, and complete the job efficiently.",
    icon: Briefcase,
  },
];

export default function ProcessSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const leftItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.5 }
    }
  };

  const rightItemVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.5 }
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern / Blur */}
      <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-300 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-40 -right-64 w-96 h-96 bg-indigo-300 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-500 mb-6 inline-block pb-1"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          >
            A seamless and efficient process designed for both customers and service providers to ensure smooth and reliable service delivery.
          </motion.p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
          
          {/* Section 1: For Customers */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="mb-10 lg:mb-12">
              <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-[#2563eb] pl-4">
                For Customers
              </h3>
            </div>

            <div className="relative border-l-2 border-blue-100 pl-8 ml-4 space-y-10">
              {customerSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={index}
                    variants={leftItemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-transparent hover:border-blue-200"
                  >
                    {/* Focus Glow */}
                    <div className="absolute inset-0 bg-[#2563eb]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

                    {/* Step Timeline Indicator */}
                    <div className="absolute -left-[51px] top-6 w-10 h-10 bg-white rounded-full border-4 border-blue-100 flex items-center justify-center shadow-sm group-hover:border-[#2563eb] transition-colors duration-300 z-10">
                      <span className="text-[#2563eb] font-bold text-sm tracking-tighter">0{index + 1}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
                      <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-300 text-[#2563eb]">
                        <Icon className="w-6 h-6 transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#2563eb] transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Section 2: For Service Providers */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="mb-10 lg:mb-12">
              <h3 className="text-2xl font-bold text-gray-900 border-l-4 border-[#1e40af] pl-4">
                For Service Providers
              </h3>
            </div>

            <div className="relative border-l-2 border-indigo-100 pl-8 ml-4 space-y-10">
              {providerSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={index}
                    variants={rightItemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-gradient-to-br from-blue-100/60 to-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-transparent hover:border-indigo-200"
                  >
                    {/* Focus Glow */}
                    <div className="absolute inset-0 bg-[#1e40af]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>

                    {/* Step Timeline Indicator */}
                    <div className="absolute -left-[51px] top-6 w-10 h-10 bg-white rounded-full border-4 border-indigo-100 flex items-center justify-center shadow-sm group-hover:border-[#1e40af] transition-colors duration-300 z-10">
                      <span className="text-[#1e40af] font-bold text-sm tracking-tighter">0{index + 1}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
                      <div className="shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-[#1e40af] group-hover:text-white transition-colors duration-300 text-[#1e40af]">
                        <Icon className="w-6 h-6 transition-colors duration-300" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#1e40af] transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
