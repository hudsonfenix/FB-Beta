
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

function getMockData(params: RouteInfoParams): { distance: number; toll: number } {
    console.warn("**********************************************************************************");
    console.warn("AVISO: Usando dados de exemplo para o cálculo da rota.");
    console.warn("Verifique a configuração da chave da API (ROUTER_API_KEY) ou a conexão/resposta da API.");
    console.warn("**********************************************************************************");

    // Retorna dados de exemplo para fins de demonstração
    const mockDistance = Math.floor(Math.random() * (2000 - 200 + 1)) + 200;
    const mockToll = (mockDistance * 0.12) + (params.axles * 11.5);
    return { 
        distance: parseFloat(mockDistance.toFixed(2)), 
        toll: parseFloat(mockToll.toFixed(2)) 
    };
}


export async function getRouteInfo(params: RouteInfoParams): Promise<{ distance: number; toll: number }> {
    const apiKey = process.env.ROUTER_API_KEY;

    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
        return getMockData(params);
    }

    const apiUrl = 'https://way.webrouter.com.br/RouterService/router/api/calcular';
    
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

        const data = await response.json();

        if (!response.ok || data.status === 'ERRO') {
            const errorMessage = data.mensagem_retorno || `Erro na API: ${response.statusText}`;
            console.error("Erro da API Webrouter:", errorMessage);
            return getMockData(params);
        }
        
        const distance = data.distancia_total_km || 0;
        const toll = data.custo_total_pedagio || 0;

        // Fallback para dados de exemplo se a API não encontrar a rota
        if (distance === 0) {
            console.warn("A API retornou uma distância zerada, provavelmente a rota não foi encontrada.");
            return getMockData(params);
        }
        
        return { distance, toll };

    } catch (error) {
        console.error("Falha ao chamar a API Webrouter:", error);
        return getMockData(params);
    }
}
