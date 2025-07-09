'use server';
/**
 * @fileOverview Generates a user profile avatar using AI.
 *
 * - generateAvatar - A function that creates a unique avatar image.
 * - GenerateAvatarOutput - The return type for the generateAvatar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// No input schema needed for a random avatar
const GenerateAvatarOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI."),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

export async function generateAvatar(): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow();
}

const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    inputSchema: z.void(),
    outputSchema: GenerateAvatarOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: 'A simple, abstract, gender-neutral, minimalist geometric avatar icon for a user profile. Clean, modern design on a soft pastel background.',
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to return a data URI.');
    }

    return { imageDataUri: media.url };
  }
);
