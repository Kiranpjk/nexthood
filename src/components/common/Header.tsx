'use client'; 

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../ui/logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Neighborhood Finder" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact Us" },
];


export default function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "animate-in fade-in-0 duration-500"
    )}>
      <div className="container flex h-16 items-center">
        
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>
          </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
           {navLinks.map(link => (
             <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2",
                  "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100",
                  pathname === link.href
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
          ))}
        </nav>

        {/* Auth Buttons & Mobile Menu */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                 <Button variant="ghost" asChild className="p-0 h-10 w-10 rounded-full">
                  <Link href="/profile" className="rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'}/>
                      <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 py-6">
                  <Link href="/" className="mb-4">
                    <Logo />
                  </Link>
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-lg font-medium",
                          pathname === link.href ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="pt-6 mt-6 border-t">
                    {user ? (
                       <div className="flex flex-col gap-4">
                          <SheetClose asChild>
                              <Link href="/profile" className="flex items-center gap-4">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'}/>
                                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                  </Avatar>
                                  <span className={cn("text-lg font-medium", pathname === "/profile" ? "text-primary" : "text-muted-foreground")}>
                                      Profile
                                  </span>
                              </Link>
                          </SheetClose>
                          <Button variant="outline" onClick={handleLogout} className="w-full">
                              Log Out
                          </Button>
                       </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <SheetClose asChild>
                           <Button variant="outline" asChild className="w-full">
                              <Link href="/login">Log In</Link>
                           </Button>
                        </SheetClose>
                        <SheetClose asChild>
                           <Button asChild className="w-full">
                              <Link href="/signup">Sign Up</Link>
                           </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}
