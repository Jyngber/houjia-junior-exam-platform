# GitHub 到網站部署流程

## 1. 建立 GitHub Repository

在 GitHub 建立新 repository，例如：

```text
houjia-online-quiz
```

## 2. 設定遠端並推送

```bash
git branch -M main
git remote add origin https://github.com/<你的帳號>/houjia-online-quiz.git
git add .
git commit -m "Initial online quiz system"
git push -u origin main
```

## 3. 匯入 Vercel

在 Vercel 選擇：

```text
Add New Project -> Import Git Repository
```

Framework Preset 選擇：

```text
Next.js
```

## 4. 設定 Production 環境變數

至少需要：

```env
OPENAI_API_KEY=
OPENAI_QUIZ_MODEL=gpt-4o-mini
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 5. 部署後檢查

- `/teacher`：測試文件上傳與 AI 解析錯誤提示。
- `/student`：測試班級座號入口。
- `/quiz/demo-bank`：測試作答流程、旗標、快捷鍵與交卷限制。
