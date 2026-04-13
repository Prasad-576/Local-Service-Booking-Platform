import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import PreviewPanel from './PreviewPanel';

export type FormData = {
  serviceType: string;
  name: string;
  description: string;
  categories: string[];
  visitingCharge: string;
  priceType: 'Fixed' | 'Hourly';
  availability: string[];
  timeSlot: string;
  location: string;
  media: string | null;
  isActive: boolean;
  tags: string[];
};

export default function MultiStepForm({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    name: '',
    description: '',
    categories: [],
    visitingCharge: '',
    priceType: 'Fixed',
    availability: [],
    timeSlot: '',
    location: '',
    media: null,
    isActive: true,
    tags: []
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  const submitForm = () => {
    console.log("Submitting:", formData);
    onComplete();
  };

  const updateForm = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-3/5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors duration-300 ${step >= i ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10 text-slate-400'}`}>
                {i}
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-0 w-full h-[2px] bg-white/10 -z-0"></div>
          <div className="absolute top-4 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-in-out z-0" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
        </div>

        {/* Steps Container */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <Step1 data={formData} update={updateForm} next={nextStep} />}
              {step === 2 && <Step2 data={formData} update={updateForm} next={nextStep} prev={prevStep} />}
              {step === 3 && <Step3 data={formData} update={updateForm} next={nextStep} prev={prevStep} />}
              {step === 4 && <Step4 data={formData} update={updateForm} next={nextStep} prev={prevStep} />}
              {step === 5 && <Step5 submit={submitForm} prev={prevStep} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full lg:w-2/5 sticky top-6">
        <PreviewPanel data={formData} />
      </div>
    </div>
  );
}
