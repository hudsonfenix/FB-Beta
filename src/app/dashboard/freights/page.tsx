import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star, ArrowRight } from "lucide-react";

const freights = [
  { id: 1, origin: 'São Paulo, SP', destination: 'Rio de Janeiro, RJ', vehicle: 'Carreta', price: 'R$ 2.500,00', isVip: true },
  { id: 2, origin: 'Curitiba, PR', destination: 'Porto Alegre, RS', vehicle: 'Truck', price: 'R$ 1.800,00', isVip: false },
  { id: 3, origin: 'Belo Horizonte, MG', destination: 'Salvador, BA', vehicle: 'Bitrem', price: 'R$ 4.200,00', isVip: true },
  { id: 4, origin: 'Goiânia, GO', destination: 'Brasília, DF', vehicle: 'Toco', price: 'R$ 800,00', isVip: false },
  { id: 5, origin: 'Recife, PE', destination: 'Fortaleza, CE', vehicle: 'Carreta LS', price: 'R$ 3.100,00', isVip: false },
  { id: 6, origin: 'Manaus, AM', destination: 'Belém, PA', vehicle: 'Vanderleia', price: 'R$ 5.500,00', isVip: true },
];

export default function FreightsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Fretes Disponíveis</h1>

      <Alert className="bg-primary/10 border-primary/20">
        <Star className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary font-bold">Você é um membro VIP!</AlertTitle>
        <AlertDescription>
          Você tem acesso prioritário a novos fretes 30 minutos antes dos outros motoristas.
        </AlertDescription>
      </Alert>

      <div className="border rounded-lg w-full">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Origem</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {freights.map((freight) => (
                <TableRow key={freight.id}>
                  <TableCell className="font-medium">{freight.origin}</TableCell>
                  <TableCell>{freight.destination}</TableCell>
                  <TableCell>{freight.vehicle}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       {freight.price}
                       {freight.isVip && <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">VIP</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
