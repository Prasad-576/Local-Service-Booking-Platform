import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Truck, Wrench, AlertCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const bookings = [
  {
    id: '#LS283746',
    service: 'Electrician',
    provider: 'Rajesh Kumar',
    date: 'Apr 15, 2026',
    time: '10:00 AM',
    status: 'In Progress',
    amount: '₹448',
  },
  {
    id: '#LS283701',
    service: 'AC Repair',
    provider: 'Vikram Singh',
    date: 'Apr 14, 2026',
    time: '3:00 PM',
    status: 'Completed',
    amount: '₹598',
  },
  {
    id: '#LS283689',
    service: 'Cleaning',
    provider: 'Priya Patel',
    date: 'Apr 12, 2026',
    time: '12:00 PM',
    status: 'Completed',
    amount: '₹498',
  },
  {
    id: '#LS283655',
    service: 'Plumbing',
    provider: 'Suresh Reddy',
    date: 'Apr 10, 2026',
    time: '10:00 AM',
    status: 'Cancelled',
    amount: '₹0',
  },
  {
    id: '#LS283620',
    service: 'Painting',
    provider: 'Meena Iyer',
    date: 'Apr 8, 2026',
    time: '5:00 PM',
    status: 'Pending',
    amount: '₹478',
  },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
  'In Progress': { icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  'On the Way': { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  Completed: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
  Cancelled: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
};

export default function MyBookingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-400 text-sm mt-1">View and manage all your service bookings</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-semibold border-2 whitespace-nowrap transition-all',
              tab === 'All'
                ? 'bg-blue-50 text-blue-700 border-blue-400'
                : 'bg-white text-gray-500 border-gray-200 hover:border-blue-200'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-3">
        {bookings.map((booking, index) => {
          const status = statusConfig[booking.status];
          const StatusIcon = status?.icon || Clock;
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-bold text-gray-900 text-sm">{booking.service}</h3>
                    <span className="text-xs text-gray-400">{booking.id}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    <span className="font-medium text-gray-700">{booking.provider}</span> · {booking.date} · {booking.time}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
                      status?.bg, status?.color
                    )}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {booking.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{booking.amount}</p>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors mt-1">
                    View Details →
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
