"use client";
import { create } from "zustand";
import type { Industry } from "./content";

export interface LearnerProfile {
  name: string;
  industry: Industry;
  role: string;          // job title / position
  level: "beginner" | "intermediate" | "advanced";
  goalEs: string;        // why they're learning — in Spanish
  goalEn: string;        // why they're learning — in English
  onboarded: boolean;
}

export interface QuizResult {
  industry: Industry;
  score: number;       // correct answers
  total: number;       // total questions
  pct: number;         // 0-100
  passed: boolean;     // pct >= 70
  completedAt: string; // ISO date string
}

interface AppState {
  lang: "en" | "es";
  profile: LearnerProfile | null;
  selectedIndustry: Industry | null;
  completedDialogs: string[];
  completedScenarios: string[];
  completedReadings: string[];
  quizResults: Record<string, QuizResult>; // keyed by industry
  practiceStreak: number;
  totalXP: number;
  toggleLang: () => void;
  setProfile: (profile: LearnerProfile) => void;
  clearProfile: () => void;
  setIndustry: (industry: Industry | null) => void;
  completeDialog: (id: string) => void;
  completeScenario: (id: string) => void;
  completeReading: (id: string) => void;
  saveQuizResult: (result: QuizResult) => void;
}

export const useAppStore = create<AppState>((set) => ({
  lang: "es",
  profile: null,
  selectedIndustry: null,
  completedDialogs: [],
  completedScenarios: [],
  completedReadings: [],
  quizResults: {},
  practiceStreak: 3,
  totalXP: 120,
  toggleLang: () =>
    set((s) => ({ lang: s.lang === "en" ? "es" : "en" })),
  setProfile: (profile) => set({ profile, selectedIndustry: profile.industry }),
  clearProfile: () => set({ profile: null }),
  setIndustry: (industry) => set({ selectedIndustry: industry }),
  completeDialog: (id) =>
    set((s) => ({
      completedDialogs: s.completedDialogs.includes(id)
        ? s.completedDialogs
        : [...s.completedDialogs, id],
      totalXP: s.completedDialogs.includes(id) ? s.totalXP : s.totalXP + 20,
    })),
  completeScenario: (id) =>
    set((s) => ({
      completedScenarios: s.completedScenarios.includes(id)
        ? s.completedScenarios
        : [...s.completedScenarios, id],
      totalXP: s.completedScenarios.includes(id) ? s.totalXP : s.totalXP + 30,
    })),
  completeReading: (id) =>
    set((s) => ({
      completedReadings: s.completedReadings.includes(id)
        ? s.completedReadings
        : [...s.completedReadings, id],
      totalXP: s.completedReadings.includes(id) ? s.totalXP : s.totalXP + 15,
    })),
  saveQuizResult: (result) =>
    set((s) => {
      const prev = s.quizResults[result.industry];
      const isNew = !prev;
      const isBetter = prev && result.score > prev.score;
      return {
        quizResults: { ...s.quizResults, [result.industry]: result },
        totalXP: isNew
          ? s.totalXP + (result.passed ? 50 : 20)
          : isBetter
          ? s.totalXP + 10
          : s.totalXP,
      };
    }),
}));
