import { motion } from 'framer-motion';
import type { FormData } from './MultiStepForm';
import { Star, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function PreviewPanel({ data }: { data: FormData }) {
  const displayMedia = data.media || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop';
  
  return (
    <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-sm font-semibold text-slate-300 uppercase tracking-widest text-xs">Live Preview</span>
      </div>

      <motion.div 
        layout
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md group"
      >
        {/* Cover Image */}
        <div className="h-48 w-full relative overflow-hidden bg-slate-800">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            src={displayMedia} 
            alt="Service Preview" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-lg">
                {data.serviceType || 'Service Type'}
              </span>
              <h3 className="text-xl font-bold text-white mt-2 leading-tight">
                {data.name || 'Your Service Name'}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-white">New</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Starting from</span>
              <p className="text-lg font-bold text-blue-400 leading-tight">
                ${data.visitingCharge || '0'} <span className="text-xs font-normal text-slate-400">/{data.priceType === 'Hourly' ? 'hr' : 'fixed'}</span>
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
            {data.description || 'Provide a detailed description of your service to attract more customers...'}
          </p>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5 mt-4">
            {data.categories.length > 0 ? (
              data.categories.map(cat => (
                <span key={cat} className="text-[11px] font-medium bg-white/5 text-slate-300 px-2 py-1 rounded-md border border-white/10">
                  {cat}
                </span>
              ))
            ) : (
              <span className="text-[11px] font-medium bg-white/5 text-slate-500 px-2 py-1 rounded-md border border-dashed border-white/10">
                Categories appear here
              </span>
            )}
          </div>

          <div className="pt-4 flex flex-col gap-2">
             <div className="flex items-center gap-2 text-xs text-slate-400">
               <MapPin className="w-3.5 h-3.5 text-blue-400" />
               {data.location || 'Anywhere'}
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-400">
               <Clock className="w-3.5 h-3.5 text-amber-400" />
               {data.timeSlot || 'Flexible'}
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-400">
               <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
               Verified Provider
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
