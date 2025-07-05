'use server';

/**
 * @fileOverview This file defines a Genkit flow for calculating the estimated operational cost for freight.
 *
 * - calculateOperationalCost - A function that handles the calculation process.
 * - CalculateOperationalCostInput - The input type for the calculateOperationalCost function.
 * - CalculateOperationalCostOutput - The return type for the calculateOperationalCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalculateOperationalCostInputSchema = z.object({
  origin: z.string().describe('The origin location of the freight.'),
  destination: z.string().describe('The destination location of the freight.'),
  vehicleType: z.enum([
    'CAR',
    'TRUCK',
    'BITREM',
    'CARRETA',
    'CARRETA_LS',
    'RODOTREM',
    'VANDERLEIA',
    'BITRUCK',
    'TOCO',
    'THREE_QUARTERS',
    'FIORINO',
    'VLC',
  ]).describe('The type of vehicle used for the freight.'),
  tollCostPerAxle: z.number().describe('The toll cost per axle.'),
  fuelCostPerLiter: z.number().describe('The cost of fuel per liter.'),
  fuelConsumption: z.number().describe('The fuel consumption rate (e.g., liters per kilometer).'),
  cargoValue: z.number().describe('The declared value of the cargo.'),
  cargoWeight: z.number().describe('The weight of the cargo in kilograms.'),
  cargoType: z.string().describe('The type of cargo being transported.'),
});
export type CalculateOperationalCostInput = z.infer<typeof CalculateOperationalCostInputSchema>;

const CalculateOperationalCostOutputSchema = z.object({
  estimatedCost: z.number().describe('The estimated operational cost for the freight.'),
  minimumFreightValue: z
    .number()
    .describe('The minimum freight value based on ANTT tables (if applicable).'),
  profitabilityAnalysis: z.string().describe('An analysis of the freight profitability.'),
});
export type CalculateOperationalCostOutput = z.infer<typeof CalculateOperationalCostOutputSchema>;

export async function calculateOperationalCost(
  input: CalculateOperationalCostInput
): Promise<CalculateOperationalCostOutput> {
  return calculateOperationalCostFlow(input);
}

const calculateOperationalCostPrompt = ai.definePrompt({
  name: 'calculateOperationalCostPrompt',
  input: {schema: CalculateOperationalCostInputSchema},
  output: {schema: CalculateOperationalCostOutputSchema},
  prompt: `You are an expert in logistics and freight cost calculation.

  Given the following information, calculate the estimated operational cost for the freight and provide a profitability analysis.  Also, if possible, provide the minimum freight value based on ANTT tables (provide 0 if not available).

  Origin: {{{origin}}}
  Destination: {{{destination}}}
  Vehicle Type: {{{vehicleType}}}
  Toll Cost per Axle: {{{tollCostPerAxle}}}
  Fuel Cost per Liter: {{{fuelCostPerLiter}}}
  Fuel Consumption: {{{fuelConsumption}}}
  Cargo Value: {{{cargoValue}}}
  Cargo Weight: {{{cargoWeight}}}
  Cargo Type: {{{cargoType}}}

  Respond with JSON format.`,
});

const calculateOperationalCostFlow = ai.defineFlow(
  {
    name: 'calculateOperationalCostFlow',
    inputSchema: CalculateOperationalCostInputSchema,
    outputSchema: CalculateOperationalCostOutputSchema,
  },
  async input => {
    const {output} = await calculateOperationalCostPrompt(input);
    return output!;
  }
);
