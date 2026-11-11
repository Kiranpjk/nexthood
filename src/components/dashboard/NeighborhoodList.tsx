import { EvaluatedNeighborhood } from '@/lib/types';
import NeighborhoodCard from './NeighborhoodCard';
import LoadingAnimation from '@/components/common/LoadingAnimation';

interface NeighborhoodListProps {
  neighborhoods: EvaluatedNeighborhood[];
  isLoading: boolean;
}

export default function NeighborhoodList({ neighborhoods, isLoading }: NeighborhoodListProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center rounded-xl border bg-card" role="status">
        <LoadingAnimation text="Scoring neighborhoods" />
      </div>
    );
  }

  if (neighborhoods.length === 0) {
    return (
      <div className="flex h-64 flex-col items-start justify-center rounded-xl border bg-card p-8">
        <h3 className="text-xl font-bold">Nothing fits those filters</h3>
        <p className="mt-2 max-w-md text-muted-foreground">Raise the rent limit, lower the walk score or drop an amenity to see more neighborhoods.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {neighborhoods.map((n) => (
        <NeighborhoodCard key={n.id} neighborhood={n} />
      ))}
    </div>
  );
}
