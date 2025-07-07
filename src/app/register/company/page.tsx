'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Logo } from '@/components/logo'

export default function CompanyRegisterPage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="text-2xl text-center">Cadastro de Transportadora</CardTitle>
                    <CardDescription className="text-center">
                        Preencha os dados para anunciar suas cargas.
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
                            <Input id="email" type="email" placeholder="contato@transportadora.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email-confirm">Confirme seu e-mail</Label>
                            <Input id="email-confirm" type="email" placeholder="contato@transportadora.com" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                <Input id="whatsapp" placeholder="(XX) XXXXX-XXXX" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cnpj">CNPJ</Label>
                                <Input id="cnpj" placeholder="00.000.000/0000-00" required />
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
