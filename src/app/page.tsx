import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Pencil, Search, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Footer from "@/components/common/Footer";

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
                NeighborWise uses AI to match your lifestyle with the ideal community in India. Stop searching, start living.
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
                            <CheckCircle className="h-8 w-8" />
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
                        <Image src="https://placehold.co/600x400.png" alt="Koramangala" width={600} height={400} className="w-full object-cover" data-ai-hint="koramangala bangalore"/>
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
                        <Image src="https://placehold.co/600x400.png" alt="Bandra West" width={600} height={400} className="w-full object-cover" data-ai-hint="bandra west mumbai" />
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
                            <p className="text-muted-foreground italic">"NeighborWise was a lifesaver! The AI matching was scarily accurate. It found us a perfect spot in Indiranagar that we would have never discovered on our own."</p>
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
      </main>
      <Footer />
    </div>
  );
}
