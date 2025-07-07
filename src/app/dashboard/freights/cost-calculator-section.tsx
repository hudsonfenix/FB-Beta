
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Freight } from '@/lib/freight-data';
import { getOperationalCost } from '@/app/dashboard/cost-calculator/actions';
import type { CalculateOperationalCostOutput } from '@/ai/flows/calculate-operational-cost';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, Calculator, DollarSign, Route, HandCoins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fuelCostPerLiter: z.coerce
    .number()
    .min(0, 'Custo do combustível deve ser positivo.'),
  fuelConsumption: z.coerce
    .number()
    .min(0, 'Consumo de combustível deve ser positivo.'),
});

type FormData = z.infer<typeof formSchema>;

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


export function CostCalculatorSection({ freight }: { freight: Freight }) {
  const [result, setResult] = useState<CalculateOperationalCostOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fuelCostPerLiter: 5.8,
      fuelConsumption: 2.5,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setResult(null);

    const vehicleType = getVehicleEnum(freight.vehicle);

    const inputForApi = {
      ...values,
      origin: freight.origin,
      destination: freight.destination,
      vehicleType: vehicleType,
      // Assuming a default for cargo value, weight, and type for the calculation
      cargoValue: 100000, 
      cargoWeight: parseFloat(freight.details.weight) * 1000 || 25000,
      cargoType: freight.details.product,
    };

    try {
      const response = await getOperationalCost(inputForApi);
      setResult(response);
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

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="cost-calculator">
        <AccordionTrigger className="text-base font-semibold">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calcular Custo da Viagem
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Informe os dados do seu veículo para uma estimativa precisa
                usando a IA da FretesBrasil.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="fuelCostPerLiter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custo do Combustível por Litro (R$)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fuelConsumption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consumo de Combustível (km/l)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Calcular Custo
                  </Button>
                </form>
              </Form>
            </div>
            <div>
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
                  <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Aguarde, nossa IA está calculando...
                  </p>
                </div>
              )}
              {result && (
                <Card className="bg-card h-full">
                    <CardHeader>
                        <CardTitle className="text-xl">Análise de Custo</CardTitle>
                        <CardDescription>Resultado gerado por IA.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-muted">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm"><DollarSign className="h-4 w-4" /><span>Custo Operacional Estimado</span></div>
                            <p className="text-2xl font-bold">R$ {result.estimatedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
                 <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center">
                    <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">Pronto para calcular?</h3>
                    <p className="text-muted-foreground mt-1 text-sm">Preencha o formulário ao lado.</p>
                </div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
