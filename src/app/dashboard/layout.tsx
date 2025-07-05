'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  LogOut,
  User,
  ChevronDown
} from 'lucide-react'
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
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
          <div className="relative flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                 <SidebarTrigger />
              </div>
              <Logo />
            </div>
            
            <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium md:flex">
              <Link href="/dashboard/freights" className={cn("transition-colors hover:text-primary", isActive('/dashboard/freights') ? 'text-primary' : 'text-muted-foreground')}>
                Fretes
              </Link>
              <Link href="/dashboard/cost-calculator" className={cn("transition-colors hover:text-primary", isActive('/dashboard/cost-calculator') ? 'text-primary' : 'text-muted-foreground')}>
                Atendimento
              </Link>
            </nav>

            <div className="flex items-center">
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

          </div>
        </header>
        <div className="flex-1">
          <main>
              {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
