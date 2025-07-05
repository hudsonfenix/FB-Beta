import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building, Truck, ArrowRight, Briefcase } from 'lucide-react'
import { Logo } from '@/components/logo'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="mb-8">
            <Logo />
        </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Crie sua conta na FretesBrasil</h1>
        <p className="text-muted-foreground">Escolha seu tipo de perfil para começar.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Card className="hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">Sou uma Empresa</CardTitle>
                <CardDescription>Quero anunciar e gerenciar minhas cargas.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
            <p className="text-sm text-muted-foreground mb-4">
                Anuncie suas cargas para milhares de motoristas qualificados, negocie fretes e acompanhe suas entregas em tempo real.
            </p>
            <Button asChild className="w-full mt-auto">
              <Link href="/register/company">
                Cadastrar Empresa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader>
             <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">Sou Caminhoneiro</CardTitle>
                <CardDescription>Quero encontrar e transportar cargas.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
             <p className="text-sm text-muted-foreground mb-4">
                Acesse fretes de todo o Brasil, filtre por tipo de veículo e carroceria, e aumente seus lucros com a FretesBrasil.
            </p>
            <Button asChild className="w-full mt-auto">
              <Link href="/register/driver">
                Cadastrar como Motorista
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader>
             <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Briefcase className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">Sou Agenciador</CardTitle>
                <CardDescription>Quero agenciar fretes e motoristas.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col flex-1">
             <p className="text-sm text-muted-foreground mb-4">
                Gerencie fretes, conecte transportadoras a motoristas e otimize suas operações logísticas com nossas ferramentas.
            </p>
            <Button asChild className="w-full mt-auto">
              <Link href="/register/agent">
                Cadastrar como Agenciador
                 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
       <div className="mt-8 text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/login" className="underline">
          Faça login
        </Link>
      </div>
    </div>
  )
}
