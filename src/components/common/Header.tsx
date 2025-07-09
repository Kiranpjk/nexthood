import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../ui/logo";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "animate-in fade-in-0 duration-500"
    )}>
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        <nav className="flex items-center gap-2">
           <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Neighborhood Finder</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/support">Support</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
