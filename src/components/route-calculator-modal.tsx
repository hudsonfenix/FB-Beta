
'use client'

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import {
  Edit2, Calendar as CalendarIcon, Clock, Home, MapPin, Fuel,
  Wand2, Loader2, ChevronDown
} from 'lucide-react';

const BrazilFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1000 700" className="h-5 w-5 rounded-sm">
    <rect width="1000" height="700" fill="#009c3b"/>
    <path d="M500 85L890 350L500 615L110 350L500 85Z" fill="#ffcc29"/>
    <circle cx="500" cy="350" r="175" fill="#0033a0"/>
  </svg>
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
  axleCount: z.coerce.number().min(1).max(15).default(2),
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
      axleCount: 2,
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
        axleCount: 2,
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
      <DialogContent className="max-w-4xl p-0">
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
                   <FormField
                    control={form.control}
                    name="axleCount"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger className="h-14 w-36">
                              <div className="flex w-full items-center gap-3">
                                <IconAxle className="h-6 w-6 text-muted-foreground" />
                                <div className="flex-1 text-left">
                                  <p className="text-xs font-medium text-muted-foreground">Eixos</p>
                                  <span className="font-semibold text-base text-foreground">{field.value}</span>
                                </div>
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 15 }, (_, i) => i + 1).map((axle) => (
                              <SelectItem key={axle} value={String(axle)}>
                                {axle} eixo{axle > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-1/3 bg-muted/30 p-6 space-y-6 flex flex-col">
               <div className="grow">
                 <Label className="font-semibold">Tipo caminho</Label>
                 <p className="text-xs text-muted-foreground mb-2">Traçar rota priorizando rodovias preferenciais para:</p>
                 <ToggleGroup type="single" defaultValue="economic" variant="outline" className="w-full justify-start">
                   <ToggleGroupItem value="economic">Econômica</ToggleGroupItem>
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
