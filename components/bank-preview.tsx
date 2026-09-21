"use client";

import { CheckCircle2, PencilLine, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";
import { demoBank } from "@/lib/mock-data";

export function BankPreview() {
  const bank = useQuizStore((state) => state.activeBank) ?? demoBank;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{bank.title}</CardTitle>
        <CardDescription>{bank.grade} · {bank.subject} · {bank.questions.length} 題</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {bank.tags.map((tag) => <span className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-800" key={tag}>{tag}</span>)}
        </div>
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" aria-hidden />
          <input className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm" placeholder="搜尋題目、選項或解析" />
        </label>
        <div className="space-y-3">
          {bank.questions.map((question, index) => (
            <article className="rounded-lg border p-4" key={question.id}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">第 {index + 1} 題：{question.content}</h3>
                <Button aria-label="編輯題目" size="icon" variant="ghost"><PencilLine className="h-4 w-4" /></Button>
              </div>
              {question.options.length > 0 ? (
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <li className="rounded-md bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800" key={option.id}>
                      {option.label}. {option.content}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-3 flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                答案：{Array.isArray(question.answer) ? question.answer.join("、") : question.answer}
              </p>
            </article>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
