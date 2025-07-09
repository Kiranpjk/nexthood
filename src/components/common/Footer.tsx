import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { cn } from '@/lib/utils';

const footerLinks = {
  Hosting: [
    { name: 'Web hosting', href: '#' },
    { name: 'WordPress Hosting', href: '#' },
    { name: 'VPS hosting', href: '#' },
    { name: 'n8n VPS hosting', href: '#' },
    { name: 'Business email', href: '#' },
    { name: 'Cloud hosting', href: '#' },
    { name: 'WooCommerce hosting', href: '#' },
    { name: 'Hosting for agencies', href: '#' },
    { name: 'Minecraft hosting', href: '#' },
    { name: 'Game server hosting', href: '#' },
    { name: 'Google Workspace', href: '#' },
  ],
  Domain: [
    { name: 'Domains', href: '#' },
    { name: 'Cheap domains', href: '#' },
    { name: 'Free Domain Name', href: '#' },
    { name: 'WHOIS Lookup', href: '#' },
    { name: 'Free SSL certificate', href: '#' },
    { name: 'Domain transfer', href: '#' },
    { name: 'Domain Extensions', href: '#' },
  ],
  Tools: [
    { name: 'Horizons', href: '#' },
    { name: 'Website Builder', href: '#' },
    { name: 'AI Website Builder', href: '#' },
    { name: 'Ecommerce Website Builder', href: '#' },
    { name: 'Business Name Generator', href: '#' },
    { name: 'AI Logo Generator', href: '#' },
    { name: 'Migrate to Hostinger', href: '#' },
    { name: 'Hostinger API', href: '#' },
  ],
  Information: [
    { name: 'Pricing', href: '#' },
    { name: 'Hostinger Reviews', href: '#' },
    { name: 'Affiliate program', href: '#' },
    { name: 'Referral program', href: '#' },
    { name: 'Roadmap', href: '#' },
    { name: 'Rewards', href: '#' },
    { name: 'System status', href: '#' },
    { name: 'Sitemap', href: '#' },
  ],
  Company: [
    { name: 'About Hostinger', href: '#' },
    { name: 'Our technology', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  Support: [
    { name: 'Tutorials', href: '#' },
    { name: 'Knowledge Base', href: '#' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Report Online Abuse', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'Refund policy', href: '#' },
    { name: 'Terms of service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t mt-16">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-1">
            <Logo />
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
            © 2004-2025 Hostinger - Premium Web Hosting, Cloud, VPS, AI Website Builder & Domain Registration Services.
          </p>
          <div className="text-sm text-muted-foreground uppercase tracking-wider space-x-2">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Discover</span>
            <span>Dinersclub</span>
            <span>Rupay</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center md:text-left">
          Prices are listed without VAT.
        </p>
      </div>
    </footer>
  );
}
