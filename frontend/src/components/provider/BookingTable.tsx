import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/bookings/provider/${user._id}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        // Refresh local state
        setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) return <div className="text-white text-center p-4">Loading bookings...</div>;

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
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {bookings.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center text-slate-400">No bookings yet.</td></tr>
            ) : bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
                      {booking.userId?.name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-white">{booking.userId?.name || 'Unknown'}</p>
                      <p className="text-xs text-blue-200/50">ID: {booking._id.slice(-6)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-300">{booking.serviceId?.title || 'Custom Service'}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border uppercase
                    ${booking.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      booking.status === 'accepted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      booking.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-4 text-slate-300">{booking.timeSlot}</td>
                <td className="p-4 font-semibold text-white">
                  {booking.status === 'pending' && (
                      <div className="flex gap-2">
                          <button onClick={() => updateStatus(booking._id, 'accepted')} className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-xs hover:bg-green-500/30">Accept</button>
                          <button onClick={() => updateStatus(booking._id, 'rejected')} className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs hover:bg-red-500/30">Reject</button>
                      </div>
                  )}
                  {booking.status === 'accepted' && (
                      <button onClick={() => updateStatus(booking._id, 'completed')} className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-xs hover:bg-blue-500/30">Complete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
