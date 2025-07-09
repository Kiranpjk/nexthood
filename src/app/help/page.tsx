import Header from "@/components/common/Header";
import Link from "next/link";
import { LifeBuoy, BookOpen, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-headline font-bold">How can we help?</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Find the resources you need to get the most out of NextHood.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Link href="/support">
                <Card className="h-full hover:bg-muted transition-colors">
                    <CardHeader className="items-center">
                        <LifeBuoy className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Support Center</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground">Browse our FAQs and find answers to common questions.</p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/contact">
                <Card className="h-full hover:bg-muted transition-colors">
                    <CardHeader className="items-center">
                        <MessageCircle className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-foreground">Get in touch with our team for direct assistance.</p>
                    </CardContent>
                </Card>
            </Link>
            <Card className="h-full">
                <CardHeader className="items-center">
                    <BookOpen className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Getting Started</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">Learn how to use our AI-powered tools to find your ideal neighborhood.</p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
