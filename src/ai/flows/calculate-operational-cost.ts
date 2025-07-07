
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
  freightValue: z.number().describe('The price offered for the freight.'),
});
export type CalculateOperationalCostInput = z.infer<typeof CalculateOperationalCostInputSchema>;

const CalculateOperationalCostOutputSchema = z.object({
  totalOperationalCost: z.number().describe('The total operational cost for the freight (fuel + tolls).'),
  minimumFreightValue: z.number().describe('The minimum freight value based on ANTT tables.'),
  profitabilityAnalysis: z.string().describe('An analysis of the freight profitability in Portuguese.'),
  fuelCost: z.number().describe('The total cost of fuel for the route.'),
  distance: z.number().describe('The total distance in kilometers.'),
  tollCost: z.number().describe('The total cost of tolls for the route.'),
});
export type CalculateOperationalCostOutput = z.infer<typeof CalculateOperationalCostOutputSchema>;


export async function calculateOperationalCost(
  input: CalculateOperationalCostInput
): Promise<CalculateOperationalCostOutput> {
  return calculateOperationalCostFlow(input);
}

const PromptInputSchema = CalculateOperationalCostInputSchema.extend({
  distance: z.number().describe('The total distance in kilometers for the route.'),
  tollCost: z.number().describe('The total toll cost for the route.'),
});

const PromptOutputSchema = z.object({
  totalOperationalCost: z.number().describe('The total operational cost for the freight (fuel + tolls).'),
  minimumFreightValue: z.number().describe('The minimum freight value based on ANTT tables.'),
  profitabilityAnalysis: z.string().describe('An analysis of the freight profitability in Portuguese.'),
  fuelCost: z.number().describe('The total cost of fuel for the route.'),
});


const calculateOperationalCostPrompt = ai.definePrompt({
  name: 'calculateOperationalCostPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: PromptOutputSchema},
  prompt: `Você é um especialista em logística e cálculo de custos de frete no Brasil. Suas respostas devem ser em português.

Sua tarefa é fornecer uma análise detalhada de custos operacionais para uma viagem de frete, com base nos dados fornecidos.

Dados da Rota (já calculados):
- Distância: {{{distance}}} km
- Custo de Pedágio: R$ {{{tollCost}}}

Dados do Usuário:
- Origem: {{{origin}}}
- Destino: {{{destination}}}
- Tipo de Veículo: {{{vehicleType}}}
- Número de Eixos: {{{axleCount}}}
- Custo do Combustível por Litro: R$ {{{fuelCostPerLiter}}}
- Consumo de Combustível (km/l): {{{fuelConsumption}}}
- Tipo de Carga: {{{cargoType}}}
- Valor do Frete Oferecido: R$ {{{freightValue}}}

Siga estes passos:
1.  **Calcular Custo do Combustível**: Use a fórmula: \`(distance / fuelConsumption) * fuelCostPerLiter\`.
2.  **Calcular Custo Operacional Total**: Some o Custo de Pedágio (dado fornecido) com o Custo de Combustível que você calculou.
3.  **Calcular Piso Mínimo de Frete (ANTT)**:
    *   Use a distância e o número de eixos fornecidos.
    *   Consulte a tabela simplificada abaixo para encontrar o 'Custo de Deslocamento (R$/km)' e 'Custo de Carga/Descarga (R$)'.
    *   A fórmula é: \`(distance * "Custo de Deslocamento") + "Custo de Carga/Descarga"\`.
    *   Para a 'Tipo de Carga', use 'Granel Sólido' se o produto for grãos, fertilizantes, etc. Use 'Frigorificada' para cargas refrigeradas. Para todos os outros, use 'Carga Geral'.
    *   Se o número exato de eixos não estiver na tabela para o tipo de carga, use a linha com o número de eixos mais próximo e menor.

    **Tabela Simplificada de Piso Mínimo de Frete (Valores Hipotéticos):**
    | Tipo de Carga   | Eixos | Custo de Deslocamento (R$/km) | Custo de Carga/Descarga (R$) |
    |-----------------|-------|-------------------------------|------------------------------|
    | Carga Geral     | 2     | 2.55                          | 150.00                       |
    | Carga Geral     | 3     | 3.10                          | 180.00                       |
    | Carga Geral     | 5     | 4.20                          | 240.00                       |
    | Carga Geral     | 6     | 4.75                          | 270.00                       |
    | Carga Geral     | 7     | 5.30                          | 300.00                       |
    | Carga Geral     | 9     | 6.40                          | 360.00                       |
    | Granel Sólido   | 5     | 3.80                          | 220.00                       |
    | Granel Sólido   | 7     | 4.85                          | 280.00                       |
    | Granel Sólido   | 9     | 5.90                          | 340.00                       |
    | Frigorificada   | 6     | 5.10                          | 350.00                       |

4.  **Análise de Rentabilidade**:
    *   Forneça uma análise concisa em português.
    *   Compare o 'Valor do Frete Oferecido' com o 'Custo Operacional Total' para determinar a margem bruta.
    *   Indique se o valor oferecido está acima ou abaixo do 'Piso Mínimo de Frete (ANTT)'.
    *   Exemplo: "Com um custo operacional de R$ X e um frete de R$ Y, a margem bruta é de R$ Z. O valor está {acima/abaixo} do piso mínimo da ANTT, sugerindo uma viagem {rentável/não rentável}."

Responda no formato JSON.`,
});

const calculateOperationalCostFlow = ai.defineFlow(
  {
    name: 'calculateOperationalCostFlow',
    inputSchema: CalculateOperationalCostInputSchema,
    outputSchema: CalculateOperationalCostOutputSchema,
  },
  async (input) => {
    // 1. Call the tool to get route info
    const routeInfo = await getRouteInfo({
      origin: input.origin,
      destination: input.destination,
      vehicleType: input.vehicleType,
      axles: input.axleCount,
    });

    // 2. Prepare the input for the prompt, including the fetched data
    const promptInput = {
      ...input,
      distance: routeInfo.distance,
      tollCost: routeInfo.toll,
    };

    // 3. Call the prompt, which now has all the data it needs
    const { output: aiResult } = await calculateOperationalCostPrompt(promptInput);

    if (!aiResult) {
      throw new Error('AI failed to generate cost analysis.');
    }
    
    // 4. Combine the AI result with the direct data and return
    return {
      totalOperationalCost: aiResult.totalOperationalCost,
      minimumFreightValue: aiResult.minimumFreightValue,
      profitabilityAnalysis: aiResult.profitabilityAnalysis,
      fuelCost: aiResult.fuelCost,
      distance: routeInfo.distance,
      tollCost: routeInfo.toll,
    };
  }
);
