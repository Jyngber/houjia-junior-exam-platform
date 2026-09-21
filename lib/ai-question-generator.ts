import OpenAI from "openai";
import { generatedBankSchema, type GeneratedBankInput } from "@/lib/validators";
import type { Grade, Subject } from "@/types/quiz";

const systemPrompt = [
  "你是臺灣國中題庫結構化助理。",
  "請完全依照使用者提供的題庫原文出題，不得新增原文沒有的知識點，不得改寫正確答案的語意。",
  "若原文已有選項，必須保留選項內容與正確答案；若題型是填空或簡答，答案需可由原文直接找到。",
  "請輸出嚴格 JSON，不要 Markdown。"
].join("\n");

export async function generateQuestionBank(params: {
  text: string;
  grade: Grade;
  subject: Subject;
  fileName: string;
}): Promise<GeneratedBankInput> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new MissingOpenAIKeyError();
  }

  const client = new OpenAI({ apiKey });

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_QUIZ_MODEL ?? "gpt-4o-mini",
    temperature: 0.1,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: JSON.stringify({
          task: "將文件內容轉為線上測驗題庫",
          grade: params.grade,
          subject: params.subject,
          fileName: params.fileName,
          outputShape: {
            title: "string",
            description: "string",
            tags: ["string"],
            questions: [
              {
                type: "single | multiple | blank | short",
                content: "string",
                options: [{ id: "A", label: "A", content: "string" }],
                answer: "string or string[]",
                explanation: "string",
                sourceExcerpt: "string"
              }
            ]
          },
          sourceText: params.text.slice(0, 55000)
        })
      }
    ]
  });

  const raw = completion.choices[0]?.message.content;
  if (!raw) {
    throw new Error("AI 未回傳題庫內容。");
  }

  return generatedBankSchema.parse(JSON.parse(raw));
}

export class MissingOpenAIKeyError extends Error {
  constructor() {
    super("尚未設定 OpenAI API 金鑰。請在 .env.local 加入 OPENAI_API_KEY 後重新啟動開發伺服器。");
    this.name = "MissingOpenAIKeyError";
  }
}
