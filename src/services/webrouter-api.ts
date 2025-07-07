
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
}

// A simple map to get axle count from vehicle type for the API
const vehicleToAxleMap: Record<z.infer<typeof vehicleTypeEnum>, number> = {
    CAR: 2,
    TRUCK: 3,
    BITREM: 7,
    CARRETA: 5,
    CARRETA_LS: 6,
    RODOTREM: 9,
    VANDERLEIA: 6,
    BITRUCK: 4,
    TOCO: 2,
    THREE_QUARTERS: 2,
    FIORINO: 2,
    VLC: 2,
};


export async function getRouteInfo(params: RouteInfoParams): Promise<{ distance: number; toll: number }> {
    const apiKey = process.env.ROUTER_API_KEY;
    if (!apiKey) {
        throw new Error("ROUTER_API_KEY is not set in environment variables.");
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
            eixos: vehicleToAxleMap[params.vehicleType] || 2
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

        // Assuming the API response has these fields based on a typical routing service.
        // This may need adjustment based on the actual API documentation.
        const distance = data.distancia_total_km || 0;
        const toll = data.custo_total_pedagio || 0;
        
        return { distance, toll };

    } catch (error) {
        console.error("Error calling Webrouter API:", error);
        // Fallback to avoid complete failure. Could also re-throw the error.
        return { distance: 0, toll: 0 };
    }
}
