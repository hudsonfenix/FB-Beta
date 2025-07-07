'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Logo } from '@/components/logo'
import { CheckCircle } from 'lucide-react'

export default function AgentRegisterPage() {
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                router.push('/dashboard/agent');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitted, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-md text-center p-6">
                    <CardHeader>
                        <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <CardTitle className="mt-4">Cadastro realizado com sucesso!</CardTitle>
                        <CardDescription>
                            Você será redirecionado para o painel em alguns instantes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/dashboard/agent">Ir para o Painel</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="text-2xl text-center">Cadastro de Agenciador</CardTitle>
                    <CardDescription className="text-center">
                        Preencha os dados para começar a agenciar fretes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input id="name" placeholder="João da Silva" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail comercial</Label>
                            <Input id="email" type="email" placeholder="contato@agencia.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email-confirm">Confirme seu e-mail</Label>
                            <Input id="email-confirm" type="email" placeholder="contato@agencia.com" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                <Input id="whatsapp" placeholder="(XX) XXXXX-XXXX" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cpf">CPF</Label>
                                <Input id="cpf" placeholder="000.000.000-00" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="birthdate">Data de nascimento</Label>
                            <Input id="birthdate" type="date" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password-confirm">Confirme sua senha</Label>
                            <Input id="password-confirm" type="password" required />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" required />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none"
                            >
                                Eu aceito os <Link href="#" className="underline">Termos de Serviço</Link> e a <Link href="#" className="underline">Política de Privacidade</Link>.
                            </label>
                        </div>
                        <Button type="submit" className="w-full">
                            Finalizar Cadastro
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
