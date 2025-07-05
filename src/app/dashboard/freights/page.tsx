'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";
import { freights } from "@/lib/freight-data";
import { FreightTableRow } from "./freight-table-row";

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
                <FreightTableRow key={freight.id} freight={freight} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
