import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.4em] text-primary">
        Error 404
      </p>
      <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        These kicks <span className="text-primary">already sold out.</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you&apos;re looking for is gone. Let&apos;s get you back to the
        drops that are still in stock.
      </p>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/drops">Back to the drops</Link>
        </Button>
      </div>
    </div>
  );
}
