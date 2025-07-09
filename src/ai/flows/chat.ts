'use server';
/**
 * @fileOverview A conversational AI flow for the chatbot.
 *
 * - chat - A function to handle chat conversations.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { neighborhoods } from '@/lib/neighborhood-data';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message to the chatbot."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const neighborhoodDataString = neighborhoods.map(n => `Name: ${n.name}, City: ${n.city}, Data: ${n.data}`).join('\n\n');

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `You are a helpful AI assistant for NextHood, a platform to help people find neighborhoods in India.
  Your goal is to answer user questions about neighborhoods or the app itself.
  Be friendly and conversational.
  If a user asks how to get in touch or contact support, direct them to the "Contact Us" page.
  Use the following neighborhood data to answer questions about specific locations:
  ---
  ${neighborhoodDataString}
  ---
  
  Conversation History:
  {{#each history}}
  {{this.role}}: {{this.content}}
  {{/each}}

  User's new message: {{{message}}}
  
  Your response:
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return { response: output!.response };
  }
);
