import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Truck, User, Building, Briefcase, FileText, Smartphone, BarChart, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/logo';

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
      <Logo />
      <nav className="hidden items-center gap-6 md:flex">
        <Link href="/dashboard/freights" className="text-sm font-medium transition-colors hover:text-primary">
          Fretes
        </Link>
        <Link href="/register/company" className="text-sm font-medium transition-colors hover:text-primary">
          Para Empresas
        </Link>
        <Link href="/register/driver" className="text-sm font-medium transition-colors hover:text-primary">
          Para Caminhoneiros
        </Link>
        <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
          Contato
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/login">Entrar</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Fazer Cadastro</Link>
        </Button>
      </div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
            A melhor plataforma de transporte rodoviário de cargas do Brasil!
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Conectamos sua carga aos melhores motoristas, com segurança e eficiência.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard/freights">
                Ver todos os fretes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register/company">Anunciar Fretes</Link>
            </Button>
          </div>
        </div>
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Cadastre sua empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Sua Empresa LTDA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail comercial</Label>
                <Input id="email" type="email" placeholder="contato@suaempresa.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">Whatsapp</Label>
                <Input id="whatsapp" placeholder="(XX) XXXXX-XXXX" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Data de nascimento</Label>
                  <Input id="birthdate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" />
              </div>
              <Button type="submit" className="w-full">
                Criar conta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const CategoriesSection = () => (
  <section className="w-full bg-card py-12 md:py-24">
    <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Image src="https://placehold.co/600x400.png" alt="Para Empresas" width={600} height={400} className="mb-4 rounded-lg" data-ai-hint="warehouse logistics" />
            <h3 className="text-2xl font-bold font-headline">Para Empresas</h3>
            <p className="mt-2 text-muted-foreground">Ganhe agilidade: anuncie cargas e conecte-se com motoristas perto de você.</p>
            <Button variant="link" asChild className="mt-4">
                <Link href="/register/company">Saiba Mais <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center">
            <Image src="https://placehold.co/600x400.png" alt="Para Caminhoneiros" width={600} height={400} className="mb-4 rounded-lg" data-ai-hint="truck highway" />
            <h3 className="text-2xl font-bold font-headline">Para Caminhoneiros</h3>
            <p className="mt-2 text-muted-foreground">Carregue com fretes que realmente compensam e aumente seus lucros.</p>
            <Button variant="link" asChild className="mt-4">
                <Link href="/register/driver">Saiba Mais <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </Card>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Como a FretesBrasil funciona?</h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Unimos quem precisa transportar com quem está pronto para rodar, de forma simples e rápida, em todo o Brasil.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-5xl">
        <Tabs defaultValue="transportadora" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transportadora">Transportadora</TabsTrigger>
            <TabsTrigger value="motorista">Motorista</TabsTrigger>
            <TabsTrigger value="agenciador">Agenciador</TabsTrigger>
          </TabsList>
          <TabsContent value="transportadora">
            <Card>
              <CardContent className="space-y-2 p-6">
                  <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-full"><Building className="h-6 w-6" /></div>
                      <div>
                          <h4 className="font-bold">1. Anuncie sua Carga</h4>
                          <p className="text-sm text-muted-foreground">Cadastre os detalhes da sua carga e o destino. Nossa plataforma encontra os motoristas ideais.</p>
                      </div>
                  </div>
                   <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-full"><User className="h-6 w-6" /></div>
                      <div>
                          <h4 className="font-bold">2. Receba Propostas</h4>
                          <p className="text-sm text-muted-foreground">Motoristas qualificados e próximos à sua localização enviam propostas competitivas.</p>
                      </div>
                  </div>
                   <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-full"><Truck className="h-6 w-6" /></div>
                      <div>
                          <h4 className="font-bold">3. Acompanhe a Entrega</h4>
                          <p className="text-sm text-muted-foreground">Monitore sua carga em tempo real até a entrega final com segurança.</p>
                      </div>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="motorista">
            <Card>
              <CardContent className="space-y-2 p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full"><FileText className="h-6 w-6" /></div>
                    <div>
                        <h4 className="font-bold">1. Cadastre-se</h4>
                        <p className="text-sm text-muted-foreground">Faça seu cadastro e envie seus documentos. É rápido e seguro.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full"><Briefcase className="h-6 w-6" /></div>
                    <div>
                        <h4 className="font-bold">2. Encontre Fretes</h4>
                        <p className="text-sm text-muted-foreground">Acesse milhares de fretes em todo o Brasil, compatíveis com seu veículo.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full"><Truck className="h-6 w-6" /></div>
                    <div>
                        <h4 className="font-bold">3. Carregue e Fature</h4>
                        <p className="text-sm text-muted-foreground">Negocie diretamente, carregue e receba o pagamento com agilidade.</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="agenciador">
             <Card>
              <CardContent className="space-y-2 p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full"><Briefcase className="h-6 w-6" /></div>
                    <div>
                        <h4 className="font-bold">1. Cadastre-se</h4>
                        <p className="text-sm text-muted-foreground">Crie sua conta de agenciador para ter acesso à nossa rede de transportadoras e motoristas.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full"><FileText className="h-6 w-6" /></div>
                    <div>
                        <h4 className="font-bold">2. Gerencie Fretes</h4>
                        <p className="text-sm text-muted-foreground">Publique fretes em nome de transportadoras ou encontre as melhores cargas para seus motoristas.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full"><BarChart className="h-6 w-6" /></div>
                    <div>
                        <h4 className="font-bold">3. Otimize e Fature</h4>
                        <p className="text-sm text-muted-foreground">Utilize nossas ferramentas para otimizar rotas, gerenciar pagamentos e aumentar sua rentabilidade.</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </section>
);

