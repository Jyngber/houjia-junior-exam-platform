import mammoth from "mammoth";
import pdf from "pdf-parse";

export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());

  if (extension === "pdf") {
    const parsed = await pdf(buffer);
    return normalizeText(parsed.text);
  }

  if (extension === "docx") {
    const parsed = await mammoth.extractRawText({ buffer });
    return normalizeText(parsed.value);
  }

  if (extension === "txt" || extension === "md") {
    return normalizeText(buffer.toString("utf-8"));
  }

  throw new Error("目前僅支援 PDF、DOCX、TXT 與 MD 檔案。");
}

function normalizeText(text: string): string {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}
