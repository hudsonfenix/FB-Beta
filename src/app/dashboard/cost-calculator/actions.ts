"use server";

import {
  calculateOperationalCost,
  type CalculateOperationalCostInput,
  type CalculateOperationalCostOutput,
} from "@/ai/flows/calculate-operational-cost";

export async function getOperationalCost(
  input: CalculateOperationalCostInput
): Promise<CalculateOperationalCostOutput> {
  try {
    const result = await calculateOperationalCost(input);
    return result;
  } catch (error) {
    console.error("Error calculating operational cost:", error);
    throw new Error("Failed to calculate operational cost.");
  }
}
