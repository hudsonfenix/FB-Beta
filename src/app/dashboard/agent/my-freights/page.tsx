'use client'

import { FreightCard } from "../freights/freight-card";
import { freights } from "@/lib/freight-data";
import { Package } from "lucide-react";

export default function MyFreightsPage() {
  const myFreights = freights.filter(f => f.company.name === "AGROPECUÁRIA JS" || f.company.name === "TRANSPORTADORA VELOZ");

  return (
    <div className="flex flex-col h-full">
      {myFreights.length > 0 ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold font-headline">{myFreights.length} fretes publicados por sua empresa</h1>
          <div className="space-y-4">
            {myFreights.map((freight) => (
              <FreightCard key={freight.id} freight={freight} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="flex flex-col items-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold font-headline">Nenhum frete publicado</h1>
            <p className="mt-2 text-muted-foreground">
              Você ainda não publicou nenhum frete.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
