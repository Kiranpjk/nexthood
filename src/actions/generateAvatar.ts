'use server';

import { generateAvatar as generateAvatarFlow } from '@/ai/flows/generate-avatar';

export async function generateAvatarAction(): Promise<string> {
  try {
    const result = await generateAvatarFlow();
    return result.imageDataUri;
  } catch (error) {
    console.error("Error generating avatar:", error);
    throw new Error("Sorry, we couldn't create an avatar right now. Please try again later.");
  }
}
