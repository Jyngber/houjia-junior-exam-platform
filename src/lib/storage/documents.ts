import { createClient } from "@/lib/supabase/client";

const BUCKET = "documents";
export const ACCEPTED_DOCUMENT_EXTENSIONS = [".pdf",".docx",".txt",".md"] as const;
export const MAX_DOCUMENT_SIZE = 20 * 1024 * 1024;

export function validateDocument(file: File): string | null {
  const extension = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");
  if (!ACCEPTED_DOCUMENT_EXTENSIONS.includes(extension as (typeof ACCEPTED_DOCUMENT_EXTENSIONS)[number])) return "目前只支援 PDF、DOCX、TXT、MD 檔案。";
  if (file.size > MAX_DOCUMENT_SIZE) return "檔案大小不可超過 20 MB。";
  return null;
}

export async function uploadDocument(file: File, userId: string) {
  const errorMessage = validateDocument(file);
  if (errorMessage) throw new Error(errorMessage);
  const supabase = createClient();
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = userId + "/" + crypto.randomUUID() + "." + extension;
  const { data, error } = await supabase.storage.from(BUCKET).upload(path,file,{cacheControl:"3600",upsert:false,contentType:file.type||"application/octet-stream"});
  if (error) throw error;
  return { bucket:BUCKET,path:data.path,originalFileName:file.name,fileType:extension,size:file.size };
}

export async function removeDocument(path: string) {
  const { error } = await createClient().storage.from(BUCKET).remove([path]);
  if (error) throw error;
}