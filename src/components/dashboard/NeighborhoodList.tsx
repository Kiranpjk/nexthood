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
      <div className="flex items-center justify-center rounded-lg border-2 border-dashed min-h-[50vh]">
        <LoadingAnimation text="Finding your perfect match..." />
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {neighborhoods.map((n) => (
        <NeighborhoodCard key={n.id} neighborhood={n} />
      ))}
    </div>
  );
}
