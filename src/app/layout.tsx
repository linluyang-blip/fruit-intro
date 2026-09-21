import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LuckyDraw from "./components/LuckyDraw";
import NamePrompt from "./components/NamePrompt";
import { VisitorNameProvider } from "./components/VisitorNameContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "寶島鮮果 · 台灣水果官網",
  description:
    "從南國陽光到高山冷涼，認識台灣最引以為傲的當季水果：愛文芒果、金鑽鳳梨、台東釋迦、黑珍珠蓮霧⋯⋯",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <VisitorNameProvider>
          {children}
          <NamePrompt />
          <LuckyDraw />
        </VisitorNameProvider>
      </body>
    </html>
  );
}
