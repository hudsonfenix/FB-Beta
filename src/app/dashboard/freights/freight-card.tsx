'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Send, HandCoins } from 'lucide-react'
import type { Freight } from '@/lib/freight-data'
import { cn } from '@/lib/utils'

const VIP_LOCK_DURATION = 30 * 60 * 1000 // 30 minutes

function formatTime(ms: number | null) {
    if (ms === null) return 'Calculando...';
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function FreightCard({ freight }: { freight: Freight }) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!freight.isVip) {
        setTimeLeft(0);
        return;
    }

    const calculateRemaining = () => VIP_LOCK_DURATION - (Date.now() - freight.postedAt.getTime());

    setTimeLeft(calculateRemaining());

    const intervalId = setInterval(() => {
        const remaining = calculateRemaining();
        if (remaining <= 0) {
            clearInterval(intervalId);
            setTimeLeft(0);
        } else {
            setTimeLeft(remaining);
        }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [freight.isVip, freight.postedAt]);

  const isLocked = freight.isVip && (timeLeft === null || timeLeft > 0);

  const handleCardClick = () => {
    if (!isLocked) {
      router.push(`/dashboard/freights/${freight.id}`);
    }
  }
  
  const handleActionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
  }

  return (
    <Card 
        className={cn("hover:shadow-lg transition-shadow cursor-pointer", isLocked && "bg-muted/50 opacity-80 cursor-not-allowed")}
        onClick={handleCardClick}
    >
      <div className="p-4 relative">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 flex flex-col items-center justify-start text-center pt-1">
            <Image 
              src={freight.company.logoUrl} 
              alt={`Logo ${freight.company.name}`} 
              width={80} 
              height={40}
              className="rounded-md object-contain mb-2"
              data-ai-hint="company logo"
            />
            {isLocked ? (
                <span className="text-sm font-bold text-primary">{formatTime(timeLeft)}</span>
            ) : (
              <span className="text-xs text-muted-foreground">{freight.details.addedAt}</span>
            )}
          </div>
          
          <div className="col-span-6">
            <div className="flex gap-4 h-full">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 mt-1 rounded-full border-2 border-primary"></div>
                <div className="flex-1 w-px bg-border my-1"></div>
                <div className="w-3 h-3 border-2 border-primary bg-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
              </div>
              <div className="flex flex-col justify-between w-full">
                <div>
                  <p className="font-semibold">{freight.origin}</p>
                  <p className="font-semibold">{freight.destination}</p>
                </div>
                 <div className="flex items-center gap-2 flex-wrap mt-2">
                    <Badge variant="outline">{freight.details.product}</Badge>
                    <Badge variant="outline">{freight.details.km} km</Badge>
                    <Badge variant="outline">{freight.vehicle.split(',')[0]}</Badge>
                 </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col justify-between items-end text-right">
              <div className="text-right">
                {isLocked ? (
                    <p className="text-lg font-bold text-foreground">R$ ***,**</p>
                ) : (
                  <p className="text-lg font-bold text-foreground">{freight.price}</p>
                )}
                {freight.isVip && (
                    <p className="text-xs font-bold text-primary mt-1">APENAS VIP!</p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" disabled={isLocked} onClick={handleActionClick}>
                      <HandCoins className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" disabled={isLocked} onClick={handleActionClick}>
                      <Send className="h-4 w-4" />
                  </Button>
              </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
