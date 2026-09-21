# 後甲國中線上測驗系統

將教師上傳的 PDF、DOCX、TXT 或 MD 題庫文件轉換為可編輯、可測驗、可統計的線上題庫。

## 技術架構

- Next.js 14 App Router
- React 18、TypeScript strict mode
- Tailwind CSS、Shadcn UI 風格元件、Framer Motion
- Zustand 測驗狀態管理
- Supabase PostgreSQL/Auth/Storage 預留整合
- OpenAI API 文件解析與結構化出題

## 本機啟動

```bash
pnpm install
pnpm dev
```

開啟：

```text
http://localhost:3000
```

## 環境變數

請建立 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_QUIZ_MODEL=gpt-4o-mini
```

缺少 `OPENAI_API_KEY` 時，教師端仍可開啟，但文件上傳解析會顯示設定提示。

## GitHub 與 Vercel 部署

1. 在 GitHub 建立 repository。
2. 將本機專案推上 GitHub。
3. 到 Vercel 匯入該 GitHub repository。
4. 在 Vercel 專案設定加入 `.env.local` 對應的環境變數。
5. 部署後，Vercel 會自動使用 `vercel.json` 的 Next.js 設定建置。

## GitHub Actions

`.github/workflows/ci.yml` 會在 push 或 pull request 時執行：

- TypeScript 型別檢查
- ESLint
- Next.js production build

## 資料庫

Supabase schema 位於：

```text
supabase/schema.sql
```

可在 Supabase SQL Editor 執行，建立 users、documents、question_banks、questions、quiz_records 等資料表。
