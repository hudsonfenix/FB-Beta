import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Truck, Calculator, BarChartHorizontal } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { name: 'Fretes Disponíveis', value: '72.479', icon: Truck },
  { name: 'Sua Avaliação', value: '4.9/5', icon: BarChartHorizontal },
]

export default function DriverDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Bem-vindo de volta, José!</h1>
        <p className="text-muted-foreground">Pronto para a próxima viagem?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Encontre os melhores fretes</CardTitle>
            <CardDescription>Cargas em todo o Brasil, com os melhores preços.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">Filtre por rota, tipo de veículo, e valor. Nossos melhores fretes VIP são atualizados em tempo real.</p>
          </CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/driver/freights">
                Ver Fretes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Calcule seu custo operacional</CardTitle>
            <CardDescription>Planeje sua viagem com precisão e garanta seu lucro.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">Nossa ferramenta considera pedágios, combustível, e tabela ANTT para te dar o valor exato.</p>
          </CardContent>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/driver/cost-calculator">
                Fazer Cálculo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
