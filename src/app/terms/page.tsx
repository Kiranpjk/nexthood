import Header from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
             <CardDescription>Last updated: July 26, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the NextHood website (the "Service") operated by NextHood ("us", "we", or "our").
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-4">Accounts</h2>
            <p>
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-4">Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of NextHood and its licensors. The Service is protected by copyright, trademark, and other laws of both the India and foreign countries.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-4">Disclaimer</h2>
            <p>
              The information provided by our Service is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
            </p>
             <h2 className="text-xl font-semibold text-foreground pt-4">Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
