'use client'

import { FreightCard } from "../freights/freight-card";
import { freights } from "@/lib/freight-data";

export default function MyFreightsPage() {
  const myFreights = freights.filter(f => f.company.name === "AGROPECUÁRIA JS" || f.company.name === "TRANSPORTADORA VELOZ");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-headline">{myFreights.length} fretes publicados por sua empresa</h1>
      <div className="space-y-4">
          {myFreights.length > 0 ? (
            myFreights.map((freight) => (
                <FreightCard key={freight.id} freight={freight} />
            ))
          ) : (
            <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Você ainda não publicou nenhum frete.</p>
            </div>
          )}
      </div>
    </div>
  )
}
