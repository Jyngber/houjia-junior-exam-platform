import Link from "next/link";
import { ArrowRight, IdCard } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-3xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>學生端登入</CardTitle>
            <CardDescription>輸入班級與座號後，可串接 Google Sheet 帶入學號與姓名。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">
                班級
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2" placeholder="例如：803" />
              </label>
              <label className="text-sm font-medium">
                座號
                <input className="mt-1 w-full rounded-md border bg-background px-3 py-2" inputMode="numeric" placeholder="例如：12" />
              </label>
            </div>
            <div className="rounded-lg border bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <IdCard aria-hidden className="mb-2 h-5 w-5 text-primary" />
              Google Sheet 名冊串接點已預留，正式部署時可由 API Route 讀取班級、座號、學號與姓名。
            </div>
            <Button asChild>
              <Link href="/quiz/demo-bank">進入示範測驗 <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
