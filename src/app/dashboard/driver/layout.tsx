'use client'
import * as React from 'react'
import Link from 'next/link'
import {
  LogOut,
  User,
  ChevronDown,
  LayoutGrid,
  Settings,
  HelpCircle,
  Truck,
  Calculator,
  Lock,
} from 'lucide-react'
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ThemeToggle, ThemeToggleGroup } from '@/components/theme-toggle'

const navItems = [
  { href: "/dashboard/driver", icon: LayoutGrid, label: "Painel" },
  { href: "/dashboard/driver/freights", icon: Truck, label: "Ver Fretes" },
  { href: "/dashboard/driver/cost-calculator", icon: Calculator, label: "Calculadora de Custo", isVip: true },
];

const helpNavItems = [
    { href: "/dashboard/driver/settings", icon: Settings, label: "Configurações" },
    { href: "/dashboard/driver/help", icon: HelpCircle, label: "Ajuda" },
];

export default function DriverDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isVipUser = false; // Hardcoded to demonstrate the locked state.
  
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-svh">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isDisabled = item.isVip && !isVipUser;
                const menuButton = (
                  <SidebarMenuButton isActive={isActive(item.href)} disabled={isDisabled}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {isDisabled && <Lock className="ml-auto h-4 w-4" />}
                  </SidebarMenuButton>
                );

                return (
                  <SidebarMenuItem key={item.href}>
                    {isDisabled ? (
                       <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full cursor-not-allowed">
                            {menuButton}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Funcionalidade exclusiva para assinantes VIP</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Link href={item.href}>{menuButton}</Link>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-2 md:hidden">
                <ThemeToggleGroup />
            </div>
             <SidebarMenu>
                {helpNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                            <SidebarMenuButton isActive={isActive(item.href)}>
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-40 w-full border-b bg-card">
            <div className="relative flex h-16 items-center px-4 md:px-6">
              <div className="flex items-center gap-4">
                <div className="md:hidden">
                  <SidebarTrigger />
                </div>
              </div>
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
                  <Logo />
              </div>
              
              <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium md:flex">
                {/* Top nav can be added here if needed */}
              </nav>

              <div className="flex items-center ml-auto gap-2">
                <div className="hidden md:block">
                  <ThemeToggle />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span className="hidden md:inline">Olá, José da Silva</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Minha Conta (Motorista)</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/driver">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/driver/settings">Configurações</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
              {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
