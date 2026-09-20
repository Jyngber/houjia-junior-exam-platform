"use client";
import {useState} from "react";
import {uploadDocument,validateDocument,MAX_DOCUMENT_SIZE} from "@/lib/storage/documents";
import {createClient} from "@/lib/supabase/client";

export default function DocumentUploadPage(){
 const [file,setFile]=useState<File|null>(null); const [message,setMessage]=useState(""); const [uploading,setUploading]=useState(false);
 async function handleUpload(){if(!file)return; const validation=validateDocument(file); if(validation){setMessage(validation);return;} setUploading(true);setMessage("");
  try{const {data:{user}}=await createClient().auth.getUser(); if(!user)throw new Error("請先登入教師帳號。"); const result=await uploadDocument(file,user.id);setMessage("上傳成功："+result.originalFileName);setFile(null);}
  catch(error){setMessage(error instanceof Error?error.message:"上傳失敗，請稍後再試。");} finally{setUploading(false);}
 }
 return <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950"><section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-900"><h1 className="text-2xl font-bold">文件上傳</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">支援 PDF、DOCX、TXT、Markdown，單一檔案上限 {MAX_DOCUMENT_SIZE/1024/1024} MB。</p><label className="mt-6 block"><span className="mb-2 block text-sm font-medium">選擇文件</span><input type="file" accept=".pdf,.docx,.txt,.md" onChange={e=>{const selected=e.target.files?.[0]??null;setFile(selected);setMessage(selected?validateDocument(selected)??"":"" )}} className="block w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700"/></label><button type="button" disabled={!file||uploading} onClick={handleUpload} className="mt-5 rounded-lg bg-[#312E81] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{uploading?"上傳中...":"上傳文件"}</button>{message&&<p role="status" className="mt-4 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">{message}</p>}</section></main>
}