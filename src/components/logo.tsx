import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <div className="text-xl font-bold font-headline">
        <span className="text-foreground">Fretes</span>
        <span className="text-primary">
          Brasil
        </span>
      </div>
    </Link>
  );
}
