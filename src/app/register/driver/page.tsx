'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Logo } from '@/components/logo'
import { Upload, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const vehicleTypes = {
  PESADOS: ["Bitrem", "Carreta", "Carreta LS", "Rodotrem", "Vanderléia"],
  MÉDIOS: ["Bitruck", "Truck"],
  LEVES: ["3/4", "Fiorino", "Toco", "VLC"],
};

const bodyTypes = {
  FECHADAS: ["Baú", "Baú Frigorifico", "Baú Refrigerado", "Sider"],
  ABERTAS: ["Caçamba", "Grade Baixa", "Graneleiro", "Plataforma", "Prancha"],
  ESPECIAIS: ["Apenas Cavalo", "Bug Porta Container", "Cavaqueira", "Cegonheiro", "Gaiola", "Hopper", "Munck", "Silo", "Tanque"],
};

const trackerOptions = ["Não tem rastreador", "Tem, mas não sei a marca", "Autotrac", "Onix Sat", "Positron", "Sascar", "Porto Seguro"];


export default function DriverRegisterPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (submitted) {
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const onFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }

  const progressValue = (step / 3) * 100;
  
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
                        Seus dados foram enviados para análise. Você será redirecionado para o painel.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/dashboard">Ir para o Painel</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <Logo />
                </div>
                <Progress value={progressValue} className="w-full" />
                <CardTitle className="text-2xl text-center pt-4">Cadastro de Motorista</CardTitle>
                <CardDescription className="text-center">
                    Siga os passos para completar seu cadastro.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === 1 && <Step1 nextStep={nextStep} />}
                {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
                {step === 3 && <Step3 onFinalSubmit={onFinalSubmit} prevStep={prevStep} />}
            </CardContent>
        </Card>
    </div>
  );
}

const Step1 = ({ nextStep }: { nextStep: () => void }) => (
    <form onSubmit={(e) => { e.preventDefault(); nextStep()}} className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input id="name" placeholder="José da Silva" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="jose@email.com" required />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="email-confirm">Confirme seu e-mail</Label>
            <Input id="email-confirm" type="email" placeholder="jose@email.com" required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(XX) XXXXX-XXXX" required />
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
        <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password-confirm">Confirme sua senha</Label>
                <Input id="password-confirm" type="password" required />
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
                Eu aceito os <Link href="#" className="underline">Termos de Serviço</Link>.
            </label>
        </div>
        <p className="text-xs text-muted-foreground">Você receberá uma confirmação por e-mail ou WhatsApp.</p>
        <Button type="submit" className="w-full">Próximo</Button>
    </form>
);


const Step2 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => (
    <form onSubmit={(e) => { e.preventDefault(); nextStep()}} className="grid gap-4">
        <h3 className="font-semibold">Dados do Veículo</h3>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="plate">Placa</Label>
                <Input id="plate" placeholder="ABC-1234" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="rntrc">RNTRC (ANTT)</Label>
                <Input id="rntrc" placeholder="00000000" required />
            </div>
        </div>
        <div className="grid gap-2">
            <Label>Tipo de Veículo</Label>
            <Select required>
                <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
                <SelectContent>
                    {Object.entries(vehicleTypes).map(([category, types]) => (
                        <div key={category}>
                            <Label className="px-2 py-1.5 text-sm font-semibold">{category}</Label>
                            {types.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </div>
                    ))}
                </SelectContent>
            </Select>
        </div>
         <div className="grid gap-2">
            <Label>Tipo de Carroceria</Label>
            <Select required>
                <SelectTrigger><SelectValue placeholder="Selecione a carroceria" /></SelectTrigger>
                <SelectContent>
                    {Object.entries(bodyTypes).map(([category, types]) => (
                        <div key={category}>
                            <Label className="px-2 py-1.5 text-sm font-semibold">{category}</Label>
                            {types.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </div>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="capacity">Capacidade Máxima (TON)</Label>
            <Input id="capacity" type="number" placeholder="45" required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label>Rastreador</Label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                        {trackerOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>Localizador</Label>
                 <Select>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="yes">Tem localizador</SelectItem>
                        <SelectItem value="no">Não tem localizador</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex gap-4 mt-4">
            <Button type="button" variant="outline" onClick={prevStep} className="w-full">Anterior</Button>
            <Button type="submit" className="w-full">Próximo</Button>
        </div>
    </form>
);

const Step3 = ({ onFinalSubmit, prevStep }: { onFinalSubmit: (e: React.FormEvent) => void; prevStep: () => void }) => (
    <form onSubmit={onFinalSubmit} className="grid gap-6">
        <h3 className="font-semibold">Envio de Documentos</h3>
        <p className="text-sm text-muted-foreground">Para sua segurança, precisamos validar seus documentos. Envie uma foto da sua CNH e CRLV.</p>
        <div className="grid gap-4">
            <FileUpload title="CNH (Frente e Verso)" description="Carteira Nacional de Habilitação" />
            <FileUpload title="CRLV (Cavalo)" description="Documento do veículo trator" />
            <FileUpload title="CRLV (Carreta)" description="Documento do implemento (opcional)" />
        </div>
        <div className="flex gap-4 mt-4">
            <Button type="button" variant="outline" onClick={prevStep} className="w-full">Anterior</Button>
            <Button type="submit" className="w-full">Finalizar Cadastro</Button>
        </div>
    </form>
);

const FileUpload = ({ title, description }: { title: string, description: string }) => {
    const [fileName, setFileName] = useState('');
    const id = title.toLowerCase().replace(/\s/g, '-');
    return (
        <div className="space-y-2">
            <Label>{title}</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Input id={id} type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')} />
                </label>
            </div>
            {fileName && <p className="text-sm text-muted-foreground">Arquivo selecionado: {fileName}</p>}
        </div>
    );
};
