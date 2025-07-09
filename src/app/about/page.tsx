import Header from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/logo";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Logo />
            </div>
            <CardTitle className="text-3xl font-headline">About NextHood</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground text-center">
            <p>
              Welcome to NextHood, your trusted partner in finding the perfect place to call home in India. 
              Our mission is to simplify the complex and often overwhelming process of searching for a neighborhood 
              that truly matches your lifestyle, preferences, and needs.
            </p>
            <p>
              We believe that a home is more than just a house; it's about the community, the environment, and 
              the everyday experiences that shape your life. That's why we leverage the power of artificial intelligence 
              to go beyond simple property listings. Our sophisticated algorithms analyze vast amounts of data—from 
              walkability scores and school ratings to the vibrancy of local cafes and parks—to provide you with 
              personalized, insightful recommendations.
            </p>
            <p>
              At NextHood, we are a team of technologists, data scientists, and real estate enthusiasts passionate 
              about making your relocation journey as seamless and confident as possible. We are committed to providing 
              accurate, up-to-date information to help you make one of the most important decisions of your life.
            </p>
            <p>
              Thank you for choosing NextHood. Let's find your perfect neighborhood, together.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
