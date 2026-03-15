import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Settings as SettingsIcon, Wind, CheckCircle2 } from 'lucide-react';
import { BreathingWave } from './components/BreathingWave';
import { Settings } from './components/Settings';
import { ServiceWorkerToast } from './components/ServiceWorkerToast';
import { DEFAULT_SETTINGS, BreathingSettings } from './types';

export default function App() {
  const [settings, setSettings] = useState<BreathingSettings>(() => {
    const saved = localStorage.getItem('resonance_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings from local storage', e);
      }
    }
    return DEFAULT_SETTINGS;
  });
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    localStorage.setItem('resonance_settings', JSON.stringify(settings));
  }, [settings]);
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Reset timer when duration setting changes
  useEffect(() => {
    setTimeLeft(settings.duration);
    setIsCompleted(false);
    setIsPaused(true);
  }, [settings.duration]);

  // Countdown timer
  useEffect(() => {
    let interval: number;
    if (!isPaused && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPaused(true);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePause = () => {
    if (isCompleted) {
      setTimeLeft(settings.duration);
      setIsCompleted(false);
    }
    setIsPaused(!isPaused);
  };

  const resetSession = () => {
    setIsPaused(true);
    setTimeLeft(settings.duration);
    setIsCompleted(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Wind size={18} className="text-white" />
          </div>
          <h1 className="text-lg font-medium tracking-tight text-slate-800">Resonance</h1>
        </div>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <SettingsIcon size={20} className="text-slate-400" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full space-y-12">
        {/* Timer */}
        <div className="text-center">
          <div className="text-6xl font-light tracking-tighter text-slate-900">
            {formatTime(timeLeft)}
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium mt-2">
            Time Remaining
          </p>
        </div>

        {/* Breathing Guide or Completion */}
        <div className="relative w-full h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isCompleted ? (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-medium text-slate-800">Session Complete</h2>
                <p className="text-slate-500 font-light">Your vagal tone has been optimized.</p>
              </motion.div>
            ) : (
              <motion.div
                key="wave"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <BreathingWave settings={settings} isPaused={isPaused} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-12">
          <button
            onClick={resetSession}
            className="p-4 text-slate-300 hover:text-slate-600 transition-colors"
            aria-label="Reset"
          >
            <RotateCcw size={24} />
          </button>

          <button
            onClick={togglePause}
            className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200 hover:scale-105 transition-all active:scale-95"
          >
            {isPaused ? <Play size={32} fill="currentColor" className={isCompleted ? "ml-1" : ""} /> : <Pause size={32} fill="currentColor" />}
          </button>

          <div className="w-14" />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">
          {isCompleted ? "Tap play to restart" : (isPaused ? "Tap play to begin" : "Breathe with the circle")}
        </p>
      </footer>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <Settings 
            settings={settings} 
            onUpdate={setSettings} 
            onClose={() => setShowSettings(false)} 
          />
        )}
      </AnimatePresence>

      <ServiceWorkerToast />
    </div>
  );
}
