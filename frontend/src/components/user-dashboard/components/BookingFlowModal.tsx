import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  MapPin,
  Upload,
  IndianRupee,
  AlertTriangle,
  CheckCircle2,
  Star,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { Provider } from './ProviderCard';
import { useAuth } from '../../../context/AuthContext';

interface BookingFlowModalProps {
  provider: Provider;
  selectedCategory: string;
  location: string;
  onClose: () => void;
}

const timeSlots = [
  { time: '10:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '5:00 PM', available: true },
];

const statusSteps = [
  { label: 'Pending', icon: '⏳', done: true },
  { label: 'Accepted', icon: '✅', done: true },
  { label: 'On the way', icon: '🚗', done: false },
  { label: 'Work in progress', icon: '🛠', done: false },
  { label: 'Completed', icon: '✔', done: false },
];

export default function BookingFlowModal({
  provider,
  selectedCategory,
  location,
  onClose,
}: BookingFlowModalProps) {
  const [step, setStep] = useState(1); // 1: form, 2: confirm, 3: status
  const [selectedSlot, setSelectedSlot] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [address, setAddress] = useState(location || 'Mumbai, Maharashtra');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const visitingCharge = provider.visitingCharge;
  const serviceCharge = 299;
  const urgencyCharge = urgency === 'urgent' ? 100 : 0;
  const totalAmount = visitingCharge + serviceCharge + urgencyCharge;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('userId', user._id);
      data.append('providerId', provider.providerId || '');
      data.append('serviceId', provider.id.toString());
      data.append('description', description);
      data.append('address', address);
      data.append('timeSlot', selectedSlot);
      
      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        setStep(3);
      } else {
        console.error('Booking failed');
      }
    } catch (err) {
      console.error('Failed to create booking', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:w-[520px] sm:max-h-[90vh] max-h-[85vh] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {step === 1 && 'Book Service'}
                {step === 2 && 'Confirm Booking'}
                {step === 3 && 'Booking Status'}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {step === 1 && 'Fill in your booking details'}
                {step === 2 && 'Review and confirm'}
                {step === 3 && 'Track your booking'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Provider Info (always shown on step 1 & 2) */}
            {step < 3 && (
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-6 border border-blue-100/50">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-12 h-12 rounded-xl object-cover shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">{provider.name}</h3>
                  <p className="text-blue-600 text-xs font-medium">{provider.service}</p>
                </div>
                <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-gray-800">{provider.rating}</span>
                </div>
              </div>
            )}

            {/* STEP 1: Booking Form */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                {/* Time Slots */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2.5 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className={cn(
                          'py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all duration-200',
                          !slot.available &&
                            'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed',
                          slot.available && selectedSlot !== slot.time &&
                            'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50',
                          selectedSlot === slot.time &&
                            'bg-blue-50 text-blue-700 border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]'
                        )}
                      >
                        {slot.time}
                        {!slot.available && (
                          <span className="block text-[10px] text-gray-300 mt-0.5">Unavailable</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Service Type</label>
                  <input
                    type="text"
                    value={selectedCategory}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 font-medium"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-500" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Enter your address"
                  />
                </div>

                {/* Problem Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Problem Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder="Describe the issue you're facing..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-500" />
                    Upload Image (Optional)
                  </label>
                  <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer relative overflow-hidden">
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="hidden" />
                    {imageFile ? (
                      <div className="text-sm font-semibold text-blue-600">{imageFile.name}</div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-xs text-gray-400 font-medium">Click to upload or drag & drop</p>
                      </>
                    )}
                  </label>
                </div>

                {/* Urgency */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2.5 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Urgency Level
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setUrgency('normal')}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all',
                        urgency === 'normal'
                          ? 'bg-green-50 text-green-700 border-green-400 shadow-[0_0_0_3px_rgba(34,197,94,0.1)]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'
                      )}
                    >
                      🟢 Normal
                    </button>
                    <button
                      onClick={() => setUrgency('urgent')}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-xl text-sm font-semibold border-2 transition-all',
                        urgency === 'urgent'
                          ? 'bg-red-50 text-red-700 border-red-400 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-red-300'
                      )}
                    >
                      🔴 Urgent (+₹100)
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedSlot}
                  className={cn(
                    'w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 mt-2',
                    selectedSlot
                      ? 'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                >
                  Continue to Review →
                </button>
              </motion.div>
            )}

            {/* STEP 2: Price Breakdown + Confirm */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                {/* Summary */}
                <div className="space-y-3 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Time Slot</span>
                    <span className="font-semibold text-gray-800">{selectedSlot}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Address</span>
                    <span className="font-semibold text-gray-800 text-right max-w-[200px] truncate">{address}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Urgency</span>
                    <span className={cn(
                      'font-semibold px-2 py-0.5 rounded-md text-xs',
                      urgency === 'urgent' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    )}>
                      {urgency === 'urgent' ? '🔴 Urgent' : '🟢 Normal'}
                    </span>
                  </div>
                  {description && (
                    <div className="text-sm border-t border-gray-200 pt-3 mt-3">
                      <span className="text-gray-500 block mb-1">Problem</span>
                      <span className="text-gray-700 text-xs">{description}</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100/50">
                  <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-blue-600" />
                    Price Breakdown
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Visiting Charge</span>
                      <span className="font-semibold text-gray-700">₹{visitingCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Service Charge</span>
                      <span className="font-semibold text-gray-700">₹{serviceCharge}</span>
                    </div>
                    {urgencyCharge > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-red-500">Urgency Charge</span>
                        <span className="font-semibold text-red-600">+₹{urgencyCharge}</span>
                      </div>
                    )}
                    <div className="border-t border-blue-200/50 pt-2.5 mt-2.5">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total Amount</span>
                        <span className="font-bold text-xl text-blue-700">₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
                  >
                    ← Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleConfirm}
                    disabled={loading}
                    className="flex-[2] py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Confirming...' : 'Confirm Booking'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Booking Status */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Success Animation */}
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.2 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h3>
                  <p className="text-sm text-gray-400">Booking ID: #LS{Date.now().toString().slice(-6)}</p>
                </div>

                {/* Status Timeline */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-gray-800 mb-4">Booking Status</h4>
                  <div className="space-y-0">
                    {statusSteps.map((s, i) => (
                      <div key={s.label} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm',
                              s.done
                                ? 'bg-green-100 text-green-600 border-2 border-green-400'
                                : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                            )}
                          >
                            {s.icon}
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div
                              className={cn(
                                'w-0.5 h-8',
                                s.done ? 'bg-green-300' : 'bg-gray-200'
                              )}
                            />
                          )}
                        </div>
                        <div className="pt-1">
                          <p
                            className={cn(
                              'text-sm font-semibold',
                              s.done ? 'text-gray-900' : 'text-gray-400'
                            )}
                          >
                            {s.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all hover:from-[#1d4ed8] hover:to-[#2563eb]"
                >
                  Back to Dashboard
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
