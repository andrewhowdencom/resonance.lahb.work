import React from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, X, Volume2, VolumeX, Smartphone, SmartphoneNfc } from 'lucide-react';
import { BreathingSettings } from '../types';

interface Props {
  settings: BreathingSettings;
  onUpdate: (settings: BreathingSettings) => void;
  onClose: () => void;
}

export const Settings: React.FC<Props> = ({ settings, onUpdate, onClose }) => {
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
            <SettingsIcon size={20} className="text-emerald-500" />
            Preferences
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Practice Level (Duration) */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Practice Level</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdate({ ...settings, duration: 120 })}
                className={`py-3 rounded-2xl border text-xs transition-all ${
                  settings.duration === 120 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                Beginner
                <span className="block text-[10px] opacity-70 mt-0.5">2 min</span>
              </button>
              <button
                onClick={() => onUpdate({ ...settings, duration: 300 })}
                className={`py-3 rounded-2xl border text-xs transition-all ${
                  settings.duration === 300 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                Intermediate
                <span className="block text-[10px] opacity-70 mt-0.5">5 min</span>
              </button>
              <button
                onClick={() => onUpdate({ ...settings, duration: 900 })}
                className={`py-3 rounded-2xl border text-xs transition-all ${
                  settings.duration === 900 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                Expert
                <span className="block text-[10px] opacity-70 mt-0.5">15 min</span>
              </button>
            </div>
          </div>

          {/* BPM Slider (Moved from main screen to reduce cognitive load) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
              <span>Breathing Speed</span>
              <span className="text-emerald-600 tabular-nums">{settings.bpm} BPM</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="0.25"
              value={settings.bpm}
              onChange={(e) => onUpdate({ ...settings, bpm: parseFloat(e.target.value) })}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[10px] text-slate-400 italic">
              Adjust speed to match your comfort level.
            </p>
          </div>

          {/* Pattern Selection */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Breathing Pattern</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onUpdate({ ...settings, pattern: 'equal', inhaleRatio: 0.5, holdInhaleRatio: 0, exhaleRatio: 0.5, holdExhaleRatio: 0, bpm: 6 })}
                className={`py-4 rounded-2xl border text-sm transition-all flex flex-col items-center justify-center gap-1 ${
                  settings.pattern === 'equal' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                <span>Equal</span>
                <span className="text-[10px] opacity-70 font-normal">1:1</span>
              </button>
              <button
                onClick={() => onUpdate({ ...settings, pattern: 'vagal', inhaleRatio: 0.4, holdInhaleRatio: 0, exhaleRatio: 0.6, holdExhaleRatio: 0, bpm: 6 })}
                className={`py-4 rounded-2xl border text-sm transition-all flex flex-col items-center justify-center gap-1 ${
                  settings.pattern === 'vagal' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                <span>Vagal Tone</span>
                <span className="text-[10px] opacity-70 font-normal">1:1.5</span>
              </button>
              <button
                onClick={() => onUpdate({ ...settings, pattern: 'box', inhaleRatio: 0.25, holdInhaleRatio: 0.25, exhaleRatio: 0.25, holdExhaleRatio: 0.25, bpm: 3.75 })}
                className={`py-4 rounded-2xl border text-sm transition-all flex flex-col items-center justify-center gap-1 ${
                  settings.pattern === 'box' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                <span>Box Breathing</span>
                <span className="text-[10px] opacity-70 font-normal">4-4-4-4</span>
              </button>
              <button
                onClick={() => onUpdate({ ...settings, pattern: '478', inhaleRatio: 4/19, holdInhaleRatio: 7/19, exhaleRatio: 8/19, holdExhaleRatio: 0, bpm: 3.15 })}
                className={`py-4 rounded-2xl border text-sm transition-all flex flex-col items-center justify-center gap-1 ${
                  settings.pattern === '478' 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                    : 'bg-white border-slate-100 text-slate-500'
                }`}
              >
                <span>Relaxing</span>
                <span className="text-[10px] opacity-70 font-normal">4-7-8</span>
              </button>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <button
              onClick={() => onUpdate({ ...settings, audioEnabled: !settings.audioEnabled })}
              className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl transition-colors active:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                {settings.audioEnabled ? <Volume2 size={18} className="text-emerald-500" /> : <VolumeX size={18} className="text-slate-400" />}
                <span className="text-sm text-slate-700">Audio Cues</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors relative ${settings.audioEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${settings.audioEnabled ? 'translate-x-5' : ''}`} />
              </div>
            </button>

            <button
              onClick={() => onUpdate({ ...settings, hapticsEnabled: !settings.hapticsEnabled })}
              className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl transition-colors active:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                {settings.hapticsEnabled ? <SmartphoneNfc size={18} className="text-emerald-500" /> : <Smartphone size={18} className="text-slate-400" />}
                <span className="text-sm text-slate-700">Haptic Pulses</span>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors relative ${settings.hapticsEnabled ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${settings.hapticsEnabled ? 'translate-x-5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-2xl transition-all active:scale-[0.98]"
        >
          Save Changes
        </button>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-400">Version {__APP_VERSION__}</p>
        </div>
      </motion.div>
    </div>
  );
};

