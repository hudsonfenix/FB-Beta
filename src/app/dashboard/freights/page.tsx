'use client'

import { FreightFilters } from "./freight-filters";
import { FreightCard } from "./freight-card";
import { freights } from "@/lib/freight-data";

export default function FreightsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <aside className="lg:col-span-1 lg:sticky lg:top-6">
        <FreightFilters />
      </aside>
      <main className="lg:col-span-3 space-y-6">
        <h1 className="text-2xl font-bold font-headline">{freights.length.toLocaleString('pt-BR')} fretes disponíveis</h1>
        <div className="space-y-4">
            {freights.map((freight) => (
                <FreightCard key={freight.id} freight={freight} />
            ))}
        </div>
      </main>
    </div>
  )
}
