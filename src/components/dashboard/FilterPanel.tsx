'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="sticky top-24 shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Filter & Refine</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label htmlFor="max-rent">Max Rent</Label>
            <span className="text-sm font-medium text-primary">₹{filters.maxRent.toLocaleString()}</span>
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
            <Label htmlFor="min-walk-score">Min Walk Score</Label>
             <span className="text-sm font-medium text-primary">{filters.minWalkScore}</span>
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
          <Label>Amenities</Label>
          <div className="space-y-2">
            {AMENITIES.map(amenity => (
              <div key={amenity} className="flex items-center space-x-2">
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
      </CardContent>
    </Card>
  );
}
