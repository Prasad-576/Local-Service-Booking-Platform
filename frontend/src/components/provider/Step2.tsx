import type { FormData } from './MultiStepForm';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const SUGGESTED_CATEGORIES = {
  'Electrician': ['Wiring', 'Lighting', 'Panel Upgrade', 'Smart Home', 'Troubleshooting'],
  'Plumber': ['Leak Repair', 'Pipe Installation', 'Water Heater', 'Drain Cleaning'],
  'Cleaning': ['Deep Cleaning', 'Move in/out', 'Post-Construction', 'Standard']
};

export default function Step2({ data, update, next, prev }: { data: FormData, update: (u: Partial<FormData>) => void, next: () => void, prev: () => void }) {
  const suggestions = SUGGESTED_CATEGORIES[data.serviceType as keyof typeof SUGGESTED_CATEGORIES] || ['General', 'Consultation', 'Emergency'];

  const toggleCategory = (cat: string) => {
    if (data.categories.includes(cat)) {
      update({ categories: data.categories.filter(c => c !== cat) });
    } else {
      update({ categories: [...data.categories, cat] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Service Details</h2>
        <p className="text-blue-200/60 text-sm">Define what is included and how you charge.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Categories (Select multiple)</label>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  data.categories.includes(cat) 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
            <button className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-dashed border-white/30 text-slate-300 hover:border-white/60 transition-colors">
              + Add Custom
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Base/Visiting Charge ($)</label>
            <input 
              type="number" 
              value={data.visitingCharge}
              onChange={(e) => update({ visitingCharge: e.target.value })}
              placeholder="e.g. 50"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Pricing Type</label>
            <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10">
              <button 
                onClick={() => update({ priceType: 'Fixed' })}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${data.priceType === 'Fixed' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Fixed
              </button>
              <button 
                onClick={() => update({ priceType: 'Hourly' })}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${data.priceType === 'Hourly' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Hourly
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          onClick={prev}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={next}
          disabled={!data.visitingCharge || data.categories.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-xl transition-all"
        >
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
