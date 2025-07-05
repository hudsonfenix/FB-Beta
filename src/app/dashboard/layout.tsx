'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Truck,
  Calculator,
  Settings,
  LogOut,
  ChevronRight,
  Star
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarProvider,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" asChild isActive={isActive('/dashboard')}>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/freights" asChild isActive={isActive('/dashboard/freights')}>
                <Link href="/dashboard/freights">
                  <Truck />
                  Fretes
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/cost-calculator" asChild isActive={isActive('/dashboard/cost-calculator')}>
                <Link href="/dashboard/cost-calculator">
                  <Calculator />
                  Calcular Custo
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="m-4 mt-auto">
             <Card />
          </div>

        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                    <Settings />
                    Configurações
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/">
                        <LogOut />
                        Sair
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
           </SidebarMenu>
            <div className="flex items-center gap-2 border-t p-4">
                 <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">José da Silva</span>
                    <span className="text-xs text-muted-foreground">Motorista</span>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="min-h-svh p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function Card() {
  return (
    <div className="overflow-hidden rounded-lg bg-primary/10 group-data-[collapsible=icon]:hidden">
      <div className="p-4">
        <div className="flex items-center gap-2">
           <Star className="text-yellow-500 fill-yellow-400" />
           <h3 className="font-semibold text-sm">Seja VIP</h3>
        </div>
        <p className="mt-2 text-xs text-primary/80">
          Acesso prioritário aos fretes e mais cálculos de custo!
        </p>
      </div>
      <Link
        href="#"
        className="flex items-center justify-between bg-primary/20 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/30"
      >
        <span>Fazer upgrade</span>
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
