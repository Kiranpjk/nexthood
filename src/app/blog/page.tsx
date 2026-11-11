import Header from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import NeighborhoodTile from "@/components/common/NeighborhoodTile";
import Link from "next/link";

const blogPosts = [
  {
    title: "Top 5 Up-and-Coming Neighborhoods in Bengaluru for 2025",
    description: "Discover the hidden gems of the Garden City that are quickly becoming hotspots for young professionals and families.",
    city: "Bengaluru",
    slug: "#",
  },
  {
    title: "A Foodie's Guide to Mumbai: The Best Eats in Every Suburb",
    description: "From street food stalls in Bandra to fine dining in Colaba, explore the culinary landscape of Mumbai.",
    city: "Mumbai",
    slug: "#",
  },
  {
    title: "Finding Peace in the Capital: Delhi's Greenest Neighborhoods",
    description: "Escape the hustle and bustle. We explore the most serene and park-filled localities in New Delhi.",
    city: "New Delhi",
    slug: "#",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-title font-bold">NextHood Blog</h1>
          <p className="text-lg text-muted-foreground mt-2">Insights and stories about life in India's vibrant neighborhoods.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.title} href={post.slug}>
              <Card className="h-full overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-raised">
                <NeighborhoodTile name={post.title} city={post.city} className="h-40" />
                <CardHeader>
                  <CardTitle className="font-headline text-xl leading-snug text-primary">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{post.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
