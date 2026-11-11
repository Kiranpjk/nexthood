import Header from "@/components/common/Header";
import { neighborhoods } from "@/lib/neighborhood-data";
import { notFound } from "next/navigation";
import NeighborhoodTile from "@/components/common/NeighborhoodTile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

export default async function NeighborhoodDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15 passes params as a Promise
  const { id } = await params;
  const neighborhood = neighborhoods.find(n => n.id.toString() === id);

  if (!neighborhood) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-10 px-4 md:px-6 md:py-14">
        <div className="max-w-5xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> All neighborhoods
          </Link>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-end">
            <div>
              <h1 className="text-display font-bold">{neighborhood.name}</h1>
              <p className="mt-3 flex items-center gap-2 text-lead text-muted-foreground">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                {neighborhood.city}
              </p>
            </div>
            <NeighborhoodTile name={neighborhood.name} city={neighborhood.city} className="h-48 rounded-xl md:h-64" />
          </div>

          <dl className="mt-10 grid grid-cols-3 divide-x border-y py-6">
            <div className="pr-4">
              <dt className="text-sm text-muted-foreground">Avg. monthly rent</dt>
              <dd className="mt-1 font-headline text-title-sm font-bold tabular-nums text-primary">₹{neighborhood.avgRent.toLocaleString("en-IN")}</dd>
            </div>
            <div className="px-4">
              <dt className="text-sm text-muted-foreground">Walk score</dt>
              <dd className="mt-1 font-headline text-title-sm font-bold tabular-nums text-primary">{neighborhood.walkScore}<span className="text-base font-medium text-muted-foreground">/100</span></dd>
            </div>
            <div className="pl-4">
              <dt className="text-sm text-muted-foreground">Schools</dt>
              <dd className="mt-1 font-headline text-title-sm font-bold text-primary">{neighborhood.amenities.includes('schools') ? 'Good' : 'Not listed'}</dd>
            </div>
          </dl>

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-title-sm font-bold">What it is like to live here</h2>
              <p className="mt-4 max-w-prose text-lg leading-relaxed text-foreground">{neighborhood.data}</p>

              <h2 className="mt-12 text-title-sm font-bold">Amenities</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {neighborhood.amenities.map((amenity) => (
                  <li key={amenity}>
                    <Badge variant="secondary" className="px-3 py-1 text-sm capitalize">{amenity}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="self-start rounded-xl bg-secondary p-6 md:p-8">
              <h2 className="text-title-sm font-bold">Does {neighborhood.name} fit how you live?</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                Create an account and describe your routine to get a match score for {neighborhood.name} and every other neighborhood we cover.
              </p>
              <Button asChild className="mt-6 w-full">
                <Link href="/signup">
                  Score this neighborhood <ArrowRight />
                </Link>
              </Button>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
