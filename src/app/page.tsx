import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NeighborhoodTile from "@/components/common/NeighborhoodTile";
import { neighborhoods } from "@/lib/neighborhood-data";

const steps = [
  {
    title: "Describe how you live",
    body: "Quiet streets or late-night cafes, a short walk to the metro or room for a car. Write it the way you would tell a friend.",
  },
  {
    title: "Every neighborhood gets scored",
    body: "The model reads each area's profile against yours and returns a match score with a plain-language reason.",
  },
  {
    title: "Compare, then go and see",
    body: "Filter by rent, walkability and must-have amenities, and shortlist the two or three worth a weekend visit.",
  },
];

const featured = [
  {
    id: 1,
    blurb: "Startup offices, cafes on every corner and a nightlife that runs late. Traffic is the trade-off.",
    tags: ["Cafes", "Nightlife", "Parks"],
  },
  {
    id: 2,
    blurb: "A coastal suburb of boutiques and sea-facing promenades, with local trains into the city.",
    tags: ["Coastal", "Shopping", "Trains"],
  },
  {
    id: 3,
    blurb: "Medieval ruins, galleries and rooftop bars over a lake, next to a large deer park.",
    tags: ["Historic", "Artsy", "Metro"],
  },
];

const cityCount = new Set(neighborhoods.map((n) => n.city)).size;

export default function Home() {
  const example = neighborhoods.find((n) => n.id === 4)!;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="container px-4 pb-20 pt-12 md:px-6 md:pb-28 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="motion-safe:animate-in motion-safe:fade-in-50 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:ease-out">
              <h1 className="text-display font-bold">
                Know the street before you sign the lease.
              </h1>
              <p className="mt-6 max-w-xl text-lead text-muted-foreground">
                Moving to a new city in India? Tell NextHood how you like to live and it scores real neighborhoods
                against it, so you arrive with a shortlist instead of a hundred browser tabs.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Find my neighborhood <ArrowRight />
                  </Link>
                </Button>
                <Link
                  href="#how-it-works"
                  className="inline-flex h-12 items-center justify-center font-semibold text-primary underline decoration-primary/30 underline-offset-[6px] transition-colors hover:decoration-primary"
                >
                  How the matching works
                </Link>
              </div>
              <p className="mt-10 text-sm text-muted-foreground">
                {neighborhoods.length} neighborhoods across {cityCount} cities, from Koramangala to Salt Lake.
              </p>
            </div>

            {/* Example result, drawn in markup so it never depends on a photo */}
            <figure className="relative isolate mx-auto w-full max-w-md lg:max-w-none" aria-label="Example match result">
              <div className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-secondary md:-inset-6" aria-hidden="true" />
              <div className="overflow-hidden rounded-xl border bg-card shadow-raised">
                <NeighborhoodTile name={example.name} city={example.city} className="h-44 md:h-52" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-headline text-title-sm font-bold text-primary">{example.name}</p>
                      <p className="text-sm text-muted-foreground">{example.city}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-headline text-3xl font-bold leading-none text-primary tabular-nums">92%</p>
                      <p className="mt-1 text-xs text-muted-foreground">lifestyle match</p>
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[92%] rounded-full bg-primary" />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">
                    Walkable, close to the metro and full of cafes, which fits a car-free routine.
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Avg. rent</dt>
                      <dd className="font-semibold tabular-nums">₹{example.avgRent.toLocaleString("en-IN")}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Walk score</dt>
                      <dd className="font-semibold tabular-nums">{example.walkScore}/100</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <figcaption className="sr-only">An example of a scored neighborhood card from the finder.</figcaption>
            </figure>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 border-t py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <h2 className="max-w-xl text-title font-bold">From a paragraph about your life to a shortlist</h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
              {steps.map((step, i) => (
                <li key={step.title} className="border-t-2 border-primary pt-6">
                  <span className="font-headline text-sm font-bold tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-title-sm font-semibold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Featured */}
        <section id="featured" className="scroll-mt-20 bg-secondary py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-lg text-title font-bold">Three places people ask us about most</h2>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/30 underline-offset-[6px] hover:decoration-primary"
              >
                See all {neighborhoods.length} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((f) => {
                const n = neighborhoods.find((x) => x.id === f.id)!;
                return (
                  <Link
                    key={f.id}
                    href={`/neighborhood/${n.id}`}
                    className="group flex flex-col overflow-hidden rounded-xl border border-transparent bg-card shadow-raised transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <NeighborhoodTile name={n.name} city={n.city} className="h-40" />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-title-sm font-bold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                        {n.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{n.city}</p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">{f.blurb}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {f.tags.map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section id="feedback" className="border-t py-16 md:py-20">
          <div className="container flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="max-w-xl">
              <h2 className="text-title-sm font-bold">Moved recently? Tell us what we got wrong.</h2>
              <p className="mt-2 text-muted-foreground">
                Every note from someone who has lived in a neighborhood makes the next match better.
              </p>
            </div>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-accent">
              <Link href="/contact">Send feedback</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
