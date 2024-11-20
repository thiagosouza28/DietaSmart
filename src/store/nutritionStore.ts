import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, format, parseISO } from 'date-fns';

interface WeightEntry {
  date: string;
  weight: number;
}

interface MealLog {
  date: string;
  completed: boolean;
  notes?: string;
}

interface NutritionState {
  startDate: string | null;
  endDate: string | null;
  targetWeight: number | null;
  weightEntries: WeightEntry[];
  mealLogs: MealLog[];
  setDates: (start: string, end: string) => void;
  setTargetWeight: (weight: number) => void;
  addWeightEntry: (weight: number) => void;
  logMeal: (date: string, completed: boolean, notes?: string) => void;
  getProgress: () => number;
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      startDate: null,
      endDate: null,
      targetWeight: null,
      weightEntries: [],
      mealLogs: [],

      setDates: (start, end) => set({ startDate: start, endDate: end }),
      
      setTargetWeight: (weight) => set({ targetWeight: weight }),
      
      addWeightEntry: (weight) => set((state) => ({
        weightEntries: [
          ...state.weightEntries,
          { date: format(new Date(), 'yyyy-MM-dd'), weight }
        ]
      })),
      
      logMeal: (date, completed, notes) => set((state) => ({
        mealLogs: [
          ...state.mealLogs,
          { date, completed, notes }
        ]
      })),
      
      getProgress: () => {
        const state = get();
        if (!state.startDate || !state.endDate || !state.targetWeight || state.weightEntries.length === 0) {
          return 0;
        }
        
        const initialWeight = state.weightEntries[0].weight;
        const currentWeight = state.weightEntries[state.weightEntries.length - 1].weight;
        const totalWeightToLose = Math.abs(initialWeight - state.targetWeight);
        const weightLost = Math.abs(initialWeight - currentWeight);
        
        return (weightLost / totalWeightToLose) * 100;
      }
    }),
    {
      name: 'nutrition-storage'
    }
  )
);