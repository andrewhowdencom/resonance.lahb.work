import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const Help: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-slate-800 flex items-center gap-2">
            <HelpCircle size={20} className="text-emerald-500" />
            About Resonance Breathing
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
          <p>
            <strong>Resonance breathing</strong> (also known as coherent breathing) is a breathing technique where you match your breathing rate to your body's natural resonant frequency.
          </p>
          <p>
            For most adults, this resonant frequency is between <strong>4.5 and 7 breaths per minute</strong>.
          </p>
          <p>
            When you breathe at this rate, your heart rate variability (HRV) maximizes, which helps balance your autonomic nervous system. This state of coherence can help:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Reduce stress and anxiety</li>
            <li>Improve emotional regulation</li>
            <li>Lower blood pressure</li>
            <li>Enhance focus and mental clarity</li>
          </ul>
          <p>
            <strong>How to use this app:</strong>
            <br />
            Simply tap the play button and sync your breathing with the expanding and contracting circle. You can customize the breathing speed, pattern, and practice duration in the settings.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-2xl transition-all active:scale-[0.98]"
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
};
