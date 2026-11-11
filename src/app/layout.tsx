import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Chatbot from "@/components/common/Chatbot";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/common/Footer";
import { PageLoader } from "@/components/common/PageLoader";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "NextHood",
  description: "Match how you live with the right neighborhood in a new Indian city.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(display.variable, body.variable)}>
      <body className={cn("font-body antialiased flex flex-col min-h-screen")}>
        <AuthProvider>
          <PageLoader />
          <div className="flex-1">
            {children}
          </div>
          <Chatbot />
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
