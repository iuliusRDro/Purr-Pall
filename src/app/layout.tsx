import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import BackgroundPattern from "@/components/layout/BackgroundPattern";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"], // Weights needed for the friendly vibe
});

export const metadata: Metadata = {
  title: "Purr Pals | Find Your Fur-ever Friend",
  description: "A cozy place to find adoptable cats near you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <BackgroundPattern />
        <main className="min-h-screen relative flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
