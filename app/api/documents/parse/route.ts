import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { generateQuestionBank, MissingOpenAIKeyError } from "@/lib/ai-question-generator";
import { extractTextFromFile } from "@/lib/document-parser";
import type { Grade, QuestionBank, Subject } from "@/types/quiz";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const grade = formData.get("grade");
    const subject = formData.get("subject");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "請上傳有效檔案。" }, { status: 400 });
    }
    if (typeof grade !== "string" || typeof subject !== "string") {
      return NextResponse.json({ error: "請選擇年級與科目。" }, { status: 400 });
    }

    const text = await extractTextFromFile(file);
    if (text.length < 20) {
      return NextResponse.json({ error: "文件文字不足，無法產生題庫。" }, { status: 422 });
    }

    const generated = await generateQuestionBank({
      text,
      grade: grade as Grade,
      subject: subject as Subject,
      fileName: file.name
    });

    const bankId = randomUUID();
    const bank: QuestionBank = {
      id: bankId,
      documentId: randomUUID(),
      title: generated.title,
      description: generated.description,
      grade: grade as Grade,
      subject: subject as Subject,
      tags: generated.tags,
      createdAt: new Date().toISOString(),
      questions: generated.questions.map((question) => ({
        ...question,
        id: randomUUID(),
        bankId
      }))
    };

    return NextResponse.json({ bank });
  } catch (caught) {
    if (caught instanceof MissingOpenAIKeyError) {
      return NextResponse.json(
        {
          error: caught.message,
          code: "OPENAI_API_KEY_MISSING"
        },
        { status: 503 }
      );
    }

    const message = caught instanceof Error ? caught.message : "解析流程發生未知錯誤。";
    return NextResponse.json({ error: `文件解析失敗：${message}` }, { status: 500 });
  }
}
