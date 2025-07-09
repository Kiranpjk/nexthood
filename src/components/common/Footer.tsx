import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const footerLinks = {
  'Explore': [
    { name: 'Neighborhood Finder', href: '/dashboard' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Featured Neighborhoods', href: '/#featured' },
  ],
  'Company': [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ],
  'Support': [
    { name: 'Support Center', href: '/support' },
    { name: 'Contact Us', href: '/contact' },
  ],
  'Legal': [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
             <p className="text-sm text-muted-foreground mt-4">Find your perfect neighborhood with AI.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-foreground">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} NextHood. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
