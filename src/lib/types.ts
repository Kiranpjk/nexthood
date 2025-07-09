import type { EvaluateNeighborhoodOutput } from '@/ai/flows/evaluate-neighborhood';

export interface Neighborhood {
  id: number;
  name: string;
  city: string;
  data: string;
  image: string;
  avgRent: number;
  walkScore: number;
  amenities: string[];
}

export type EvaluatedNeighborhood = Neighborhood & EvaluateNeighborhoodOutput;
