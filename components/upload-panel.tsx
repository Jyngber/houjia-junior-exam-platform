"use client";

import { useRef, useState } from "react";
import { FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuizStore } from "@/store/quiz-store";
import type { Grade, QuestionBank, Subject } from "@/types/quiz";

const grades: Grade[] = ["七年級", "八年級", "九年級"];
const subjects: Subject[] = ["國文", "英文", "數學", "自然", "社會", "藝文", "健體", "綜合"];

export function UploadPanel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [grade, setGrade] = useState<Grade>("七年級");
  const [subject, setSubject] = useState<Subject>("自然");
  const [error, setError] = useState("");
  const { parseProgress, setParseProgress, setActiveBank } = useQuizStore();

  async function handleFile(file?: File) {
    if (!file) return;
    setError("");
    setParseProgress({ status: "uploading", progress: 15, message: "正在上傳並檢查檔案" });

    const formData = new FormData();
    formData.set("file", file);
    formData.set("grade", grade);
    formData.set("subject", subject);

    try {
      setParseProgress({ status: "extracting", progress: 40, message: "正在抽取文件文字" });
      const response = await fetch("/api/documents/parse", { method: "POST", body: formData });
      const payload = (await response.json()) as { bank?: QuestionBank; error?: string };
      if (!response.ok || !payload.bank) {
        throw new Error(payload.error ?? "解析失敗，請稍後再試。");
      }
      setParseProgress({ status: "done", progress: 100, message: "題庫已建立，可進行預覽與校正" });
      setActiveBank(payload.bank);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "解析失敗，請稍後再試。";
      setError(message);
      setParseProgress({ status: "error", progress: 100, message });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>文件上傳與 AI 解析</CardTitle>
        <CardDescription>支援 PDF、DOCX、TXT、MD，題目會依原始題庫內容結構化。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            年級
            <select className="mt-1 w-full rounded-md border bg-background px-3 py-2" value={grade} onChange={(event) => setGrade(event.target.value as Grade)}>
              {grades.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">
            科目
            <select className="mt-1 w-full rounded-md border bg-background px-3 py-2" value={subject} onChange={(event) => setSubject(event.target.value as Subject)}>
              {subjects.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <button
          className="flex min-h-44 w-full flex-col items-center justify-center rounded-lg border border-dashed border-primary/40 bg-primary/5 p-6 text-center transition hover:bg-primary/10"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            void handleFile(event.dataTransfer.files[0]);
          }}
          type="button"
        >
          <FileUp aria-hidden className="mb-3 h-10 w-10 text-primary" />
          <span className="font-semibold">拖曳文件到這裡，或點選上傳</span>
          <span className="mt-1 text-sm text-slate-500">單次建議 50 頁以內，避免 AI 回應逾時。</span>
        </button>
        <input
          ref={inputRef}
          accept=".pdf,.docx,.txt,.md"
          className="sr-only"
          type="file"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
        <div aria-live="polite" className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{parseProgress.message}</span>
            {parseProgress.status !== "idle" && parseProgress.status !== "error" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          </div>
          <Progress value={parseProgress.progress} />
        </div>
        {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}
        <Button type="button" onClick={() => inputRef.current?.click()}>選擇檔案</Button>
      </CardContent>
    </Card>
  );
}
