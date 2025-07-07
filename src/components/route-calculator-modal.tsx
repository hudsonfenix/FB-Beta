
'use client'

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

import {
  Edit2, Calendar as CalendarIcon, Clock, Home, MapPin, Plus, Trash2, Fuel, GitCommitHorizontal,
  Car, Truck, Tractor, BusFront, Wand2, Loader2, Compass, Upload, Download, FileText, Link2
} from 'lucide-react';

const BrazilFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1000 700" className="h-5 w-5 rounded-sm">
    <rect width="1000" height="700" fill="#009c3b"/>
    <path d="M500 85L890 350L500 615L110 350L500 85Z" fill="#ffcc29"/>
    <circle cx="500" cy="350" r="175" fill="#0033a0"/>
  </svg>
);

const vehicleTypeEnum = z.enum([
  'CAR', 'TRUCK', 'BITREM', 'CARRETA', 'CARRETA_LS', 'RODOTREM',
  'VANDERLEIA', 'BITRUCK', 'TOCO', 'THREE_QUARTERS', 'FIORINO', 'VLC'
]);

const formSchema = z.object({
  originCity: z.string().min(1, "Cidade de origem é obrigatória"),
  originAddress: z.string().optional(),
  destinationCity: z.string().min(1, "Cidade de destino é obrigatória"),
  destinationAddress: z.string().optional(),
  fuelCostPerLiter: z.coerce.number().min(0).default(5.80),
  fuelConsumption: z.coerce.number().min(0).default(2.5),
  vehicleType: vehicleTypeEnum.default('CARRETA'),
  // Add other fields from the UI that need validation
});

type FormData = z.infer<typeof formSchema>;

interface RouteCalculatorModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCalculate: (data: any) => void;
  isLoading: boolean;
}

