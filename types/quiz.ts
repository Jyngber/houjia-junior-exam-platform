export type QuestionType = "single" | "multiple" | "blank" | "short";

export type QuizMode = "practice" | "exam";

export type Grade = "七年級" | "八年級" | "九年級";

export type Subject =
  | "國文"
  | "英文"
  | "數學"
  | "自然"
  | "社會"
  | "藝文"
  | "健體"
  | "綜合";

export interface UserProfile {
  id: string;
  email: string;
  role: "teacher" | "student";
  className?: string;
  seatNumber?: number;
  studentId?: string;
  displayName?: string;
  createdAt: string;
}

export interface DocumentRecord {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  grade: Grade;
  subject: Subject;
  createdAt: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  content: string;
}

export interface Question {
  id: string;
  bankId: string;
  type: QuestionType;
  content: string;
  options: QuestionOption[];
  answer: string | string[];
  explanation: string;
  sourceExcerpt?: string;
}

export interface QuestionBank {
  id: string;
  documentId: string;
  title: string;
  description: string;
  grade: Grade;
  subject: Subject;
  tags: string[];
  questions: Question[];
  createdAt: string;
}

export interface QuizRecord {
  id: string;
  userId: string;
  bankId: string;
  mode: QuizMode;
  score: number;
  totalQuestions: number;
  userAnswers: Record<string, string | string[]>;
  completedAt: string;
}

export interface ParseProgress {
  status: "idle" | "uploading" | "extracting" | "generating" | "saving" | "done" | "error";
  progress: number;
  message: string;
}
