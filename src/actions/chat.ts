'use server';

import { chat } from '@/ai/flows/chat';
import type { ChatInput } from '@/ai/flows/chat';

export async function sendMessage(input: ChatInput) {
  try {
    const result = await chat(input);
    return result.response;
  } catch (error) {
    console.error("Error in chat action:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
}
