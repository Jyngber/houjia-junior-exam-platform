import type { Metadata } from "next";
import { Noto_Sans_TC, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "後甲國中線上測驗系統",
  description: "將教師文件快速轉換為互動式線上題庫。"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansTc.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
