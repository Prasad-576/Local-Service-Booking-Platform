import { motion } from 'framer-motion';
import { Bell, CheckCircle2, Clock, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const notifications = [
  {
    id: 1,
    title: 'Booking Confirmed',
    message: 'Your electrician booking with Rajesh Kumar is confirmed for today 10:00 AM.',
    time: '5 mins ago',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    title: 'Provider On the Way',
    message: 'Rajesh Kumar is on the way to your location. ETA: 15 minutes.',
    time: '30 mins ago',
    type: 'info',
    read: false,
  },
  {
    id: 3,
    title: 'Service Completed',
    message: 'AC Repair service by Vikram Singh has been completed. Please rate!',
    time: '1 day ago',
    type: 'success',
    read: true,
  },
  {
    id: 4,
    title: 'Payment Reminder',
    message: 'Payment of ₹448 for booking #LS283746 is pending.',
    time: '2 days ago',
    type: 'warning',
    read: true,
  },
  {
    id: 5,
    title: 'New Offer Available',
    message: 'Get 20% off on your next cleaning service! Use code CLEAN20.',
    time: '3 days ago',
    type: 'info',
    read: true,
  },
];

const iconMap: Record<string, React.ElementType> = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
};

const colorMap: Record<string, string> = {
  success: 'text-green-500 bg-green-50',
  info: 'text-blue-500 bg-blue-50',
  warning: 'text-amber-500 bg-amber-50',
};

export default function NotificationsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-400 text-sm mt-1">Stay updated with your bookings</p>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 bg-blue-50 rounded-lg">
          Mark all as read
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((notif, index) => {
          const Icon = iconMap[notif.type] || Bell;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className={cn(
                'flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm cursor-pointer',
                notif.read
                  ? 'bg-white border-gray-100'
                  : 'bg-blue-50/50 border-blue-100'
              )}
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', colorMap[notif.type])}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className={cn('text-sm font-bold', notif.read ? 'text-gray-700' : 'text-gray-900')}>
                    {notif.title}
                  </h3>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-1">{notif.message}</p>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-[11px]">{notif.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
