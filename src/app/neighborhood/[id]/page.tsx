import Header from "@/components/common/Header";
import { neighborhoods } from "@/lib/neighborhood-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, DollarSign, Footprints, School, MapPin } from "lucide-react";

export default function NeighborhoodDetailPage({ params }: { params: { id: string } }) {
  const neighborhood = neighborhoods.find(n => n.id.toString() === params.id);

  if (!neighborhood) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Image Header */}
          <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg shadow-lg mb-8">
            <Image
              src={neighborhood.image}
              alt={`Image of ${neighborhood.name}`}
              fill
              className="object-cover"
              data-ai-hint={neighborhood.name.toLowerCase().split(' ').join(' ')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white">{neighborhood.name}</h1>
              <p className="text-xl md:text-2xl text-white/90 flex items-center gap-2 mt-2">
                <MapPin className="h-6 w-6" />
                {neighborhood.city}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About {neighborhood.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4">
                  <p>{neighborhood.data}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                      <div className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-lg">
                        <DollarSign className="h-8 w-8 text-accent" />
                        <span className="text-sm text-muted-foreground">Avg. Rent</span>
                        <span className="text-xl font-bold">₹{neighborhood.avgRent.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-lg">
                        <Footprints className="h-8 w-8 text-accent" />
                        <span className="text-sm text-muted-foreground">Walk Score</span>
                        <span className="text-xl font-bold">{neighborhood.walkScore}/100</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-lg">
                        <School className="h-8 w-8 text-accent" />
                        <span className="text-sm text-muted-foreground">Schools</span>
                        <span className="text-xl font-bold">{neighborhood.amenities.includes('schools') ? 'Good' : 'N/A'}</span>
                      </div>
                    </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Amenities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {neighborhood.amenities.map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="capitalize text-base py-1 px-3">{amenity}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>

              <Card className="bg-primary/10 border-primary">
                <CardHeader>
                  <CardTitle>Is this your perfect match?</CardTitle>
                  <CardDescription>
                    Sign up or log in to get a personalized lifestyle match score for {neighborhood.name} and hundreds of other neighborhoods.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/signup">
                      Get Your Score <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
