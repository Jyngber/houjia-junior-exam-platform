"use client";

import { create } from "zustand";
import type { ParseProgress, QuestionBank, QuizMode } from "@/types/quiz";

interface QuizState {
  activeBank?: QuestionBank;
  mode: QuizMode;
  currentIndex: number;
  answers: Record<string, string | string[]>;
  flagged: Record<string, boolean>;
  parseProgress: ParseProgress;
  setActiveBank: (bank: QuestionBank) => void;
  setMode: (mode: QuizMode) => void;
  answerQuestion: (questionId: string, answer: string | string[]) => void;
  toggleFlag: (questionId: string) => void;
  goNext: () => void;
  goPrevious: () => void;
  setParseProgress: (progress: ParseProgress) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  mode: "practice",
  currentIndex: 0,
  answers: {},
  flagged: {},
  parseProgress: { status: "idle", progress: 0, message: "等待上傳文件" },
  setActiveBank: (bank) => set({ activeBank: bank, currentIndex: 0, answers: {}, flagged: {} }),
  setMode: (mode) => set({ mode }),
  answerQuestion: (questionId, answer) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: answer } })),
  toggleFlag: (questionId) =>
    set((state) => ({ flagged: { ...state.flagged, [questionId]: !state.flagged[questionId] } })),
  goNext: () => {
    const bank = get().activeBank;
    if (!bank) return;
    set((state) => ({ currentIndex: Math.min(state.currentIndex + 1, bank.questions.length - 1) }));
  },
  goPrevious: () => set((state) => ({ currentIndex: Math.max(state.currentIndex - 1, 0) })),
  setParseProgress: (parseProgress) => set({ parseProgress }),
  resetQuiz: () => set({ currentIndex: 0, answers: {}, flagged: {} })
}));
