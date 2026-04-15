import { motion } from 'framer-motion';
import { Star, MapPin, Clock, IndianRupee, Wrench, Zap, Heart } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  experience: string;
  distance: string;
  available: boolean;
  visitingCharge: number;
  image: string;
}

interface ProviderCardProps {
  provider: Provider;
  index: number;
  onBookNow: (provider: Provider) => void;
  onQuickBook: (provider: Provider) => void;
}

export default function ProviderCard({ provider, index, onBookNow, onQuickBook }: ProviderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] transition-all duration-400 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-14 h-14 rounded-xl object-cover shadow-md border-2 border-white"
            />
            <div
              className={cn(
                'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
                provider.available ? 'bg-green-500' : 'bg-gray-400'
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 font-bold text-[15px] truncate">{provider.name}</h3>
              <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <p className="text-blue-600 text-xs font-semibold">{provider.service}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-amber-50 rounded-lg px-2.5 py-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-gray-800">{provider.rating}</span>
            <span className="text-[10px] text-gray-400">({provider.reviews})</span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-1.5">
            <Wrench className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold text-gray-700">{provider.experience}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5">
            <MapPin className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs font-semibold text-gray-700">{provider.distance}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-purple-50 rounded-lg px-2.5 py-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span className={cn(
              'text-xs font-semibold',
              provider.available ? 'text-green-600' : 'text-gray-400'
            )}>
              {provider.available ? 'Available' : 'Busy'}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs text-gray-400 font-medium">Visiting Charge</span>
          <div className="flex items-center gap-0.5">
            <IndianRupee className="w-3.5 h-3.5 text-gray-700" />
            <span className="text-lg font-bold text-gray-900">{provider.visitingCharge}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onBookNow(provider)}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transition-all duration-300"
          >
            Book Now
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => onQuickBook(provider)}
            className="flex items-center gap-1.5 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)] transition-all duration-300"
          >
            <Zap className="w-3.5 h-3.5" />
            Quick
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
