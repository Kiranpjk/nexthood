import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CircleCheckBig, Pencil, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex items-center justify-center py-16 sm:py-24 md:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Find Your Perfect Neighborhood
              </h1>
              <p className="text-lg md:text-xl text-foreground/80">
                NextHood uses AI to match your lifestyle with the ideal community in India. Stop searching, start living.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 sm:py-20 md:py-28">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
                    <h2 className="text-3xl font-headline font-bold sm:text-4xl">Your Dream Home in 3 Simple Steps</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our AI-powered process makes finding your next neighborhood effortless.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                            <Pencil className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-headline font-semibold mb-2">1. Describe Your Lifestyle</h3>
                        <p className="text-muted-foreground">Tell us what matters most to you—from quiet streets and parks to vibrant nightlife and cafes.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
                         <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                            <Search className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-headline font-semibold mb-2">2. Discover Your Matches</h3>
                        <p className="text-muted-foreground">Our AI analyzes thousands of data points to find neighborhoods that match your unique preferences.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
                         <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                            <CircleCheckBig className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-headline font-semibold mb-2">3. Decide with Confidence</h3>
                        <p className="text-muted-foreground">Receive detailed reports, scores, and insights to make an informed decision about your new home.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Featured Neighborhoods Section */}
        <section id="featured" className="py-16 sm:py-20 md:py-28 bg-secondary/30">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
                    <h2 className="text-3xl font-headline font-bold sm:text-4xl">Explore Top Neighborhoods</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Get a glimpse of some of the most sought-after communities in India.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                        <Image src="data:image/jpeg;base64,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" alt="Koramangala" width={600} height={400} className="w-full object-cover" data-ai-hint="koramangala bangalore"/>
                        <CardHeader>
                            <CardTitle>Koramangala</CardTitle>
                            <CardDescription>Bengaluru</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">A bustling hub for startups and young professionals with vibrant nightlife and cozy cafes.</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Badge variant="secondary">Cafes</Badge>
                                <Badge variant="secondary">Nightlife</Badge>
                                <Badge variant="secondary">Parks</Badge>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx6GAZOc0S3HxYbah_Mt6Akzfb-FVvPAVKHw&s" alt="Bandra West" width={600} height={400} className="w-full object-cover" data-ai-hint="bandra west mumbai" />
                        <CardHeader>
                            <CardTitle>Bandra West</CardTitle>
                            <CardDescription>Mumbai</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">A trendy, upscale coastal suburb known for fashion boutiques and sea-facing promenades.</p>
                             <div className="flex flex-wrap gap-2 mt-4">
                                <Badge variant="secondary">Trendy</Badge>
                                <Badge variant="secondary">Coastal</Badge>
                                <Badge variant="secondary">Shopping</Badge>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-400">
                        <Image src="https://placehold.co/600x400.png" alt="Hauz Khas Village" width={600} height={400} className="w-full object-cover" data-ai-hint="hauz khas delhi"/>
                        <CardHeader>
                            <CardTitle>Hauz Khas Village</CardTitle>
                            <CardDescription>New Delhi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">A unique mix of historical ruins, art galleries, and a lively bar scene overlooking a lake.</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Badge variant="secondary">Historic</Badge>
                                <Badge variant="secondary">Artsy</Badge>
                                <Badge variant="secondary">Lake View</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 sm:py-20 md:py-28">
            <div className="container px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100">
                    <h2 className="text-3xl font-headline font-bold sm:text-4xl">What Our Users Say</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="bg-secondary/30 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200">
                        <CardContent className="pt-6">
                            <div className="flex items-center mb-4">
                               <Avatar>
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="@riya" data-ai-hint="woman portrait" />
                                    <AvatarFallback>RS</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <p className="font-semibold">Riya Sharma</p>
                                    <p className="text-sm text-muted-foreground">Moved to Bengaluru</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground italic">"NextHood was a lifesaver! The AI matching was scarily accurate. It found us a perfect spot in Indiranagar that we would have never discovered on our own."</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/30 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-300">
                         <CardContent className="pt-6">
                            <div className="flex items-center mb-4">
                               <Avatar>
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="@amit" data-ai-hint="man portrait"/>
                                    <AvatarFallback>AK</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <p className="font-semibold">Amit Kumar</p>
                                    <p className="text-sm text-muted-foreground">Relocated to Mumbai</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground italic">"As someone new to Mumbai, I was completely overwhelmed. This app simplified the entire process. The neighborhood reports are incredibly detailed and helpful."</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Feedback Section */}
        <section id="feedback" className="py-16 sm:py-20 md:py-28 bg-secondary/30">
            <div className="container px-4 md:px-6">
                <Card className="max-w-3xl mx-auto text-center p-8 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline font-bold">Have Feedback or Questions?</CardTitle>
                        <CardDescription className="mt-4 text-lg text-muted-foreground">
                            We're always looking to improve. Let us know how we can make NextHood better for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild size="lg">
                            <Link href="/contact">
                                Give Feedback
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
      </main>
    </div>
  );
}
