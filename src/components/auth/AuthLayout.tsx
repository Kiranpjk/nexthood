import Header from '@/components/common/Header';
import NeighborhoodTile from '@/components/common/NeighborhoodTile';

interface AuthLayoutProps {
  heading: string;
  body: string;
  children: React.ReactNode;
}

/** Two-column frame for log in and sign up: brand surface on the left, the form on the right. */
export default function AuthLayout({ heading, body, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-5xl items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <section className="hidden flex-col justify-between overflow-hidden rounded-2xl bg-secondary lg:flex" aria-hidden="true">
            <div className="p-10">
              <p className="font-headline text-title font-bold text-primary">{heading}</p>
              <p className="mt-4 max-w-sm leading-relaxed text-foreground/80">{body}</p>
            </div>
            <NeighborhoodTile name="Indiranagar" city="Bengaluru" className="h-64 bg-transparent" />
          </section>
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </main>
    </div>
  );
}
