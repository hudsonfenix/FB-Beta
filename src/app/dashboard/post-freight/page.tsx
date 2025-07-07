'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, ArrowLeft } from 'lucide-react'

const vehicleTypes = {
  PESADOS: ["Bitrem", "Carreta", "Carreta LS", "Rodotrem", "Vanderléia"],
  MÉDIOS: ["Bitruck", "Truck"],
  LEVES: ["3/4", "Fiorino", "Toco", "VLC"],
};

const bodyTypes = {
  FECHADAS: ["Baú", "Baú Frigorifico", "Baú Refrigerado", "Sider"],
  ABERTAS: ["Caçamba", "Grade Baixa", "Graneleiro", "Plataforma", "Prancha"],
  ESPECIAIS: ["Apenas Cavalo", "Bug Porta Container", "Cavaqueira", "Cegonheiro", "Gaiola", "Hopper", "Munck", "Silo", "Tanque"],
};

export default function PostFreightPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md text-center p-6">
            <CardHeader>
                <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle className="mt-4">Frete cadastrado!</CardTitle>
                <CardDescription>
                    Seu frete foi publicado e já está visível para milhares de motoristas.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Button asChild className="w-full">
                    <Link href="/dashboard/freights">Ver meus fretes</Link>
                </Button>
                 <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard/post-freight">Cadastrar novo frete</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold font-headline">Cadastrar Novo Frete</h1>
        <Card>
            <form onSubmit={handleSubmit}>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="origin">Origem</Label>
                            <Input id="origin" placeholder="Cidade, UF" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="destination">Destino</Label>
                            <Input id="destination" placeholder="Cidade, UF" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label>Tipo de Veículo</Label>
                            <Select required>
                                <SelectTrigger><SelectValue placeholder="Selecione o tipo de veículo" /></SelectTrigger>
                                <SelectContent>
                                    {Object.entries(vehicleTypes).map(([category, types]) => (
                                        <div key={category}>
                                            <Label className="px-2 py-1.5 text-sm font-semibold">{category}</Label>
                                            {types.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                        </div>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Tipo de Carroceria</Label>
                             <Select required>
                                <SelectTrigger><SelectValue placeholder="Selecione o tipo de carroceria" /></SelectTrigger>
                                <SelectContent>
                                    {Object.entries(bodyTypes).map(([category, types]) => (
                                        <div key={category}>
                                            <Label className="px-2 py-1.5 text-sm font-semibold">{category}</Label>
                                            {types.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                        </div>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="product">Produto</Label>
                            <Input id="product" placeholder="Ex: Soja, Cimento" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="weight">Peso (TON)</Label>
                            <Input id="weight" type="number" placeholder="Ex: 35.5" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Valor do Frete (R$)</Label>
                            <Input id="price" type="number" placeholder="Ex: 5000" required />
                        </div>
                    </div>
                    
                     <div className="space-y-2">
                        <Label htmlFor="species">Espécie</Label>
                        <Input id="species" placeholder="Ex: Granel, Paletizada" />
                    </div>

                    <div className="space-y-4">
                        <Label>Opções Adicionais</Label>
                        <div className="flex items-center space-x-2">
                           <Checkbox id="needsTarp" />
                           <label htmlFor="needsTarp" className="text-sm font-medium">Precisa de Lona</label>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Checkbox id="toll" />
                           <label htmlFor="toll" className="text-sm font-medium">Paga pedágio</label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="observations">Observações</Label>
                        <Textarea id="observations" placeholder="Insira aqui qualquer informação adicional sobre o frete..." rows={4}/>
                    </div>

                </CardContent>
                <CardContent className="p-6 border-t">
                    <Button type="submit" size="lg" className="w-full md:w-auto">
                        Publicar Frete
                    </Button>
                </CardContent>
            </form>
        </Card>
    </div>
  )
}
