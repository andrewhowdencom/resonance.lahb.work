export type BreathingPattern = 'equal' | 'vagal' | 'box' | '478';

export interface BreathingSettings {
  bpm: number;
  pattern: BreathingPattern;
  inhaleRatio: number; // e.g., 0.4 for 40% of cycle
  holdInhaleRatio: number;
  exhaleRatio: number; // e.g., 0.6 for 60% of cycle
  holdExhaleRatio: number;
  showWave: boolean;
  hapticsEnabled: boolean;
  audioEnabled: boolean;
  duration: number; // in seconds
}

export type BreathingPhase = 'inhale' | 'exhale' | 'hold-post-inhale' | 'hold-post-exhale';

export const DEFAULT_SETTINGS: BreathingSettings = {
  bpm: 6, // 10s cycle
  pattern: 'vagal',
  inhaleRatio: 0.4, // 4s
  holdInhaleRatio: 0,
  exhaleRatio: 0.6, // 6s
  holdExhaleRatio: 0,
  showWave: true,
  hapticsEnabled: true,
  audioEnabled: true,
  duration: 120, // 2 minutes (Beginner)
};
