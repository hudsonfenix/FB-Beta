import { Truck } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <Truck className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold text-primary font-headline">RotaConecta</span>
    </Link>
  );
}
