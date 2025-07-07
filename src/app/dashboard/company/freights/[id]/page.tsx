'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { freights } from '@/lib/freight-data'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Phone, MessageSquare, Star as StarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

const DetailItem = ({ label, value, className }: { label: string; value: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col gap-1", className)}>
    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
    <p className="text-base font-semibold">{value}</p>
  </div>
);

export default function FreightDetailPage({ params }: { params: { id: string } }) {
  const freight = freights.find(f => f.id.toString() === params.id)

  if (!freight) {
    notFound();
  }
  
  const { company, details } = freight;

  return (
    <div className="space-y-6">
      <Link href="/dashboard/company/freights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Voltar para a lista de fretes
      </Link>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold font-headline">Detalhes do Frete</h1>
          <p className="text-muted-foreground">Código do frete: {freight.code}</p>
        </div>
        {freight.isVip && <Badge className="bg-primary text-primary-foreground text-sm">Frete VIP</Badge>}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">EMPRESA</p>
              <h2 className="text-xl font-bold">{company.name}</h2>
              <p className="text-sm text-muted-foreground">Ativa há: {company.activeSince}</p>
            </div>
            <div className="shrink-0">
               <Image 
                src={company.logoUrl} 
                alt={`Logo ${company.name}`} 
                width={120} 
                height={40} 
                className="rounded-md object-contain"
                data-ai-hint="company logo"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="reviews">
              <AccordionTrigger className="text-base font-semibold">
                O que falam da empresa:
                <span className="ml-2 text-sm font-normal text-muted-foreground">{company.reviews.count} avaliações desde {company.reviews.since}</span>
              </AccordionTrigger>
              <AccordionContent>
                {company.reviews.comments.length > 0 ? (
                    <div className="space-y-4 pt-2">
                        {company.reviews.comments.map((comment, index) => (
                            <div key={index} className="border-l-2 border-primary pl-4">
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <StarIcon key={i} className={`h-4 w-4 ${i < comment.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                    ))}
                                </div>
                                <p className="italic">"{comment.text}"</p>
                                <p className="text-sm text-muted-foreground text-right">- {comment.author}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground pt-2">Nenhuma avaliação detalhada disponível.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
              <DetailItem label="Origem" value={freight.origin} className="md:col-span-1"/>
              <DetailItem label="Destino" value={freight.destination} className="md:col-span-2"/>
              <DetailItem label="Veículo" value={freight.vehicle} className="md:col-span-3"/>
              <DetailItem label="Carroceria" value={details.bodywork} />
              <DetailItem label="Espécie" value={details.species} />
              <DetailItem label="Produto" value={details.product} />
              <DetailItem label="Tipo de Carga" value={details.loadType} />
              <DetailItem label="Peso Total da Carga" value={details.weight} />
              <DetailItem label="Preço" value={freight.price} />
              <DetailItem label="Precisa de Lona" value={details.needsTarp ? 'SIM' : 'NÃO'} />
              <DetailItem label="Pedágio" value={details.toll ? 'SIM' : 'NÃO'} />
              <DetailItem label="Adiantamento" value={details.downPayment} />
              <DetailItem label="Rastreamento" value={details.tracking ? 'SIM' : 'NÃO'} />
              <DetailItem label="Agenciamento" value={details.agency ? 'SIM' : 'NÃO'} />
              <DetailItem label="KM" value={`${details.km} km`} />
              <DetailItem label="Formas de Pagamento" value={details.paymentMethods} />
              <DetailItem label="Adicionado há" value={details.addedAt} className="md:col-span-2"/>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Observações</p>
            <p className="mt-2 text-base">{details.observations}</p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="w-full sm:w-auto flex-1">
                <MessageSquare className="mr-2 h-5 w-5"/>
                Tenho Interesse
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto flex-1">
                <Phone className="mr-2 h-5 w-5"/>
                Ligar para a empresa
            </Button>
        </CardFooter>
      </Card>

    </div>
  )
}
