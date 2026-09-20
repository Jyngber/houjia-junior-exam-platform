"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const supabase = createClient();

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = role === "teacher" ? "/teacher" : "/student";
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName, role } },
        });
        if (error) throw error;
        setMessage(data.session ? "註冊成功，已登入。" : "註冊成功，請依 Supabase 設定完成 Email 驗證後登入。");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "操作失敗，請稍後再試。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <section className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <h1 className="text-2xl font-bold">後甲國中線上測驗系統</h1>
        <p className="mt-2 text-sm text-slate-500">{mode === "signin" ? "帳號登入" : "建立帳號"}</p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          <button type="button" onClick={() => setMode("signin")} className={mode === "signin" ? "rounded-md bg-white py-2 text-sm font-semibold shadow-sm dark:bg-slate-700" : "py-2 text-sm"}>登入</button>
          <button type="button" onClick={() => setMode("signup")} className={mode === "signup" ? "rounded-md bg-white py-2 text-sm font-semibold shadow-sm dark:bg-slate-700" : "py-2 text-sm"}>註冊</button>
        </div>

        {mode === "signup" && (
          <>
            <label className="mt-5 block text-sm font-medium">姓名<input value={displayName} onChange={e => setDisplayName(e.target.value)} className="mt-2 w-full rounded-lg border p-3 dark:bg-slate-950" required /></label>
            <label className="mt-4 block text-sm font-medium">身分<select value={role} onChange={e => setRole(e.target.value as "teacher" | "student")} className="mt-2 w-full rounded-lg border p-3 dark:bg-slate-950"><option value="student">學生</option><option value="teacher">教師</option></select></label>
          </>
        )}

        <form onSubmit={submit}>
          <label className="mt-4 block text-sm font-medium">Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border p-3 dark:bg-slate-950" required /></label>
          <label className="mt-4 block text-sm font-medium">密碼<input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border p-3 dark:bg-slate-950" minLength={6} required /></label>
          <button disabled={loading} className="mt-6 w-full rounded-lg bg-[#312E81] px-4 py-3 font-semibold text-white disabled:opacity-50">{loading ? "處理中..." : mode === "signin" ? "登入" : "建立帳號"}</button>
        </form>

        {message && <p role="status" className="mt-4 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">{message}</p>}
      </section>
    </main>
  );
}