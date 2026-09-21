import { AppShell } from "@/components/app-shell";
import { BankPreview } from "@/components/bank-preview";
import { UploadPanel } from "@/components/upload-panel";

export default function TeacherPage() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">教師端</h1>
          <p className="text-slate-600 dark:text-slate-300">
            上傳不同年級與科目的題庫文件，系統會解析原文並產生可校正的結構化題目。
          </p>
          <UploadPanel />
        </div>
        <BankPreview />
      </section>
    </AppShell>
  );
}
