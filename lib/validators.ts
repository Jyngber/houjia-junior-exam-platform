import { z } from "zod";

export const questionSchema = z.object({
  type: z.enum(["single", "multiple", "blank", "short"]),
  content: z.string().min(1),
  options: z
    .array(
      z.object({
        id: z.string().min(1),
        label: z.string().min(1),
        content: z.string().min(1)
      })
    )
    .default([]),
  answer: z.union([z.string().min(1), z.array(z.string().min(1)).min(1)]),
  explanation: z.string().default("依題庫原文判斷。"),
  sourceExcerpt: z.string().optional()
});

export const generatedBankSchema = z.object({
  title: z.string().min(1),
  description: z.string().default("由上傳文件解析產生的題庫。"),
  tags: z.array(z.string()).default([]),
  questions: z.array(questionSchema).min(1)
});

export type GeneratedBankInput = z.infer<typeof generatedBankSchema>;
