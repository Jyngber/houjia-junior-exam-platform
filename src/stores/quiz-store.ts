import {create} from "zustand";
export type QuizAnswer=string|string[]|null;
type QuizState={answers:Record<string,QuizAnswer>;flagged:Record<string,boolean>;setAnswer:(id:string,a:QuizAnswer)=>void;toggleFlag:(id:string)=>void;reset:()=>void};
export const useQuizStore=create<QuizState>((set)=>({answers:{},flagged:{},setAnswer:(id,a)=>set(s=>({answers:{...s.answers,[id]:a}})),toggleFlag:(id)=>set(s=>({flagged:{...s.flagged,[id]:!s.flagged[id]}})),reset:()=>set({answers:{},flagged:{}})}));