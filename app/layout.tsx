import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vpoc",
  description: "Proof of concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} antialiased bg-background`}>
        <Providers>
          <Sidebar />
          <TopBar />
          <main className="ml-56 mt-14 min-h-screen overflow-y-auto p-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
