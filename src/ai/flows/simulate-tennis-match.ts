'use server';

/**
 * @fileOverview Simulates a tennis match between two players using generative AI.
 *
 * - simulateTennisMatch - A function that simulates the tennis match.
 * - SimulateTennisMatchInput - The input type for the simulateTennisMatch function.
 * - SimulateTennisMatchOutput - The return type for the simulateTennisMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateTennisMatchInputSchema = z.object({
  player1Name: z.string().describe('The name of the first tennis player.'),
  player1Ranking: z.number().describe('The ranking of the first tennis player.'),
  player2Name: z.string().describe('The name of the second tennis player.'),
  player2Ranking: z.number().describe('The ranking of the second tennis player.'),
  player1HistoricalData: z
    .string()
    .describe('Historical match data for player 1.'),
  player2HistoricalData: z
    .string()
    .describe('Historical match data for player 2.'),
  player1CurrentForm: z.string().describe('Current form information for player 1.'),
  player2CurrentForm: z.string().describe('Current form information for player 2.'),
  player1PlayingStyle: z.string().describe('Playing style description for player 1.'),
  player2PlayingStyle: z.string().describe('Playing style description for player 2.'),
});
export type SimulateTennisMatchInput = z.infer<typeof SimulateTennisMatchInputSchema>;

const SimulateTennisMatchOutputSchema = z.object({
  predictedWinner: z
    .string()
    .describe('The name of the player predicted to win the match.'),
  matchSummary: z
    .string()
    .describe(
      'A summary of the key factors influencing the match outcome, including player strengths and weaknesses, and how the match unfolded.'
    ),
});
export type SimulateTennisMatchOutput = z.infer<typeof SimulateTennisMatchOutputSchema>;

export async function simulateTennisMatch(
  input: SimulateTennisMatchInput
): Promise<SimulateTennisMatchOutput> {
  return simulateTennisMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateTennisMatchPrompt',
  input: {schema: SimulateTennisMatchInputSchema},
  output: {schema: SimulateTennisMatchOutputSchema},
  prompt: `You are an expert tennis match predictor. Analyze the provided information about two tennis players and predict the winner of their match.

Player 1 Name: {{{player1Name}}}
Player 1 Ranking: {{{player1Ranking}}}
Player 1 Historical Data: {{{player1HistoricalData}}}
Player 1 Current Form: {{{player1CurrentForm}}}
Player 1 Playing Style: {{{player1PlayingStyle}}}

Player 2 Name: {{{player2Name}}}
Player 2 Ranking: {{{player2Ranking}}}
Player 2 Historical Data: {{{player2HistoricalData}}}
Player 2 Current Form: {{{player2CurrentForm}}}
Player 2 Playing Style: {{{player2PlayingStyle}}}

Consider all factors, including player rankings, historical performance, current form, and playing styles, to determine the most likely winner. Provide a detailed summary of the key factors that influenced your prediction.

Predicted Winner: 
Match Summary: `,
});

const simulateTennisMatchFlow = ai.defineFlow(
  {
    name: 'simulateTennisMatchFlow',
    inputSchema: SimulateTennisMatchInputSchema,
    outputSchema: SimulateTennisMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
