import Header from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
            <CardDescription>Last updated: July 26, 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              NextHood ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by NextHood.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-4">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, lifestyle preferences, and other information you choose to provide. We also collect anonymous data regarding your usage of the service to improve our AI models.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to operate, maintain, and provide you with the features and functionality of the service, as well as to communicate directly with you, such as to send you email messages and push notifications. We may also use this information for research and development purposes.
            </p>
             <h2 className="text-xl font-semibold text-foreground pt-4">Sharing of Your Information</h2>
            <p>
             We do not share your personal information with third parties without your consent, except in the limited circumstances described in this policy, such as to comply with a legal obligation.
            </p>
            <h2 className="text-xl font-semibold text-foreground pt-4">Your Choices</h2>
            <p>
              You can always opt not to disclose information to us, but keep in mind some information may be needed to register with us or to take advantage of some of our features. You may update or correct your account information at any time by logging into your account.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
