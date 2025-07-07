
'use client';

import { useState } from 'react';
import type { Freight } from '@/lib/freight-data';
import { getOperationalCost } from '@/app/dashboard/cost-calculator/actions';
import type { CalculateOperationalCostOutput } from '@/ai/flows/calculate-operational-cost';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
    Loader2, Wand2, Calculator, DollarSign, Route, HandCoins, Fuel,
    GitCommitHorizontal, Ticket, FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RouteCalculatorModal } from '@/components/route-calculator-modal';

// Helper to map detailed vehicle string to the enum expected by the AI
const getVehicleEnum = (vehicleString: string) => {
    const upperVehicle = vehicleString.toUpperCase();
    if (upperVehicle.includes('CARRETA LS')) return 'CARRETA_LS';
    if (upperVehicle.includes('CARRETA')) return 'CARRETA';
    if (upperVehicle.includes('BITREM')) return 'BITREM';
    if (upperVehicle.includes('RODOTREM')) return 'RODOTREM';
    if (upperVehicle.includes('VANDERLEIA')) return 'VANDERLEIA';
    if (upperVehicle.includes('BITRUCK')) return 'BITRUCK';
    if (upperVehicle.includes('TRUCK')) return 'TRUCK';
    if (upperVehicle.includes('TOCO')) return 'TOCO';
    if (upperVehicle.includes('3/4') || upperVehicle.includes('THREE_QUARTERS')) return 'THREE_QUARTERS';
    if (upperVehicle.includes('FIORINO')) return 'FIORINO';
    if (upperVehicle.includes('VLC')) return 'VLC';
    return 'CARRETA'; // Default fallback
};

const vehicleToAxleMap: Record<string, number> = {
    CAR: 2, TRUCK: 3, BITREM: 7, CARRETA: 5, CARRETA_LS: 6, RODOTREM: 9, 
    VANDERLEIA: 6, BITRUCK: 4, TOCO: 2, THREE_QUARTERS: 2, FIORINO: 2, VLC: 2
};

const ResultDetailItem = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
  <div className="p-4 rounded-lg bg-muted flex items-start gap-3">
    <div className="text-muted-foreground mt-1">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);


export function CostCalculatorSection({ freight }: { freight: Freight }) {
  const [result, setResult] = useState<CalculateOperationalCostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastFreightValue, setLastFreightValue] = useState<number | null>(null);
  const { toast } = useToast();

  const parseFreightPrice = (price: string, weight: string): number => {
    if (!price) return 0;
    
    // R$ 210,00 P/ TON
    if (price.toLowerCase().includes('p/ ton')) {
      const pricePerTonMatch = price.match(/[\d.,]+/);
      const weightMatch = weight.match(/[\d.,]+/);
      if (pricePerTonMatch && weightMatch) {
        const pricePerTon = parseFloat(pricePerTonMatch[0].replace(/\./g, '').replace(',', '.'));
        const weightInTons = parseFloat(weightMatch[0].replace(',', '.'));
        return pricePerTon * weightInTons;
      }
    }

    // R$ 1.800,00
    const standardPriceMatch = price.match(/[\d.,]+/);
    if (standardPriceMatch) {
      return parseFloat(standardPriceMatch[0].replace(/\./g, '').replace(',', '.'));
    }
    
    return 0;
  };

  async function handleCalculate(values: any) {
    setIsLoading(true);
    setResult(null);

    const freightValue = parseFreightPrice(freight.price, freight.details.weight);
    setLastFreightValue(freightValue);

    const inputForApi = {
      ...values,
      origin: freight.origin,
      destination: freight.destination,
      cargoValue: 100000, 
      cargoWeight: parseFloat(freight.details.weight) * 1000 || 25000,
      cargoType: freight.details.product,
      freightValue: freightValue,
    };

    try {
      const response = await getOperationalCost(inputForApi);
      setResult(response);
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao calcular',
        description:
          'Houve um problema ao se comunicar com o serviço de IA. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const vehicleEnum = getVehicleEnum(freight.vehicle);
  const axleCount = vehicleToAxleMap[vehicleEnum] || 5;

  const initialModalData = {
    originCity: freight.origin,
    destinationCity: freight.destination,
    vehicleType: vehicleEnum,
    axleCount: axleCount
  };

  return (
    <>
      <RouteCalculatorModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCalculate={handleCalculate}
        isLoading={isLoading}
        initialData={initialModalData}
      />
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="cost-calculator">
          <AccordionTrigger className="text-base font-semibold">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Calcular Custo da Viagem
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
              {isLoading && (
                 <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
                    <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                        Aguarde, nossa IA está calculando...
                    </p>
                 </div>
              )}
              {result && (
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="text-xl">Análise de Custo e Rentabilidade</CardTitle>
                        <CardDescription>Resultado gerado pela IA da FretesBrasil.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ResultDetailItem label="Valor do Frete" value={`R$ ${(lastFreightValue ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={<FileText className="h-5 w-5" />} />
                            <ResultDetailItem label="Distância Total" value={`${result.distance.toLocaleString('pt-BR')} km`} icon={<GitCommitHorizontal className="h-5 w-5" />} />
                            <ResultDetailItem label="Custo de Pedágio" value={`R$ ${result.tollCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={<Ticket className="h-5 w-5" />} />
                            <ResultDetailItem label="Custo de Combustível" value={`R$ ${result.fuelCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={<Fuel className="h-5 w-5" />} />
                            <ResultDetailItem label="Custo Operacional Total" value={`R$ ${result.totalOperationalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={<DollarSign className="h-5 w-5" />} />
                            <ResultDetailItem label="Piso Mínimo de Frete" value={`R$ ${result.minimumFreightValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} icon={<Route className="h-5 w-5" />} />
                        </div>
                        <Alert>
                            <HandCoins className="h-4 w-4" />
                            <AlertTitle>Análise de Rentabilidade</AlertTitle>
                            <AlertDescription>{result.profitabilityAnalysis}</AlertDescription>
                        </Alert>
                    </CardContent>
                     <CardFooter>
                        <p className="text-xs text-muted-foreground">Esta é uma estimativa. Os valores reais podem variar.</p>
                    </CardFooter>
                </Card>
              )}

             {!isLoading && !result && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">Pronto para calcular?</h3>
                    <p className="text-muted-foreground mt-1 text-sm mb-4">
                        Clique no botão para uma análise de custo detalhada.
                    </p>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Abrir Calculadora Detalhada
                    </Button>
                </div>
              )}

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
