import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EvaluatedNeighborhood } from '@/lib/types';
import { DollarSign, School, Footprints } from 'lucide-react';

interface NeighborhoodCardProps {
  neighborhood: EvaluatedNeighborhood;
}

export default function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  return (
    <Link href={`/neighborhood/${neighborhood.id}`} className="block">
      <Card className="h-full overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={neighborhood.image}
              alt={`Image of ${neighborhood.name}`}
              fill
              className="object-cover"
              data-ai-hint={neighborhood.name.toLowerCase().split(' ').join(' ')}
            />
          </div>
          <div className="p-6">
            <CardTitle className="text-2xl font-headline">{neighborhood.name}</CardTitle>
            <CardDescription>{neighborhood.city}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold">Lifestyle Match</span>
              <span className="font-bold text-lg text-primary">{neighborhood.matchScore}%</span>
            </div>
            <Progress value={neighborhood.matchScore} className="h-2" />
          </div>
          <p className="text-sm text-muted-foreground italic">
            "{neighborhood.explanation}"
          </p>
          <div className="grid grid-cols-3 gap-4 text-center pt-2">
            <div className="flex flex-col items-center gap-1">
              <DollarSign className="h-6 w-6 text-accent" />
              <span className="text-sm text-muted-foreground">Avg. Rent</span>
              <span className="font-semibold">₹{neighborhood.avgRent.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Footprints className="h-6 w-6 text-accent" />
              <span className="text-sm text-muted-foreground">Walk Score</span>
              <span className="font-semibold">{neighborhood.walkScore}/100</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <School className="h-6 w-6 text-accent" />
              <span className="text-sm text-muted-foreground">Schools</span>
              <span className="font-semibold">{neighborhood.amenities.includes('schools') ? 'Good' : 'N/A'}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {neighborhood.amenities.map((amenity) => (
              <Badge key={amenity} variant="secondary" className="capitalize">{amenity}</Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
