'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Timer } from 'lucide-react'
import type { Freight } from '@/lib/freight-data'
import { cn } from '@/lib/utils'

const VIP_LOCK_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (totalSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

export function FreightTableRow({ freight }: { freight: Freight }) {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (!freight.isVip) return 0
    const elapsed = Date.now() - freight.postedAt.getTime()
    return VIP_LOCK_DURATION - elapsed
  })

  useEffect(() => {
    if (!freight.isVip || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(interval)
          return 0
        }
        return prevTime - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [freight.isVip, timeLeft])

  const isLocked = freight.isVip && timeLeft > 0

  return (
    <TableRow className={cn(isLocked && "bg-primary/5")}>
      <TableCell className="font-medium">{isLocked ? '***' : freight.origin}</TableCell>
      <TableCell>{isLocked ? '***' : freight.destination}</TableCell>
      <TableCell>{isLocked ? '***' : freight.vehicle}</TableCell>
      <TableCell>
        {isLocked ? (
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary shrink-0" />
            <div className="flex flex-col">
                <span className="font-semibold text-primary">Frete VIP Exclusivo</span>
                <span className="text-xs text-muted-foreground">Libera em: {formatTime(timeLeft)}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {freight.price}
            {freight.isVip && <Badge className="bg-accent text-accent-foreground hover:bg-accent/80">VIP</Badge>}
          </div>
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="outline" size="sm" asChild disabled={isLocked}>
          <Link href={`/dashboard/freights/${freight.id}`}>
            Ver Detalhes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}
