import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your Perfect Neighborhood
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              NeighborWise uses AI to match your lifestyle with the ideal community. Stop searching, start living.
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
      </main>
    </div>
  );
}
