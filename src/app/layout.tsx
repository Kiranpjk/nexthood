import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Chatbot from "@/components/common/Chatbot";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/common/Footer";
import { PageLoader } from "@/components/common/PageLoader";

export const metadata: Metadata = {
  title: "NextHood",
  description: "Find your perfect neighborhood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
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
