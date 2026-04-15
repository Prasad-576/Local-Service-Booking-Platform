import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Clock,
  TrendingUp,
  Star,
  ArrowRight,
  Zap,
  Shield,
} from 'lucide-react';

interface DashboardSummaryViewProps {
  onNavigate: (tab: string) => void;
}

const stats = [
  {
    label: 'Total Bookings',
    value: '24',
    icon: CalendarCheck,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
  },
  {
    label: 'Active Services',
    value: '3',
    icon: Clock,
    color: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50',
  },
  {
    label: 'Avg. Rating Given',
    value: '4.7',
    icon: Star,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
  },
  {
    label: 'Money Saved',
    value: '₹2,150',
    icon: TrendingUp,
    color: 'from-purple-500 to-indigo-600',
    bgLight: 'bg-purple-50',
  },
];

const recentActivity = [
  { text: 'Electrician visit completed', time: '2 hours ago', type: 'success' },
  { text: 'AC Repair booking confirmed', time: '1 day ago', type: 'info' },
  { text: 'Plumber rating submitted', time: '3 days ago', type: 'neutral' },
];

export default function DashboardSummaryView({ onNavigate }: DashboardSummaryViewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#2563eb] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-400/10 rounded-full translate-y-1/2" />
        <div className="relative">
          <p className="text-blue-200 text-sm font-medium mb-1">Good morning,</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-blue-200/70 text-sm mb-5 max-w-lg">
            Your home is in good hands. Book your next service or check the status of your ongoing bookings.
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('Book Service')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-bold text-sm rounded-xl shadow-lg hover:bg-blue-50 transition-colors"
          >
            <Zap className="w-4 h-4" />
            Book a Service
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Book a Service', tab: 'Book Service', icon: Zap, color: 'text-blue-600 bg-blue-50' },
              { label: 'View My Bookings', tab: 'My Bookings', icon: CalendarCheck, color: 'text-green-600 bg-green-50' },
              { label: 'Saved Providers', tab: 'Saved Providers', icon: Shield, color: 'text-purple-600 bg-purple-50' },
            ].map((action) => {
              const ActionIcon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate(action.tab)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                    <ActionIcon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-1 text-left">{action.label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
