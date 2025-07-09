// src/ai/flows/evaluate-neighborhood.ts
'use server';
/**
 * @fileOverview Evaluates neighborhood data based on user lifestyle preferences using AI.
 *
 * - evaluateNeighborhood - A function that evaluates neighborhood data.
 * - EvaluateNeighborhoodInput - The input type for the evaluateNeighborhood function.
 * - EvaluateNeighborhoodOutput - The return type for the evaluateNeighborhood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateNeighborhoodInputSchema = z.object({
  neighborhoodData: z.string().describe('Data representing the neighborhood characteristics.'),
  lifestylePreferences: z.string().describe('User-defined lifestyle preferences (e.g., access to parks, good schools, walkability).'),
});
export type EvaluateNeighborhoodInput = z.infer<typeof EvaluateNeighborhoodInputSchema>;

const EvaluateNeighborhoodOutputSchema = z.object({
  matchScore: z.number().describe('A score indicating how well the neighborhood aligns with the user preferences.'),
  explanation: z.string().describe('Explanation of why the neighborhood received that score.'),
});
export type EvaluateNeighborhoodOutput = z.infer<typeof EvaluateNeighborhoodOutputSchema>;

export async function evaluateNeighborhood(input: EvaluateNeighborhoodInput): Promise<EvaluateNeighborhoodOutput> {
  return evaluateNeighborhoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateNeighborhoodPrompt',
  input: {schema: EvaluateNeighborhoodInputSchema},
  output: {schema: EvaluateNeighborhoodOutputSchema},
  prompt: `You are an AI assistant that evaluates neighborhood data based on user-defined lifestyle preferences and provides a match score and explanation.

  Neighborhood Data: {{{neighborhoodData}}}
  Lifestyle Preferences: {{{lifestylePreferences}}}

  Based on the neighborhood data and lifestyle preferences, provide a match score (0-100) indicating how well the neighborhood aligns with the user preferences and give an explanation. Return the score as a number, and the explanation as a string.
`,
});

const evaluateNeighborhoodFlow = ai.defineFlow(
  {
    name: 'evaluateNeighborhoodFlow',
    inputSchema: EvaluateNeighborhoodInputSchema,
    outputSchema: EvaluateNeighborhoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
