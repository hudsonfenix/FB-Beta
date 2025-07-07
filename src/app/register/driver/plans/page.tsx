'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
    <span className="text-muted-foreground">{children}</span>
  </li>
)

export default function DriverPlansPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8">
        <Link href="/"><Logo /></Link>
      </div>
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold font-headline">Seu cadastro foi concluído!</h1>
        <p className="text-muted-foreground mt-2">Escolha um plano para começar a encontrar os melhores fretes e maximizar seus lucros.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Free Plan Card */}
        <Card className="flex flex-col rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Plano Gratuito</CardTitle>
            <CardDescription>Comece sem custos e encontre fretes em todo o Brasil.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              <PlanFeature>Acesso a milhares de fretes públicos</PlanFeature>
              <PlanFeature>Comunicação direta com embarcadores</PlanFeature>
              <PlanFeature>Suporte básico via chat</PlanFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/driver">
                Continuar com o plano gratuito
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* VIP Plan Card */}
        <Card className="border-primary border-2 flex flex-col relative overflow-hidden rounded-lg shadow-lg">
           <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold py-1 px-4 rounded-bl-lg">
                RECOMENDADO
           </div>
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-primary">Plano VIP</CardTitle>
                <div className="text-right">
                    <p className="text-2xl font-bold">R$ 49,90</p>
                    <p className="text-sm text-muted-foreground">/mês</p>
                </div>
            </div>
            <CardDescription>Maximize seus lucros com acesso a vantagens exclusivas.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm font-semibold mb-4 text-foreground">Todas as vantagens do plano gratuito, e mais:</p>
            <ul className="space-y-3">
              <PlanFeature>
                <span className="font-semibold text-foreground">Fretes VIP com 30 minutos de prioridade</span>
              </PlanFeature>
              <PlanFeature>
                 <span className="font-semibold text-foreground">Calculadora de Custo Operacional ilimitada</span>
              </PlanFeature>
              <PlanFeature>Suporte prioritário por telefone e WhatsApp</PlanFeature>
               <PlanFeature>Selo de motorista VIP em seu perfil</PlanFeature>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
               <Link href="/dashboard/driver">
                Assinar Plano VIP <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
