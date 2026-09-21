import Link from "next/link";
import { ArrowRight, BarChart3, FileText, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoRecords } from "@/lib/mock-data";

export default function HomePage() {
  const latestScore = demoRecords.at(-1)?.score ?? 0;

  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold text-success">Clean Modern Learning</p>
          <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl">
            後甲國中線上測驗系統
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            將 PDF、DOCX 或文字題庫轉為可編輯、可測驗、可統計的線上題庫。教師端負責上傳與成績處理，學生端輸入班級座號即可進入練習。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><Link href="/teacher">建立題庫 <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="outline"><Link href="/student">開始測驗</Link></Button>
          </div>
        </div>
        <Card className="self-start">
          <CardHeader>
            <CardTitle>學習狀態</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-lg bg-primary p-5 text-primary-foreground">
              <div className="text-sm opacity-80">最近一次成績</div>
              <div className="mt-2 text-5xl font-bold">{latestScore}</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric icon={<FileText className="h-5 w-5" />} label="題庫" value="1" />
              <Metric icon={<BarChart3 className="h-5 w-5" />} label="正確率" value="82%" />
              <Metric icon={<ShieldCheck className="h-5 w-5" />} label="錯題" value="14" />
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-primary">{icon}</div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}
