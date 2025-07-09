import { Skeleton } from '@/components/ui/skeleton';
import { EvaluatedNeighborhood } from '@/lib/types';
import NeighborhoodCard from './NeighborhoodCard';

interface NeighborhoodListProps {
  neighborhoods: EvaluatedNeighborhood[];
  isLoading: boolean;
}

const SkeletonCard = () => (
  <div className="space-y-4">
    <Skeleton className="h-48 w-full" />
    <div className="px-1 space-y-2">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-12 w-full" />
    </div>
  </div>
);

export default function NeighborhoodList({ neighborhoods, isLoading }: NeighborhoodListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (neighborhoods.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg h-64">
        <h3 className="text-xl font-semibold font-headline">No Matches Found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or changing your lifestyle preferences.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {neighborhoods.map((n) => (
        <NeighborhoodCard key={n.id} neighborhood={n} />
      ))}
    </div>
  );
}
