import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Wrench, IndianRupee } from 'lucide-react';

const savedProviders = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    service: 'Electrician',
    rating: 4.8,
    reviews: 127,
    distance: '2.1 km',
    visitingCharge: 149,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150',
  },
  {
    id: 2,
    name: 'Priya Patel',
    service: 'Cleaning',
    rating: 4.9,
    reviews: 215,
    distance: '1.3 km',
    visitingCharge: 199,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150',
  },
  {
    id: 3,
    name: 'Meena Iyer',
    service: 'Painting',
    rating: 4.7,
    reviews: 156,
    distance: '2.8 km',
    visitingCharge: 179,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=150&h=150',
  },
];

export default function SavedProvidersView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Saved Providers</h1>
        <p className="text-gray-400 text-sm mt-1">Your favorite service providers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {savedProviders.map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-14 h-14 rounded-xl object-cover shadow-md border-2 border-white"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-sm">{provider.name}</h3>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                    <Heart className="w-4 h-4 fill-red-400" />
                  </button>
                </div>
                <p className="text-blue-600 text-xs font-semibold">{provider.service}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-amber-50 rounded-lg px-2.5 py-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-gray-800">{provider.rating}</span>
                <span className="text-[10px] text-gray-400">({provider.reviews})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 rounded-lg px-2.5 py-1.5">
                <MapPin className="w-3.5 h-3.5 text-green-500" />
                <span className="text-xs font-semibold text-gray-700">{provider.distance}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-gray-500" />
                <span className="font-bold text-gray-900">₹{provider.visitingCharge}</span>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] hover:from-[#1d4ed8] hover:to-[#2563eb] text-white text-xs font-semibold rounded-xl shadow-md transition-all">
                <Wrench className="w-3.5 h-3.5" />
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
