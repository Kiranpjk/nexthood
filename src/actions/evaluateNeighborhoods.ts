'use server';

import { evaluateNeighborhood } from '@/ai/flows/evaluate-neighborhood';
import { neighborhoods } from '@/lib/neighborhood-data';
import type { EvaluatedNeighborhood } from '@/lib/types';

export async function runEvaluation(lifestylePreferences: string): Promise<EvaluatedNeighborhood[]> {
  // If no preferences, return all neighborhoods with a default score for display.
  if (!lifestylePreferences.trim()) {
    return neighborhoods.map(n => ({...n, matchScore: 0, explanation: 'Enter your lifestyle preferences to get a personalized match score.'}));
  }

  try {
    const evaluationPromises = neighborhoods.map(async (neighborhood) => {
      const result = await evaluateNeighborhood({
        neighborhoodData: neighborhood.data,
        lifestylePreferences,
      });
      return {
        ...neighborhood,
        ...result,
      };
    });

    const evaluatedNeighborhoods = await Promise.all(evaluationPromises);
    
    // Sort by match score descending
    evaluatedNeighborhoods.sort((a, b) => b.matchScore - a.matchScore);

    return evaluatedNeighborhoods;
  } catch (error) {
    console.error("Error during neighborhood evaluation:", error);
    // In case of an AI error, return the base data with an error message.
    return neighborhoods.map(n => ({
        ...n, 
        matchScore: 0, 
        explanation: 'Sorry, we couldn\'t evaluate this neighborhood at the moment.'
    }));
  }
}
