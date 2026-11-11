'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { AMENITIES } from '@/lib/neighborhood-data';

export interface Filters {
  maxRent: number;
  minWalkScore: number;
  amenities: string[];
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export default function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleRentChange = (value: number[]) => {
    onFilterChange({ ...filters, maxRent: value[0] });
  };

  const handleWalkScoreChange = (value: number[]) => {
    onFilterChange({ ...filters, minWalkScore: value[0] });
  };
  
  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter(a => a !== amenity);
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  return (
    <section className="space-y-8 lg:sticky lg:top-24" aria-labelledby="filters-heading">
      <h2 id="filters-heading" className="text-xl font-bold">Narrow it down</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="max-rent">Max rent</Label>
            <span className="text-sm font-semibold tabular-nums text-primary">₹{filters.maxRent.toLocaleString('en-IN')}</span>
          </div>
          <Slider
            id="max-rent"
            min={10000}
            max={100000}
            step={1000}
            value={[filters.maxRent]}
            onValueChange={handleRentChange}
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="min-walk-score">Min walk score</Label>
             <span className="text-sm font-semibold tabular-nums text-primary">{filters.minWalkScore}</span>
          </div>
          <Slider
            id="min-walk-score"
            min={0}
            max={100}
            step={5}
            value={[filters.minWalkScore]}
            onValueChange={handleWalkScoreChange}
          />
        </div>
        <div className="space-y-4">
          <p className="text-sm font-medium" id="amenities-label">Amenities</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1" role="group" aria-labelledby="amenities-label">
            {AMENITIES.map(amenity => (
              <div key={amenity} className="flex min-h-6 items-center space-x-3">
                <Checkbox 
                  id={amenity} 
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, !!checked)}
                />
                <Label htmlFor={amenity} className="font-normal capitalize">{amenity}</Label>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
