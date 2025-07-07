
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
import { getRouteInfo } from '@/services/webrouter-api';

const vehicleTypeEnum = z.enum([
  'CAR', 'TRUCK', 'BITREM', 'CARRETA', 'CARRETA_LS', 'RODOTREM', 
  'VANDERLEIA', 'BITRUCK', 'TOCO', 'THREE_QUARTERS', 'FIORINO', 'VLC'
]);

const CalculateOperationalCostInputSchema = z.object({
  origin: z.string().describe('The origin location of the freight.'),
  destination: z.string().describe('The destination location of the freight.'),
  vehicleType: vehicleTypeEnum.describe('The type of vehicle used for the freight.'),
  axleCount: z.number().describe('The number of axles on the vehicle.'),
  fuelCostPerLiter: z.number().describe('The cost of fuel per liter.'),
  fuelConsumption: z.number().describe('The fuel consumption rate (e.g., kilometers per liter).'),
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

const getRouteInfoTool = ai.defineTool(
  {
    name: 'getRouteInfo',
    description: 'Get distance in kilometers and total toll cost for a route.',
    inputSchema: z.object({
      origin: z.string(),
      destination: z.string(),
      vehicleType: vehicleTypeEnum,
      axleCount: z.number(),
    }),
    outputSchema: z.object({
      distance: z.number(),
      toll: z.number(),
    }),
  },
  async (input) => getRouteInfo({ ...input, axles: input.axleCount })
);


const calculateOperationalCostPrompt = ai.definePrompt({
  name: 'calculateOperationalCostPrompt',
  input: {schema: CalculateOperationalCostInputSchema},
  output: {schema: CalculateOperationalCostOutputSchema},
  tools: [getRouteInfoTool],
  prompt: `You are an expert in logistics and freight cost calculation.

  Your task is to provide a detailed operational cost analysis for a freight trip.

  1.  First, you **MUST** use the 'getRouteInfo' tool to obtain the exact distance (in km) and total toll cost for the trip between the given origin and destination for the specified vehicle type and axle count.
  2.  Once you have the distance and toll cost from the tool, calculate the total fuel cost. The formula is: \`(distance / fuelConsumption) * fuelCostPerLiter\`.
  3.  The total estimated operational cost is the sum of the total fuel cost and the total toll cost.
  4.  Provide a profitability analysis based on the calculated operational cost against the cargo value.
  5.  Finally, estimate the minimum freight value based on ANTT tables. If you cannot determine this, set it to 0.

  User-provided data:
  Origin: {{{origin}}}
  Destination: {{{destination}}}
  Vehicle Type: {{{vehicleType}}}
  Axle Count: {{{axleCount}}}
  Fuel Cost per Liter: {{{fuelCostPerLiter}}}
  Fuel Consumption (km/l): {{{fuelConsumption}}}
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
