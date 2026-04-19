import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Droplets,
  Sparkles,
  Wind,
  Paintbrush,
  Hammer,
  MapPin,
  Star,
  IndianRupee,
  SlidersHorizontal,
  Navigation,
  CheckCircle2,
  SearchX,
  LocateFixed,
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import ProviderCard from '../components/ProviderCard';
import BookingFlowModal from '../components/BookingFlowModal';

export interface Provider {
  id: string | number;
  providerId?: string;
  name: string;
  service: string;
  title?: string;
  rating: number;
  reviews: number;
  experience: string;
  distance: string;
  available: boolean;
  visitingCharge: number;
  image: string;
}

const categories = [
  { name: 'Electrician', icon: Zap, color: 'from-amber-400 to-orange-500' },
  { name: 'Plumbing', icon: Droplets, color: 'from-blue-400 to-cyan-500' },
  { name: 'Cleaning', icon: Sparkles, color: 'from-green-400 to-emerald-500' },
  { name: 'AC Repair', icon: Wind, color: 'from-purple-400 to-indigo-500' },
  { name: 'Painting', icon: Paintbrush, color: 'from-pink-400 to-rose-500' },
  { name: 'Carpentry', icon: Hammer, color: 'from-orange-400 to-red-500' },
];


export default function BookServiceView() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [ratingFilter, setRatingFilter] = useState(false);
  const [priceRange, setPriceRange] = useState(500);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [availableNow, setAvailableNow] = useState(false);
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);
  const [quickBookSuccess, setQuickBookSuccess] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((d: any) => ({
          id: d._id,
          providerId: d.providerId?._id,
          name: d.providerId?.name || 'Local Provider',
          service: d.category,
          title: d.title,
          rating: 4.8,
          reviews: Math.floor(Math.random() * 100) + 10,
          experience: '5 yrs',
          distance: '2.1 km',
          available: true,
          visitingCharge: d.price,
          image: d.images?.[0] ? `http://localhost:5000${d.images[0]}` : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150'
        }));
        setProviders(mapped);
      })
      .catch(console.error);
  }, []);

  // Filter providers
  const filteredProviders = providers.filter((p) => {
    if (selectedCategory && p.service !== selectedCategory) return false;
    if (ratingFilter && p.rating < 4) return false;
    if (p.visitingCharge > priceRange) return false;
    if (nearbyOnly && parseFloat(p.distance) > 3) return false;
    if (availableNow && !p.available) return false;
    return true;
  });

  const handleQuickBook = (provider: Provider) => {
    setQuickBookSuccess(true);
    setTimeout(() => setQuickBookSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Quick Book Success Toast */}
      <AnimatePresence>
        {quickBookSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-3 bg-green-500 text-white px-5 py-3.5 rounded-xl shadow-[0_8px_30px_rgba(34,197,94,0.4)]"
          >
            <CheckCircle2 className="w-5 h-5" />
            <div>
              <p className="font-bold text-sm">Quick Booking Confirmed!</p>
              <p className="text-green-100 text-xs">Default time slot auto-selected</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Book a Service</h1>
        <p className="text-gray-400 text-sm mt-1">Find and book trusted service providers near you</p>
      </div>

      {/* Category Grid */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">Select Category</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <motion.button
                key={cat.name}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(isActive ? '' : cat.name)}
                className={cn(
                  'flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-300 group',
                  isActive
                    ? 'border-blue-500 bg-blue-50 shadow-[0_0_0_3px_rgba(59,130,246,0.1)]'
                    : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50/50 shadow-sm hover:shadow-md'
                )}
              >
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md transition-transform group-hover:scale-110',
                    cat.color
                  )}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={cn(
                    'text-xs font-semibold transition-colors',
                    isActive ? 'text-blue-700' : 'text-gray-600'
                  )}
                >
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Location Selector */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all"
        >
          <LocateFixed className="w-4 h-4" />
          Detect Location
        </motion.button>
      </div>

      {/* Smart Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-semibold text-gray-700">Smart Filters</h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Rating Filter */}
          <button
            onClick={() => setRatingFilter(!ratingFilter)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all',
              ratingFilter
                ? 'bg-amber-50 text-amber-700 border-amber-400'
                : 'bg-white text-gray-500 border-gray-200 hover:border-amber-300'
            )}
          >
            <Star className="w-3.5 h-3.5" />
            Rating 4+
          </button>

          {/* Nearby Filter */}
          <button
            onClick={() => setNearbyOnly(!nearbyOnly)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all',
              nearbyOnly
                ? 'bg-green-50 text-green-700 border-green-400'
                : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'
            )}
          >
            <Navigation className="w-3.5 h-3.5" />
            Nearby (&lt;3 km)
          </button>

          {/* Available Now Filter */}
          <button
            onClick={() => setAvailableNow(!availableNow)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all',
              availableNow
                ? 'bg-blue-50 text-blue-700 border-blue-400'
                : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
            )}
          >
            <Zap className="w-3.5 h-3.5" />
            Available Now
          </button>

          {/* Price Range */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-200 bg-white">
            <IndianRupee className="w-3.5 h-3.5 text-gray-400" />
            <input
              type="range"
              min="100"
              max="500"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-24 h-1.5 accent-blue-500 cursor-pointer"
            />
            <span className="text-xs font-semibold text-gray-600">₹{priceRange}</span>
          </div>
        </div>
      </div>

      {/* Provider Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            {filteredProviders.length} Provider{filteredProviders.length !== 1 ? 's' : ''} Found
          </h3>
          {selectedCategory && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {selectedCategory}
            </span>
          )}
        </div>

        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProviders.map((provider, index) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                index={index}
                onBookNow={(p) => setBookingProvider(p)}
                onQuickBook={handleQuickBook}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm"
          >
            <SearchX className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-2">No providers found nearby</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
              Try adjusting your filters, changing your location, or expanding your search radius.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setRatingFilter(false);
                  setNearbyOnly(false);
                  setAvailableNow(false);
                  setPriceRange(500);
                }}
                className="px-5 py-2.5 text-sm font-semibold bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
              >
                Clear Filters
              </button>
              <button className="px-5 py-2.5 text-sm font-semibold bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                Expand Search
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Flow Modal */}
      <AnimatePresence>
        {bookingProvider && (
          <BookingFlowModal
            provider={bookingProvider}
            selectedCategory={selectedCategory || bookingProvider.service}
            location={location || 'Mumbai, Maharashtra'}
            onClose={() => setBookingProvider(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
