"use client";

import { useState } from "react";
import { getOperationalCost } from "./actions";
import type { CalculateOperationalCostOutput } from "@/ai/flows/calculate-operational-cost";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wand2, DollarSign, Route, HandCoins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RouteCalculatorModal } from "@/components/route-calculator-modal";

export default function CostCalculatorPage() {
  const [result, setResult] = useState<CalculateOperationalCostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  async function handleCalculate(values: any) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await getOperationalCost(values);
      setResult(response);
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao calcular",
        description: error instanceof Error ? error.message : "Houve um problema ao se comunicar com o serviço de IA. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <RouteCalculatorModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCalculate={handleCalculate}
        isLoading={isLoading}
      />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Calculadora de Rotas</h1>
          <p className="text-muted-foreground">Crie e analise suas rotas para otimizar os custos.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Wand2 className="mr-2 h-4 w-4" />
          Criar Nova Rota
        </Button>
      </div>
      
      <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64 rounded-lg border border-dashed p-8 text-center animate-pulse">
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
                        <div className="flex items-center gap-2 text-muted-foreground"><DollarSign className="h-4 w-4" /><span>Custo Operacional Total</span></div>
                        <p className="text-3xl font-bold">R$ {result.totalOperationalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
            <div className="flex flex-col items-center justify-center h-64 rounded-lg border border-dashed p-8 text-center">
                <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Nenhuma rota calculada</h3>
                <p className="text-muted-foreground mt-2">Clique em "Criar Nova Rota" para começar.</p>
            </div>
          )}
        </div>
    </div>
  );
}
