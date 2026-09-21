import type { QuestionBank, QuizRecord } from "@/types/quiz";

export const demoBank: QuestionBank = {
  id: "demo-bank",
  documentId: "demo-doc",
  title: "國中自然重點複習",
  description: "示範題庫，可用於檢查測驗流程與介面狀態。",
  grade: "八年級",
  subject: "自然",
  tags: ["示範", "段考"],
  createdAt: new Date().toISOString(),
  questions: [
    {
      id: "q1",
      bankId: "demo-bank",
      type: "single",
      content: "植物行光合作用時，主要吸收哪一種氣體？",
      options: [
        { id: "A", label: "A", content: "氧氣" },
        { id: "B", label: "B", content: "二氧化碳" },
        { id: "C", label: "C", content: "氮氣" },
        { id: "D", label: "D", content: "氫氣" }
      ],
      answer: "B",
      explanation: "光合作用會吸收二氧化碳並釋放氧氣。"
    },
    {
      id: "q2",
      bankId: "demo-bank",
      type: "multiple",
      content: "下列哪些屬於實驗室安全原則？",
      options: [
        { id: "A", label: "A", content: "配戴護目鏡" },
        { id: "B", label: "B", content: "未經允許混合藥品" },
        { id: "C", label: "C", content: "聽從教師指示" },
        { id: "D", label: "D", content: "在實驗室飲食" }
      ],
      answer: ["A", "C"],
      explanation: "實驗時應穿戴防護用具，並依教師指示操作。"
    }
  ]
};

export const demoRecords: QuizRecord[] = [
  {
    id: "r1",
    userId: "demo-user",
    bankId: "demo-bank",
    mode: "practice",
    score: 78,
    totalQuestions: 100,
    userAnswers: {},
    completedAt: "2026-09-18T10:00:00.000Z"
  },
  {
    id: "r2",
    userId: "demo-user",
    bankId: "demo-bank",
    mode: "exam",
    score: 86,
    totalQuestions: 100,
    userAnswers: {},
    completedAt: "2026-09-20T10:00:00.000Z"
  }
];
