import Header from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-headline font-bold">Support Center</h1>
            <p className="text-lg text-muted-foreground mt-2">
              We're here to help you with any issues or questions.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions (FAQ)</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does the AI matching work?</AccordionTrigger>
                  <AccordionContent>
                    Our AI analyzes your lifestyle preferences and compares them against a rich dataset of neighborhood characteristics to provide a personalized match score and explanation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is the neighborhood data accurate?</AccordionTrigger>
                  <AccordionContent>
                    We strive to keep our data as up-to-date as possible, drawing from various public and private sources. However, we recommend verifying critical information independently.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I save my favorite neighborhoods?</AccordionTrigger>
                  <AccordionContent>
                    This feature is coming soon! We are working on adding user accounts and the ability to save and compare your top choices.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
              <CardDescription>If you can't find your answer in the FAQ, please reach out.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                You can reach our support team directly by visiting our{' '}
                <Link href="/contact" className="text-primary underline">
                  Contact Page
                </Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
