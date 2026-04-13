import { motion } from 'framer-motion';
import { CalendarCheck, DollarSign, Activity, Clock } from 'lucide-react';

const stats = [
  { title: 'Total Bookings', value: '142', icon: CalendarCheck, trend: '+12%', color: 'text-blue-400' },
  { title: 'Earnings', value: '$4,250', icon: DollarSign, trend: '+8%', color: 'text-emerald-400' },
  { title: 'Active Services', value: '8', icon: Activity, trend: 'Stable', color: 'text-indigo-400' },
  { title: 'Pending Requests', value: '14', icon: Clock, trend: '-2%', color: 'text-amber-400' },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group"
        >
          {/* Subtle glow */}
          <div className="absolute -inset-1 opacity-0 group-hover:opacity-20 transition-opacity blur-xl bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          
          <div className="relative flex justify-between items-start">
            <div>
              <p className="text-blue-200/60 font-medium text-sm mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
              <p className={`text-xs mt-2 font-medium ${stat.trend.startsWith('+') ? 'text-emerald-400' : stat.trend.startsWith('-') ? 'text-red-400' : 'text-blue-400/70'}`}>
                {stat.trend} this week
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
