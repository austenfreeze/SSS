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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { 
          colorPrimary: '#ffffff',
          colorBackground: '#000000',
          colorText: '#ffffff',
        },
      }}
    >
      <html 
        lang="en" 
        className={`dark ${geistSans.variable} ${geistMono.variable}`} 
        suppressHydrationWarning
      >
        <body
          className="antialiased bg-black text-white selection:bg-white selection:text-black min-h-screen flex flex-col"
          suppressHydrationWarning
        >
          <ArchivalHeader />
          <main className="flex-1">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}