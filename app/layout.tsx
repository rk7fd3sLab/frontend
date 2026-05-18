import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import packageJson from "../package.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "社内備品貸出アプリ",
  description: "備品の予約、貸出申請、返却処理を行う社内向けフロントアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appVersion = process.env.APP_VERSION ?? packageJson.version;

  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <footer className="pointer-events-none fixed bottom-3 right-4 z-50 text-xs text-slate-500 md:right-6">
          Version {appVersion}
        </footer>
      </body>
    </html>
  );
}
