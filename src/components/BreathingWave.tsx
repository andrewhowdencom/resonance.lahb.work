import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BreathingSettings } from '../types';

interface Props {
  settings: BreathingSettings;
  isPaused: boolean;
}

export const BreathingWave: React.FC<Props> = ({ settings, isPaused }) => {
  const [phase, setPhase] = useState<'inhale' | 'exhale' | 'hold-post-inhale' | 'hold-post-exhale'>('inhale');
  const [progress, setProgress] = useState(0);
  const requestRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);

  const cycleDuration = (60 / settings.bpm) * 1000; // ms
  const inhaleDuration = cycleDuration * settings.inhaleRatio;
  const holdInDuration = cycleDuration * settings.holdInhaleRatio;
  const exhaleDuration = cycleDuration * settings.exhaleRatio;
  const holdOutDuration = cycleDuration * settings.holdExhaleRatio;

  useEffect(() => {
    if (isPaused) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = (time - startTimeRef.current) % cycleDuration;
      
      if (elapsed < inhaleDuration) {
        setPhase('inhale');
        setProgress(elapsed / inhaleDuration);
      } else if (elapsed < inhaleDuration + holdInDuration) {
        setPhase('hold-post-inhale');
        setProgress((elapsed - inhaleDuration) / holdInDuration);
      } else if (elapsed < inhaleDuration + holdInDuration + exhaleDuration) {
        setPhase('exhale');
        setProgress((elapsed - inhaleDuration - holdInDuration) / exhaleDuration);
      } else {
        setPhase('hold-post-exhale');
        setProgress((elapsed - inhaleDuration - holdInDuration - exhaleDuration) / holdOutDuration);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused, cycleDuration, inhaleDuration, holdInDuration, exhaleDuration, holdOutDuration, settings.bpm]);

  // Haptic feedback on phase change and progress nudges
  const prevQuarterRef = useRef<number>(0);
  const prevPhaseRef = useRef<string | null>(null);

  useEffect(() => {
    if (settings.hapticsEnabled && !isPaused && 'vibrate' in navigator) {
      const currentQuarter = Math.floor(progress * 4);

      if (phase !== prevPhaseRef.current) {
        let pattern: number | number[] = 50;
        switch (phase) {
          case 'inhale':
            pattern = [50, 50, 50]; // Energetic triple pulse
            break;
          case 'exhale':
            pattern = 200; // Long, smooth, calming pulse
            break;
          case 'hold-post-inhale':
          case 'hold-post-exhale':
            pattern = [30, 60, 30]; // Sharp double tap
            break;
        }
        navigator.vibrate(pattern);
        prevPhaseRef.current = phase;
        prevQuarterRef.current = 0;
      } else if (currentQuarter > prevQuarterRef.current && currentQuarter < 4) {
        navigator.vibrate(15); // Small nudge
        prevQuarterRef.current = currentQuarter;
      } else if (currentQuarter < prevQuarterRef.current) {
        prevQuarterRef.current = currentQuarter;
      }
    }
  }, [phase, progress, settings.hapticsEnabled, isPaused]);

  return (
    <div className="relative w-full h-80 flex flex-col items-center justify-center overflow-hidden">
      {/* Sine Wave Background */}
      <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 0 50 Q 25 0 50 50 T 100 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-emerald-600"
        />
      </svg>

      {/* Main Breathing Circle */}
      <motion.div
        animate={{
          scale: phase === 'inhale' ? 1 + progress * 0.4 : 
                 phase === 'hold-post-inhale' ? 1.4 :
                 phase === 'exhale' ? 1.4 - progress * 0.4 : 1,
          backgroundColor: phase === 'inhale' || phase === 'hold-post-inhale' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.1)',
        }}
        transition={{ duration: 0.1, ease: "linear" }}
        className="w-56 h-56 rounded-full border border-emerald-200/50 flex items-center justify-center shadow-inner"
      >
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-3xl font-light tracking-[0.2em] uppercase text-emerald-800/80"
            >
              {phase.includes('hold') ? 'hold' : phase}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 w-full h-1 bg-slate-100">
        <motion.div
          className="h-full bg-emerald-400"
          animate={{
            width: `${((
              phase === 'inhale' ? progress * inhaleDuration : 
              phase === 'hold-post-inhale' ? inhaleDuration + progress * holdInDuration :
              phase === 'exhale' ? inhaleDuration + holdInDuration + progress * exhaleDuration :
              inhaleDuration + holdInDuration + exhaleDuration + progress * holdOutDuration
            ) / cycleDuration) * 100}%`
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </div>
  );
};
