import type { Metadata } from "next";
import { Noto_Sans_TC, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "清心 Patti | 清心顧問 QING CONSULTANCY CO.",
  description: "清心顧問 QING CONSULTANCY CO. - Digital Business Card",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK" className={`${inter.variable} ${notoSansTC.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
        {children}
      </body>
    </html>
  );
}
