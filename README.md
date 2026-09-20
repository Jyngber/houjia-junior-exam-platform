# 後甲國中線上測驗系統

Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui + Zustand + Supabase 基礎骨架。

## 技術基礎
- Next.js 14 App Router / React 18
- TypeScript Strict Mode
- Tailwind CSS
- shadcn/ui component convention
- Zustand
- Supabase SSR / Browser Client
- Inter + Noto Sans TC
- RWD + keyboard/focus accessibility foundation

## 本機啟動
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 路由
- `/`：入口
- `/student`：學生入口
- `/teacher`：教師入口

## 下一階段
1. Supabase PostgreSQL schema + RLS
2. Auth 與教師／學生角色
3. Storage 文件上傳
4. PDF/DOCX/TXT/MD parser
5. OpenAI 題目結構化
6. 題庫審核器
7. 測驗與成績
