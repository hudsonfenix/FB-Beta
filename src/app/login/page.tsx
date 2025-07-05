import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-center">
            <Logo />
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Bem-vindo de volta!</CardTitle>
            <CardDescription>Acesse sua conta para continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="motorista" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="motorista">Motorista</TabsTrigger>
                <TabsTrigger value="transportador">Transportador</TabsTrigger>
                <TabsTrigger value="agenciador">Agenciador</TabsTrigger>
              </TabsList>
              <TabsContent value="motorista">
                <LoginForm />
              </TabsContent>
              <TabsContent value="transportador">
                <LoginForm />
              </TabsContent>
              <TabsContent value="agenciador">
                <LoginForm />
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/register" className="underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoginForm() {
  return (
    <form className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input id="cpf" placeholder="000.000.000-00" required />
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <Label htmlFor="password">Senha</Label>
          <Link href="#" className="ml-auto inline-block text-sm underline">
            Esqueci a senha
          </Link>
        </div>
        <Input id="password" type="password" required />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Manter conectado
        </label>
      </div>
      <Button type="submit" className="w-full" asChild>
        <Link href="/dashboard">Entrar</Link>
      </Button>
      <Button variant="outline" className="w-full">
        Preciso de ajuda
      </Button>
    </form>
  )
}
