"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getOperationalCost } from "./actions";
import type { CalculateOperationalCostOutput } from "@/ai/flows/calculate-operational-cost";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, DollarSign, Route, HandCoins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const vehicleTypeEnum = z.enum([
  'CAR', 'TRUCK', 'BITREM', 'CARRETA', 'CARRETA_LS', 'RODOTREM', 
  'VANDERLEIA', 'BITRUCK', 'TOCO', 'THREE_QUARTERS', 'FIORINO', 'VLC'
]);

const formSchema = z.object({
  origin: z.string().min(2, "Origem é obrigatória."),
  destination: z.string().min(2, "Destino é obrigatório."),
  vehicleType: vehicleTypeEnum,
  fuelCostPerLiter: z.coerce.number().min(0, "Custo do combustível deve ser positivo."),
  fuelConsumption: z.coerce.number().min(0, "Consumo de combustível deve ser positivo."),
  cargoValue: z.coerce.number().min(0, "Valor da carga deve ser positivo."),
  cargoWeight: z.coerce.number().min(0, "Peso da carga deve ser positivo."),
  cargoType: z.string().min(2, "Tipo de carga é obrigatório."),
});

type FormData = z.infer<typeof formSchema>;

export default function CostCalculatorPage() {
  const [result, setResult] = useState<CalculateOperationalCostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin: "São Paulo, SP",
      destination: "Rio de Janeiro, RJ",
      vehicleType: 'CARRETA',
      fuelCostPerLiter: 5.80,
      fuelConsumption: 2.5,
      cargoValue: 100000,
      cargoWeight: 25000,
      cargoType: "Eletrônicos"
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getOperationalCost(values);
      setResult(response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao calcular",
        description: "Houve um problema ao se comunicar com o serviço de IA. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Cálculo de Custo Operacional</h1>
        <p className="text-muted-foreground">Preencha os dados para obter uma estimativa de custo e análise de rentabilidade.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Viagem</CardTitle>
              <CardDescription>
                Você tem <span className="font-bold text-primary">29/30</span> cálculos restantes este mês.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="origin" render={({ field }) => (
                    <FormItem><FormLabel>Origem</FormLabel><FormControl><Input placeholder="Cidade, UF" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="destination" render={({ field }) => (
                    <FormItem><FormLabel>Destino</FormLabel><FormControl><Input placeholder="Cidade, UF" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="vehicleType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Veículo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Selecione o veículo" /></SelectTrigger></FormControl>
                        <SelectContent>{vehicleTypeEnum.options.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="fuelCostPerLiter" render={({ field }) => (
                    <FormItem><FormLabel>Custo do Combustível por Litro</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="fuelConsumption" render={({ field }) => (
                    <FormItem><FormLabel>Consumo de Combustível (km/l)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cargoValue" render={({ field }) => (
                    <FormItem><FormLabel>Valor da Carga (R$)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="cargoWeight" render={({ field }) => (
                    <FormItem><FormLabel>Peso da Carga (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="cargoType" render={({ field }) => (
                    <FormItem><FormLabel>Tipo da Carga</FormLabel><FormControl><Input placeholder="Ex: Grãos, Eletrônicos" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Calcular Custo
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
                <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aguarde, nossa IA está calculando os custos...</p>
            </div>
          )}
          {result && (
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Análise de Custo e Rentabilidade</CardTitle>
                <CardDescription>Resultado gerado pela IA da FretesBrasil.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                        <div className="flex items-center gap-2 text-muted-foreground"><DollarSign className="h-4 w-4" /><span>Custo Estimado</span></div>
                        <p className="text-3xl font-bold">R$ {result.estimatedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                     <div className="p-4 rounded-lg bg-muted">
                        <div className="flex items-center gap-2 text-muted-foreground"><Route className="h-4 w-4" /><span>Frete Mínimo (ANTT)</span></div>
                        <p className="text-3xl font-bold">R$ {result.minimumFreightValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
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
                <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Pronto para calcular?</h3>
                <p className="text-muted-foreground mt-2">Preencha o formulário ao lado para ver a mágica acontecer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
