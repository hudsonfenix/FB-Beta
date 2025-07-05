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
  Star,
  User,
  ChevronDown
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-svh">
        <header className="sticky top-0 z-40 w-full border-b bg-card">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                 <SidebarTrigger />
              </div>
              <Logo />
              <nav className="hidden items-center gap-6 md:flex text-sm font-medium">
                <Link href="/dashboard/freights" className={cn("transition-colors hover:text-primary", isActive('/dashboard/freights') ? 'text-primary' : 'text-muted-foreground')}>
                  Fretes
                </Link>
                <Link href="/dashboard/cost-calculator" className={cn("transition-colors hover:text-primary", isActive('/dashboard/cost-calculator') ? 'text-primary' : 'text-muted-foreground')}>
                  Atendimento
                </Link>
              </nav>
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
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                 <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
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
        </header>
        <div className="flex-1">
          <main className="p-4 md:p-6 lg:p-8">
              {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
