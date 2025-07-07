'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold font-headline">Configurações</h1>
        <Card>
            <CardHeader>
                <CardTitle>Página em Construção</CardTitle>
                <CardDescription>Esta página ainda está em desenvolvimento. Volte em breve!</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Estamos trabalhando para trazer as melhores funcionalidades para você.</p>
            </CardContent>
        </Card>
    </div>
  )
}
