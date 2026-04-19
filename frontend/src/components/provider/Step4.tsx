import type { FormData } from './MultiStepForm';
import { ArrowRight, ArrowLeft, UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function Step4({ data, update, next, prev }: { data: FormData, update: (u: Partial<FormData>) => void, next: () => void, prev: () => void }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      update({ media: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Media Upload</h2>
        <p className="text-blue-200/60 text-sm">Add photos of your past work to build trust.</p>
      </div>

      <div className="space-y-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image</label>
        
        {!data.media ? (
          <label 
            className="w-full h-48 border-2 border-dashed border-blue-500/30 hover:border-blue-500 bg-blue-500/5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-blue-500/10 group relative"
          >
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-white font-medium">Click to upload image</p>
            <p className="text-slate-400 text-sm mt-1">PNG, JPG or GIF (max. 5MB)</p>
          </label>
        ) : (
          <div className="relative w-full h-48 rounded-2xl overflow-hidden group border border-white/10 shadow-lg">
            <img src={data.media instanceof File ? URL.createObjectURL(data.media) : (typeof data.media === 'string' ? data.media : '')} alt="Cover Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <button onClick={() => update({ media: null })} className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
                Remove Image
              </button>
            </div>
          </div>
        )}

        {/* Mock secondary upload boxes */}
        <div>
           <label className="block text-sm font-medium text-slate-300 mb-2">Additional Photos (Optional)</label>
           <div className="flex gap-4">
             <div className="w-24 h-24 rounded-xl bg-slate-900/50 border border-white/10 flex items-center justify-center cursor-not-allowed text-slate-500">
               <ImageIcon className="w-6 h-6" />
             </div>
             <div className="w-24 h-24 rounded-xl border border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/5 hover:border-white/40 transition-all text-slate-400">
               +
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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all"
        >
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
