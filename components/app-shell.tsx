import Link from "next/link";
import { BookOpenCheck, GraduationCap, UploadCloud } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link className="flex items-center gap-2 font-bold text-primary" href="/">
            <BookOpenCheck aria-hidden className="h-6 w-6" />
            後甲國中線上測驗系統
          </Link>
          <nav aria-label="主要導覽" className="flex items-center gap-1">
            <Link className="rounded-md px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800" href="/teacher">
              <UploadCloud aria-hidden className="mr-1 inline h-4 w-4" />
              教師端
            </Link>
            <Link className="rounded-md px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800" href="/student">
              <GraduationCap aria-hidden className="mr-1 inline h-4 w-4" />
              學生端
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </main>
  );
}
