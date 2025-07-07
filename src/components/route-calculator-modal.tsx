
'use client'

import React, { useState, useEffect } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";


import {
  Edit2, Calendar as CalendarIcon, Clock, Home, MapPin, Plus, Trash2, Fuel,
  Wand2, Loader2, Compass, Minus, ChevronDown
} from 'lucide-react';

const BrazilFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1000 700" className="h-5 w-5 rounded-sm">
    <rect width="1000" height="700" fill="#009c3b"/>
    <path d="M500 85L890 350L500 615L110 350L500 85Z" fill="#ffcc29"/>
    <circle cx="500" cy="350" r="175" fill="#0033a0"/>
  </svg>
);

const IconCar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19,17H5c-1.1,0-2-0.9-2-2V12c0-1.1,0.9-2,2-2h14c1.1,0,2,0.9,2,2v3C21,16.1,20.1,17,19,17z" />
    <path d="M5,10L8,5h8l3,5" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" />
  </svg>
);

const IconToco = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="9" width="14" height="9" rx="1" />
    <path d="M16,9H20c1.1,0,2,0.9,2,2v3c0,1.1-0.9,2-2,2h-1" />
    <path d="M6,9V6c0-1.1,0.9-2,2-2h3l2,2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

const IconTruck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="7" width="16" height="11" rx="1" />
    <path d="M18,7H21c0.6,0,1,0.4,1,1v8c0,0.6-0.4,1-1,1h-1" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M18,12H22" />
  </svg>
);

const IconCarreta = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2,9h10v9H2V9z" />
    <path d="M12,14H16c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2h-1l-2,3" />
    <path d="M21.5,14H22c0.6,0,1,0.4,1,1v1c0,0.6-0.4,1-1,1h-0.5" />
    <circle cx="5" cy="18" r="1.5" />
    <circle cx="9" cy="18" r="1.5" />
    <circle cx="18" cy="18" r="1.5" />
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
  axleCount: z.coerce.number().min(2).max(9).default(5),
});

type FormData = z.infer<typeof formSchema>;

interface RouteCalculatorModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCalculate: (data: any) => void;
  isLoading: boolean;
  initialData?: Partial<FormData>;
}

export function RouteCalculatorModal({ isOpen, onOpenChange, onCalculate, isLoading, initialData }: RouteCalculatorModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originCity: "São Paulo, SP",
      destinationCity: "Rio de Janeiro, RJ",
      vehicleType: 'CARRETA',
      axleCount: 5,
      fuelCostPerLiter: 5.80,
      fuelConsumption: 2.5,
      ...initialData,
    },
  });
  
  useEffect(() => {
    if (initialData) {
      form.reset({
        fuelCostPerLiter: 5.80,
        fuelConsumption: 2.5,
        axleCount: 5,
        ...initialData
      });
    }
  }, [initialData, form, isOpen]);

  const onSubmit = (values: FormData) => {
    const apiInput = {
      origin: `${values.originCity}${values.originAddress ? ', ' + values.originAddress : ''}`,
      destination: `${values.destinationCity}${values.destinationAddress ? ', ' + values.destinationAddress : ''}`,
      vehicleType: values.vehicleType,
      axleCount: values.axleCount,
      fuelCostPerLiter: values.fuelCostPerLiter,
      fuelConsumption: values.fuelConsumption,
      cargoValue: 100000,
      cargoWeight: 25000,
      cargoType: "Carga Geral",
    };
    onCalculate(apiInput);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl p-0">
        <Form {...form}>
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
              </div>

              <div className="space-y-4">
                <LocationInput icon={<Home />} label="Origem" cityFieldName="originCity" addressFieldName="originAddress" />
                <LocationInput icon={<MapPin />} label="Destino" cityFieldName="destinationCity" addressFieldName="destinationAddress" />
              </div>

              <Separator />

              <div className="flex items-end justify-between gap-4">
                <div className="flex gap-4 items-end">
                  <FormField control={form.control} name="fuelCostPerLiter" render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 rounded-full border bg-muted/30 p-2">
                        <Fuel className="text-muted-foreground" />
                        <div className="pr-2">
                          <Label className="text-xs">Combustível</Label>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} className="h-auto p-0 border-0 bg-transparent text-base font-semibold focus-visible:ring-0" />
                          </FormControl>
                        </div>
                        <span className="text-sm text-muted-foreground">R$</span>
                      </div>
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="fuelConsumption" render={({ field }) => (
                     <FormItem>
                      <div className="flex items-center gap-2 rounded-full border bg-muted/30 p-2">
                        <Wand2 className="text-muted-foreground" />
                        <div className="pr-2">
                          <Label className="text-xs">Consumo</Label>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} className="h-auto p-0 border-0 bg-transparent text-base font-semibold focus-visible:ring-0" />
                          </FormControl>
                        </div>
                        <span className="text-sm text-muted-foreground">KM/L</span>
                      </div>
                     </FormItem>
                  )} />
                  <VehiclePopoverSelector />
                </div>
              </div>
            </div>

            <div className="w-1/3 bg-muted/30 p-6 space-y-6 flex flex-col">
               <div className="grow">
                 <Label className="font-semibold">Tipo caminho</Label>
                 <p className="text-xs text-muted-foreground mb-2">Traçar rota priorizando rodovias preferenciais para:</p>
                 <ToggleGroup type="single" defaultValue="economic" variant="outline" className="w-full justify-start">
                   <ToggleGroupItem value="economic">Econômica</ToggleGroupItem>
                   <ToggleGroupItem value="fastest">Mais Rápida</ToggleGroupItem>
                 </ToggleGroup>
               </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Calcular Rota
              </Button>
            </div>
          </div>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const LocationInput = ({ icon, label, cityFieldName, addressFieldName }: {
  icon: React.ReactNode;
  label: string;
  cityFieldName: "originCity" | "destinationCity";
  addressFieldName: "originAddress" | "destinationAddress";
}) => (
  <div className="flex items-start gap-3">
    <div className="pt-2">{icon}</div>
    <div className="flex-grow space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <BrazilFlag />
        <FormField
          name={cityFieldName}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={addressFieldName}
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="Endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  </div>
);

