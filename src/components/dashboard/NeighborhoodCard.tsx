import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EvaluatedNeighborhood } from '@/lib/types';
import NeighborhoodTile from '@/components/common/NeighborhoodTile';

interface NeighborhoodCardProps {
  neighborhood: EvaluatedNeighborhood;
}

export default function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  const scored = neighborhood.matchScore > 0;

  return (
    <Link
      href={`/neighborhood/${neighborhood.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <NeighborhoodTile name={neighborhood.name} city={neighborhood.city} className="h-36" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-title-sm font-bold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
              {neighborhood.name}
            </h3>
            <p className="text-sm text-muted-foreground">{neighborhood.city}</p>
          </div>
          {scored && (
            <p className="text-right">
              <span className="block font-headline text-3xl font-bold leading-none text-primary tabular-nums">
                {neighborhood.matchScore}%
              </span>
              <span className="text-xs text-muted-foreground">match</span>
            </p>
          )}
        </div>

        {scored && (
          <Progress
            value={neighborhood.matchScore}
            className="mt-4 h-1.5 bg-muted"
            aria-label={`Lifestyle match ${neighborhood.matchScore}%`}
          />
        )}

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{neighborhood.explanation}</p>

        <dl className="mt-5 grid grid-cols-3 gap-4 border-t pt-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Avg. rent</dt>
            <dd className="font-semibold tabular-nums">₹{neighborhood.avgRent.toLocaleString('en-IN')}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Walk score</dt>
            <dd className="font-semibold tabular-nums">{neighborhood.walkScore}/100</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Schools</dt>
            <dd className="font-semibold">{neighborhood.amenities.includes('schools') ? 'Good' : 'Not listed'}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          {neighborhood.amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="capitalize">
              {amenity}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
