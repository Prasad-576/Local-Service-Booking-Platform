import type { FormData } from './MultiStepForm';
import { ArrowRight } from 'lucide-react';

export default function Step1({ data, update, next }: { data: FormData, update: (u: Partial<FormData>) => void, next: () => void }) {
  const serviceTypes = ['Electrician', 'Plumber', 'Cleaning', 'IT Support', 'Carpenter', 'Custom'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Basic Info</h2>
        <p className="text-blue-200/60 text-sm">Let's start with the standard details of your new service.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Service Type</label>
          <select 
            value={data.serviceType}
            onChange={(e) => update({ serviceType: e.target.value })}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="" disabled>Select a type...</option>
            {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {data.serviceType === 'Custom' && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Custom Service Name</label>
            <input 
              type="text" 
              value={data.customService}
              onChange={(e) => update({ customService: e.target.value })}
              placeholder="e.g. Pet Grooming"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Service Name</label>
          <input 
            type="text" 
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="e.g. Smart Thermostat Installation"
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
          <textarea 
            value={data.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Describe what customers get..."
            rows={4}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          onClick={next}
          disabled={!data.name || !data.serviceType || !data.description || (data.serviceType === 'Custom' && !data.customService)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all"
        >
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
