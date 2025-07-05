'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

const vehicleTypes = {
  Pesados: ["Carreta", "Carreta LS", "Vanderléia", "Bitrem", "Rodotrem"],
  Médios: ["Bitruck", "Truck"],
  Leves: ["3/4", "Fiorino", "Toco", "VLC"],
};

export function FreightFilters() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Origem e destino</h3>
          <div className="space-y-2">
            <Label>Origem</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Escolha sua origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sp">São Paulo, SP</SelectItem>
                <SelectItem value="rj">Rio de Janeiro, RJ</SelectItem>
                <SelectItem value="mg">Belo Horizonte, MG</SelectItem>
                <SelectItem value="pa">Barcarena, PA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Destino</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Escolha seu destino (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mt">Confresa, MT</SelectItem>
                <SelectItem value="sp">São Paulo, SP</SelectItem>
                <SelectItem value="rj">Rio de Janeiro, RJ</SelectItem>
                <SelectItem value="ba">Salvador, BA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold">Raio (Distância)</h3>
          <RadioGroup defaultValue="any" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="50" id="r1" />
              <Label htmlFor="r1" className="font-normal">50km</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="100" id="r2" />
              <Label htmlFor="r2" className="font-normal">100km</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="200" id="r3" />
              <Label htmlFor="r3" className="font-normal">200km</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold">Veículo</h3>
          {Object.entries(vehicleTypes).map(([category, types]) => (
            <div key={category} className="space-y-2">
              <Label className="font-medium text-muted-foreground">{category}</Label>
              <div className="space-y-2 pl-2">
                {types.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={type.toLowerCase().replace(' ', '')} />
                    <Label htmlFor={type.toLowerCase().replace(' ', '')} className="font-normal">{type}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <Separator />

        <Button className="w-full">Aplicar Filtros</Button>
      </CardContent>
    </Card>
  )
}
