import type { FormData } from './MultiStepForm';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Step3({ data, update, next, prev }: { data: FormData, update: (u: Partial<FormData>) => void, next: () => void, prev: () => void }) {
  const toggleDay = (day: string) => {
    if (data.availability.includes(day)) {
      update({ availability: data.availability.filter(d => d !== day) });
    } else {
      update({ availability: [...data.availability, day] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Availability & Location</h2>
        <p className="text-blue-200/60 text-sm">When and where can you provide this service?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Available Days</label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-200 border ${
                  data.availability.includes(day) 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-slate-900/50 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Time Slots</label>
          <select 
            value={data.timeSlot}
            onChange={(e) => update({ timeSlot: e.target.value })}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
          >
            <option value="" disabled>Select typical availability...</option>
            <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
            <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
            <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
            <option value="Flexible (Anytime)">Flexible (Anytime)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Service Area / City</label>
          <input 
            type="text" 
            value={data.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="e.g. San Francisco Bay Area"
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
          />
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
          disabled={data.availability.length === 0 || !data.timeSlot || !data.location}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-xl transition-all"
        >
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