const IconAxle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 7h14" />
    <path d="M5 17h14" />
    <circle cx="6.5" cy="7" r="1.5" />
    <circle cx="17.5" cy="7" r="1.5" />
    <circle cx="6.5" cy="17" r="1.5" />
    <circle cx="17.5" cy="17" r="1.5" />
  </svg>
);

const vehicleCategories = [
    { id: 'CAR', name: 'Passeio - Carro / Utilitários', icon: IconCar, defaultType: 'CAR', minAxles: 2, maxAxles: 2, description: 'Auto, Caminhonete, Furgão (Com/Sem Semi Reboque ou Reboque)'},
    { id: 'TRUCK', name: 'Comercial', icon: IconToco, defaultType: 'TRUCK', minAxles: 2, maxAxles: 6, description: 'Caminhão Leve, Furgão, Caminhão (com/sem Reboque), Caminhão Trator (com/sem Semi Reboque)'},
    { id: 'CARRETA', name: 'Comercial Pesado', icon: IconCarreta, defaultType: 'CARRETA_LS', minAxles: 2, maxAxles: 9, description: 'Semi-reboque, Bitrem, Rodotrem'},
];

function VehiclePopoverSelector() {
    const { control, watch, setValue } = useFormContext<FormData>();
    const vehicleType = watch('vehicleType');
    const axleCount = watch('axleCount');

    const handleAxleChange = (change: number) => {
        const currentCategory = vehicleCategories.find(c => c.id === vehicleType) || vehicleCategories[1];
        const newAxles = Math.max(currentCategory.minAxles, Math.min(currentCategory.maxAxles, axleCount + change));
        setValue('axleCount', newAxles, { shouldValidate: true });
    };

    const handleCategorySelect = (category: typeof vehicleCategories[0]) => {
        setValue('vehicleType', category.id as z.infer<typeof vehicleTypeEnum>);
        if (axleCount < category.minAxles || axleCount > category.maxAxles) {
            setValue('axleCount', category.minAxles);
        }
    }

    const selectedCategory = vehicleCategories.find(c => c.id === vehicleType) || vehicleCategories[1];
    const VehicleIcon = selectedCategory.icon;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="h-14 w-48 justify-between px-3">
                    <div className="flex items-center gap-2">
                        <VehicleIcon className="h-8 w-8" />
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground">Eixos</p>
                            <p className="font-semibold">{axleCount}</p>
                        </div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-2">
                <div className="space-y-1">
                    {vehicleCategories.map(category => (
                        <div key={category.id} 
                             onClick={() => handleCategorySelect(category)}
                             className={cn(
                                "flex items-center gap-3 p-3 rounded-md cursor-pointer",
                                vehicleType === category.id && "bg-muted"
                             )}
                        >
                            <category.icon className="h-8 w-8 text-muted-foreground" />
                            <div className="flex-grow">
                                <p className="font-semibold">{category.name}</p>
                                <p className="text-xs text-muted-foreground">{category.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" onClick={(e) => { e.stopPropagation(); setValue('axleCount', Math.max(category.minAxles, axleCount - 1)); setValue('vehicleType', category.id as any); }} disabled={axleCount <= category.minAxles}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-bold w-4 text-center">{axleCount}</span>
                                <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" onClick={(e) => { e.stopPropagation(); setValue('axleCount', Math.min(category.maxAxles, axleCount + 1)); setValue('vehicleType', category.id as any); }} disabled={axleCount >= category.maxAxles}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
