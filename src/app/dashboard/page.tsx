'use client';

import * as React from 'react';
import Header from '@/components/common/Header';
import PreferenceForm from '@/components/dashboard/PreferenceForm';
import FilterPanel, { type Filters } from '@/components/dashboard/FilterPanel';
import NeighborhoodList from '@/components/dashboard/NeighborhoodList';
import { runEvaluation } from '@/actions/evaluateNeighborhoods';
import type { EvaluatedNeighborhood } from '@/lib/types';

export default function DashboardPage() {
  const [evaluatedNeighborhoods, setEvaluatedNeighborhoods] = React.useState<EvaluatedNeighborhood[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filters, setFilters] = React.useState<Filters>({
    maxRent: 100000,
    minWalkScore: 0,
    amenities: [],
  });

  React.useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      const result = await runEvaluation('');
      setEvaluatedNeighborhoods(result);
      setIsLoading(false);
    };
    initialLoad();
  }, []);

  const handleEvaluation = async (preferences: string) => {
    setIsLoading(true);
    const result = await runEvaluation(preferences);
    setEvaluatedNeighborhoods(result);
    setIsLoading(false);
  };
  
  const filteredNeighborhoods = React.useMemo(() => {
    return evaluatedNeighborhoods.filter(n => {
      const rentMatch = n.avgRent <= filters.maxRent;
      const walkScoreMatch = n.walkScore >= filters.minWalkScore;
      const amenitiesMatch = filters.amenities.length === 0 || filters.amenities.every(amenity => n.amenities.includes(amenity));
      return rentMatch && walkScoreMatch && amenitiesMatch;
    });
  }, [evaluatedNeighborhoods, filters]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <PreferenceForm onSubmit={handleEvaluation} isLoading={isLoading} />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterPanel filters={filters} onFilterChange={setFilters} />
            </div>
            <div className="lg:col-span-3">
              <NeighborhoodList neighborhoods={filteredNeighborhoods} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