export function RouteCalculatorModal({ isOpen, onOpenChange, onCalculate, isLoading }: RouteCalculatorModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originCity: "São Paulo, SP",
      destinationCity: "Rio de Janeiro, RJ",
      vehicleType: 'CARRETA',
      fuelCostPerLiter: 5.80,
      fuelConsumption: 2.5,
    },
  });

  const onSubmit = (values: FormData) => {
    // Map form data to the structure expected by the action
    const apiInput = {
      origin: `${values.originCity}${values.originAddress ? ', ' + values.originAddress : ''}`,
      destination: `${values.destinationCity}${values.destinationAddress ? ', ' + values.destinationAddress : ''}`,
      vehicleType: values.vehicleType,
      fuelCostPerLiter: values.fuelCostPerLiter,
      fuelConsumption: values.fuelConsumption,
      // Default values for fields not in this form
      cargoValue: 100000,
      cargoWeight: 25000,
      cargoType: "Carga Geral",
    };
    onCalculate(apiInput);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl p-0">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="w-2/3 border-r p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base">
                  <Edit2 className="h-5 w-5" /> Criar Rota
                </DialogTitle>
              </DialogHeader>

              <div className="bg-muted/50 p-2 rounded-md flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className={cn("gap-2", !currentDate && "text-muted-foreground")}>
                        <CalendarIcon /> {currentDate ? format(currentDate, "dd/MM/yyyy") : <span>Selecione a data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentDate} onSelect={(date) => date && setCurrentDate(date)} initialFocus /></PopoverContent>
                  </Popover>
                  <div className="flex items-center gap-2"><Clock />{format(currentDate, "HH:mm")}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" type="button"><Clock className="h-4 w-4" />Minhas Rotas</Button>
                  <Button variant="ghost" size="sm" type="button"><Compass className="h-4 w-4" />CEP</Button>
                  <Button variant="ghost" size="sm" type="button"><Upload className="h-4 w-4" />Importar Coordenadas</Button>
                  <Button variant="ghost" size="sm" type="button"><FileText className="h-4 w-4" />Importar CTE</Button>
                  <Button variant="ghost" size="icon" type="button" className="h-8 w-8"><Link2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" type="button" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* Origin / Destination */}
              <div className="space-y-4">
                <LocationInput icon={<Home />} label="Origem" cityFieldName="originCity" addressFieldName="originAddress" form={form} />
                <LocationInput icon={<MapPin />} label="Destino" cityFieldName="destinationCity" addressFieldName="destinationAddress" form={form} />
                <Button variant="link" type="button" className="p-0 h-auto text-primary"><Plus className="h-4 w-4 mr-1" />Adicionar destino</Button>
              </div>

              <Separator />

              <div className="flex items-end justify-between gap-4">
                <div className="flex gap-4">
                  <FormField control={form.control} name="fuelCostPerLiter" render={({ field }) => (
                    <div className="flex items-center gap-2 rounded-full border bg-muted/30 p-2">
                      <Fuel className="text-muted-foreground" />
                      <div className="pr-2">
                        <Label className="text-xs">Combustível</Label>
                        <Input type="number" step="0.01" {...field} className="h-auto p-0 border-0 bg-transparent text-base font-semibold focus-visible:ring-0" />
                      </div>
                      <span className="text-sm text-muted-foreground">R$</span>
                    </div>
                  )} />
                   <FormField control={form.control} name="fuelConsumption" render={({ field }) => (
                    <div className="flex items-center gap-2 rounded-full border bg-muted/30 p-2">
                      <Wand2 className="text-muted-foreground" />
                       <div className="pr-2">
                        <Label className="text-xs">Consumo</Label>
                        <Input type="number" step="0.1" {...field} className="h-auto p-0 border-0 bg-transparent text-base font-semibold focus-visible:ring-0" />
                      </div>
                      <span className="text-sm text-muted-foreground">KM/L</span>
                    </div>
                  )} />
                   <div className="flex items-center gap-2 rounded-full border bg-muted/30 p-2">
                      <GitCommitHorizontal className="text-muted-foreground" />
                       <div className="pr-2">
                        <Label className="text-xs">Eixos</Label>
                        <Input type="number" defaultValue="5" className="h-auto p-0 border-0 bg-transparent text-base font-semibold focus-visible:ring-0" />
                      </div>
                       <Truck className="text-muted-foreground" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2"><Checkbox id="optimize" /><Label htmlFor="optimize" className="font-normal">Otimizar rota</Label></div>
                  <div className="flex items-center space-x-2"><Checkbox id="return" /><Label htmlFor="return" className="font-normal">Calcular volta</Label></div>
                </div>
              </div>
            </div>

            <div className="w-1/3 bg-muted/30 p-6 space-y-6">
              <h3 className="font-semibold">Mais opções da rota</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2"><Checkbox id="search-gas" /><Label htmlFor="search-gas" className="font-normal">Pesquisar Posto de combustível</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="search-poi" /><Label htmlFor="search-poi" className="font-normal">Pesquisar pontos de interesse</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="prioritize-highways" /><Label htmlFor="prioritize-highways" className="font-normal">Priorizar as rodovias</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="avoid-tolls" /><Label htmlFor="avoid-tolls" className="font-normal">Evitar pedágio</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="avoid-ferries" /><Label htmlFor="avoid-ferries" className="font-normal">Evitar balsa</Label></div>
              </div>

              <Separator />

              <div>
                <Label className="font-semibold">Tipo caminho</Label>
                <p className="text-xs text-muted-foreground mb-2">Traçar rota priorizando rodovias preferenciais para:</p>
                <ToggleGroup type="single" defaultValue="fastest" variant="outline" className="w-full justify-start">
                  <ToggleGroupItem value="fastest">Mais Rápida</ToggleGroupItem>
                  <ToggleGroupItem value="shortest">Curta</ToggleGroupItem>
                  <ToggleGroupItem value="most-curvy">Mais Curta</ToggleGroupItem>
                  <ToggleGroupItem value="economic">Econômica</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div>
                <Controller
                  name="vehicleType"
                  control={form.control}
                  render={({ field }) => (
                    <ToggleGroup
                      type="single"
                      variant="outline"
                      className="w-full justify-start"
                      value={field.value}
                      onValueChange={(value) => value && field.onChange(value as z.infer<typeof vehicleTypeEnum>)}
                    >
                      <ToggleGroupItem value="CAR" className="flex-1"><Car /></ToggleGroupItem>
                      <ToggleGroupItem value="VLC" className="flex-1"><Truck className="h-5 w-5"/></ToggleGroupItem>
                      <ToggleGroupItem value="CARRETA" className="flex-1"><Tractor/></ToggleGroupItem>
                      <ToggleGroupItem value="TRUCK" className="flex-1"><Truck/></ToggleGroupItem>
                      <ToggleGroupItem value="BITRUCK" className="flex-1"><BusFront/></ToggleGroupItem>
                    </ToggleGroup>
                  )}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Calcular Rota
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const LocationInput = ({ icon, label, cityFieldName, addressFieldName, form }: any) => (
  <div className="flex items-start gap-3">
    <div className="pt-2">{icon}</div>
    <div className="flex-grow">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <BrazilFlag />
        <FormField control={form.control} name={cityFieldName} render={({ field }: any) => (
          <Input placeholder="Cidade" {...field} className="flex-grow" />
        )} />
        <FormField control={form.control} name={addressFieldName} render={({ field }: any) => (
          <Input placeholder="Endereço" {...field} className="flex-grow" />
        )} />
        <Button variant="ghost" type="button"><Plus className="h-4 w-4" /></Button>
        <Button variant="ghost" type="button"><Compass className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" type="button" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
      </div>
      <FormMessage form={form} name={cityFieldName} />
    </div>
  </div>
);

const FormMessage = ({ form, name }: { form: any, name: string }) => {
  const { errors } = form.formState;
  const error = errors[name];
  if (!error) return null;
  return <p className="text-sm text-destructive mt-1">{error.message as string}</p>;
};
