'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HelpPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold font-headline">Ajuda</h1>
        <Card>
            <CardHeader>
                <CardTitle>Página em Construção</CardTitle>
                <CardDescription>Esta página ainda está em desenvolvimento. Volte em breve!</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Estamos preparando um conteúdo completo para te ajudar a usar a plataforma da melhor forma.</p>
            </CardContent>
        </Card>
    </div>
  )
}
