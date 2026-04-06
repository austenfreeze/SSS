import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ArchivalHeader } from "@/components/ArchivalHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "STENxSTUDIO",
  description: "THE STEN OF REALITY | Adaptive Archival Analysis",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      {/* Added suppressHydrationWarning to html and body to handle extension attribute injection */}
      <html 
        lang="en" 
        className={`dark ${geistSans.variable} ${geistMono.variable}`} 
        suppressHydrationWarning
      >
        <body 
          className="bg-black text-white antialiased selection:bg-white selection:text-black"
          suppressHydrationWarning
        >
          <ArchivalHeader />
          {/* Main is the shell, children provide the page specific structure */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}