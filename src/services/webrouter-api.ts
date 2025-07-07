
'use server';

import { z } from "zod";

const vehicleTypeEnum = z.enum([
  'CAR', 'TRUCK', 'BITREM', 'CARRETA', 'CARRETA_LS', 'RODOTREM', 
  'VANDERLEIA', 'BITRUCK', 'TOCO', 'THREE_QUARTERS', 'FIORINO', 'VLC'
]);

type RouteInfoParams = {
    origin: string;
    destination: string;
    vehicleType: z.infer<typeof vehicleTypeEnum>;
    axles: number;
}

export async function getRouteInfo(params: RouteInfoParams): Promise<{ distance: number; toll: number }> {
    const apiKey = process.env.ROUTER_API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        console.error("ROUTER_API_KEY is not set in environment variables.");
        throw new Error("A chave da API (ROUTER_API_KEY) não está configurada no arquivo .env.");
    }

    const apiUrl = 'https://lway.webrouter.com.br/RouterService/router/api/calcular';
    
    const requestBody = {
        token: apiKey,
        origem: {
            endereco: params.origin
        },
        destino: {
            endereco: params.destination
        },
        veiculo: {
            tipo: params.vehicleType,
            eixos: params.axles
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
            throw new Error(`Failed to fetch route info. Status: ${response.status}`);
        }

        const data = await response.json();
        
        const distance = data.distancia_total_km || 0;
        const toll = data.custo_total_pedagio || 0;
        
        return { distance, toll };

    } catch (error) {
        console.error("Error calling Webrouter API:", error);
        // Re-throw the error so it can be handled by the caller.
        throw new Error('Failed to communicate with Webrouter API.');
    }
}