const AppSection = () => (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">O aplicativo FretesBrasil</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Todas as vantagens da nossa plataforma na palma da sua mão. Baixe agora e revolucione sua forma de transportar.
                </p>
                <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2"><Smartphone className="h-5 w-5 text-primary" />Notificações de fretes em tempo real</li>
                    <li className="flex items-center gap-2"><BarChart className="h-5 w-5 text-primary" />Cálculo de custo operacional integrado</li>
                    <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" />Pagamento seguro e gerenciado</li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="#">
                        <Image src="https://placehold.co/180x60.png?text=Google+Play" alt="Google Play" width={180} height={60} data-ai-hint="store badge" />
                    </Link>
                    <Link href="#">
                        <Image src="https://placehold.co/180x60.png?text=App+Store" alt="App Store" width={180} height={60} data-ai-hint="store badge" />
                    </Link>
                </div>
            </div>
            <Image
                src="https://placehold.co/550x550.png"
                width="550"
                height="550"
                alt="App"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
                data-ai-hint="app screenshot"
            />
        </div>
    </section>
);


const BlogSection = () => (
    <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline mb-8">Blog FretesBrasil</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1,2,3].map((item) => (
                    <Card key={item}>
                        <Link href="#">
                            <Image src={`https://placehold.co/600x400.png`} alt={`Blog Post ${item}`} width={600} height={400} className="rounded-t-lg object-cover" data-ai-hint="truck maintenance" />
                        </Link>
                        <CardContent className="p-4">
                            <h3 className="text-lg font-bold">Dicas para manutenção de caminhões</h3>
                            <p className="text-sm text-muted-foreground mt-2">Mantenha seu veículo em dia e evite problemas na estrada com nossas dicas essenciais...</p>
                             <Button variant="link" asChild className="p-0 mt-4"><Link href="#">Ler mais <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col gap-2">
                    <Logo />
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold">Plataforma</h3>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Para Empresas</Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Para Caminhoneiros</Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Planos</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold">Suporte</h3>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contato</Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Termos de Uso</Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold">Siga-nos</h3>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} FretesBrasil. Todos os direitos reservados.
            </div>
        </div>
    </footer>
);


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <HowItWorksSection />
        <AppSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
