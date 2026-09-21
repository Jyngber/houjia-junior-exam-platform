import { NextResponse } from "next/server";
import { z } from "zod";

const submitSchema = z.object({
  userId: z.string().min(1),
  bankId: z.string().min(1),
  mode: z.enum(["practice", "exam"]),
  answers: z.record(z.union([z.string(), z.array(z.string())]))
});

export async function POST(request: Request) {
  const parsed = submitSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "交卷資料格式不正確。" }, { status: 400 });
  }

  return NextResponse.json({
    recordId: crypto.randomUUID(),
    completedAt: new Date().toISOString(),
    message: "測驗紀錄已接收，正式版會寫入 Supabase QuizRecords。"
  });
}
