import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <div className="text-xl font-bold font-headline">
        <span className="text-foreground">Fretes</span>
        <span className="bg-gradient-to-r from-[#009B3A] via-[#FFCC29] to-[#0033A0] bg-clip-text text-transparent">
          Brasil
        </span>
      </div>
    </Link>
  );
}
