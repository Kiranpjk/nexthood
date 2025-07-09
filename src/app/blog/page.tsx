import Header from "@/components/common/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    title: "Top 5 Up-and-Coming Neighborhoods in Bengaluru for 2025",
    description: "Discover the hidden gems of the Garden City that are quickly becoming hotspots for young professionals and families.",
    image: "https://placehold.co/600x400.png",
    slug: "#",
    dataAiHint: "bengaluru cityscape",
  },
  {
    title: "A Foodie's Guide to Mumbai: The Best Eats in Every Suburb",
    description: "From street food stalls in Bandra to fine dining in Colaba, explore the culinary landscape of Mumbai.",
    image: "https://placehold.co/600x400.png",
    slug: "#",
    dataAiHint: "mumbai food",
  },
  {
    title: "Finding Peace in the Capital: Delhi's Greenest Neighborhoods",
    description: "Escape the hustle and bustle. We explore the most serene and park-filled localities in New Delhi.",
    image: "https://placehold.co/600x400.png",
    slug: "#",
    dataAiHint: "delhi park",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-headline font-bold">NextHood Blog</h1>
          <p className="text-lg text-muted-foreground mt-2">Insights and stories about life in India's vibrant neighborhoods.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.title} href={post.slug}>
              <Card className="h-full overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300">
                <Image src={post.image} alt={post.title} width={600} height={400} className="w-full object-cover" data-ai-hint={post.dataAiHint} />
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
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
