"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flag, Send, Space } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { demoBank } from "@/lib/mock-data";
import { toPercent } from "@/lib/utils";
import { useQuizStore } from "@/store/quiz-store";

export function QuizRunner() {
  const store = useQuizStore();
  const bank = store.activeBank ?? demoBank;
  const question = bank.questions[store.currentIndex];
  const [showExplanation, setShowExplanation] = useState(false);
  const answeredCount = Object.keys(store.answers).length;
  const answer = store.answers[question.id];

  const isComplete = useMemo(() => bank.questions.every((item) => store.answers[item.id] !== undefined), [bank.questions, store.answers]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["1", "2", "3", "4"].includes(event.key)) {
        const selected = question.options[Number(event.key) - 1];
        if (selected) store.answerQuestion(question.id, selected.id);
      }
      if (event.key === "Enter") store.goNext();
      if (event.code === "Space") {
        event.preventDefault();
        setShowExplanation((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [question, store]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{bank.title}</CardTitle>
          <div className="text-sm text-slate-500">{answeredCount}/{bank.questions.length} 已作答</div>
        </div>
        <Progress value={toPercent(store.currentIndex + 1, bank.questions.length)} />
      </CardHeader>
      <CardContent className="space-y-5">
        <AnimatePresence mode="wait">
          <motion.section
            key={question.id}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold leading-relaxed">第 {store.currentIndex + 1} 題：{question.content}</h2>
              <Button aria-label="標記此題" size="icon" variant={store.flagged[question.id] ? "success" : "outline"} onClick={() => store.toggleFlag(question.id)}>
                <Flag className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-3">
              {question.options.map((option, index) => {
                const selected = Array.isArray(answer) ? answer.includes(option.id) : answer === option.id;
                return (
                  <button
                    className={`rounded-lg border p-4 text-left transition ${selected ? "border-primary bg-primary/10" : "hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    key={option.id}
                    onClick={() => store.answerQuestion(question.id, option.id)}
                    type="button"
                  >
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold dark:bg-slate-800">{index + 1}</span>
                    {option.label}. {option.content}
                  </button>
                );
              })}
            </div>
            {showExplanation ? (
              <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-sm">
                <strong>解析：</strong>{question.explanation}
              </div>
            ) : null}
          </motion.section>
        </AnimatePresence>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button variant="outline" onClick={store.goPrevious} disabled={store.currentIndex === 0}>上一題</Button>
            <Button onClick={store.goNext} disabled={store.currentIndex === bank.questions.length - 1}>下一題</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setShowExplanation((value) => !value)}><Space className="h-4 w-4" />解析</Button>
            <Button variant="success" disabled={!isComplete}><Send className="h-4 w-4" />交卷</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
