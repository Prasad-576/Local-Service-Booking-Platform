import { motion } from 'framer-motion';

const bookings = [
  { id: 'BK-001', name: 'Alisha Patel', service: 'Smart Thermostat Install', status: 'Completed', time: 'Today, 2:00 PM', amount: '$120' },
  { id: 'BK-002', name: 'John Smith', service: 'AC Maintenance', status: 'In Progress', time: 'Today, 4:30 PM', amount: '$85' },
  { id: 'BK-003', name: 'Sarah Connor', service: 'Home Wiring', status: 'Pending', time: 'Tomorrow, 10:00 AM', amount: '$350' },
  { id: 'BK-004', name: 'Marcus Chen', service: 'Fan Repair', status: 'Completed', time: 'Yesterday, 1:15 PM', amount: '$60' },
];

export default function BookingTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
        <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-blue-200/50 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Time</th>
              <th className="p-4 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
                      {booking.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{booking.name}</p>
                      <p className="text-xs text-blue-200/50">{booking.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-300">{booking.service}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border
                    ${booking.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      booking.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 text-slate-300">{booking.time}</td>
                <td className="p-4 font-semibold text-white">{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
