import type { FormData } from './MultiStepForm';
import { CheckCircle2, ArrowLeft, Tag as TagIcon } from 'lucide-react';

const SUGGESTED_TAGS = ['Emergency', '24/7', 'Fast Service', 'Eco-friendly', 'Certified', 'Insured'];

export default function Step5({ submit, prev }: { submit: () => void, prev: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Review & Publish</h2>
          <p className="text-blue-200/60 text-sm">Almost done! Review your service before going live.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-white/10">
          <span className="text-sm font-medium text-slate-300">Active</span>
          {/* Note: In a real implementation we'd toggle data.isActive, keeping ui static for display */}
          <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-emerald-100 font-medium">Ready to publish!</h4>
          <p className="text-emerald-200/60 text-sm mt-1">Your service profile looks great. Click publish to start accepting bookings.</p>
        </div>
      </div>

      <div>
         <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
           <TagIcon className="w-4 h-4" /> Marketing Tags
         </label>
         <div className="flex flex-wrap gap-2">
            {SUGGESTED_TAGS.map(tag => (
              <div
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-600/20 border-blue-500/50 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              >
                {tag}
              </div>
            ))}
         </div>
         <p className="text-xs text-slate-500 mt-2">Tags help your service rank higher in searches.</p>
      </div>

      <div className="flex justify-between pt-8">
        <button 
          onClick={prev}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button 
          onClick={submit}
          className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.5)] overflow-hidden"
        >
          Publish Service
          <span className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[-20deg] -translate-x-[150%] animate-[shine_2s_infinite]"></span>
        </button>
      </div>
    </div>
  );
}
