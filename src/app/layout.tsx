import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
const inter=Inter({subsets:["latin"],variable:"--font-inter"});
const notoSansTC=Noto_Sans_TC({subsets:["latin"],variable:"--font-noto-sans-tc"});
export const metadata:Metadata={title:"後甲國中線上測驗系統",description:"後甲國中互動式線上測驗與題庫平台"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-TW" suppressHydrationWarning><body className={`${inter.variable} ${notoSansTC.variable} font-sans antialiased`}>{children}</body></html>}