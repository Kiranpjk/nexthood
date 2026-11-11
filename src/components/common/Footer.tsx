import Link from 'next/link';
import Logo from '@/components/ui/logo';

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
    <footer className="bg-secondary">
      <div className="container py-16 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/80">
              A neighborhood finder for people moving to a new city in India.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h2 className="font-body text-sm font-semibold tracking-normal text-foreground">{title}</h2>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-secondary-strong pt-8 md:flex-row">
          <p className="text-sm text-foreground/80">
            © {new Date().getFullYear()} NextHood
          </p>
        </div>
      </div>
    </footer>
  );
}
