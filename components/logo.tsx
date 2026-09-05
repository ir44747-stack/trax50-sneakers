import { site } from "@/lib/site";

/** Inline SVG mark + wordmark. Inline = crisp, no external asset dependency. */
export function LogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* angular "T" sneaker-inspired mark */}
      <path
        d="M5 8h38l-7 32H22l2.2-9.5H12L5 8Z"
        fill="currentColor"
        className="text-foreground"
      />
      <path
        d="M12 24.5h12.5L26.5 18H9.6L12 24.5Z"
        fill="#D6FF3F"
      />
      <path
        d="M15.2 31.5H28l1.6-7H13.4l1.8 7Z"
        fill="#D6FF3F"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative grid place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/30 p-2">
        <LogoMark className="h-5 w-5 text-foreground" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            TRAX<span className="text-primary">.50</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-muted-foreground">
            {site.tagline.split(" ")[0]}
          </span>
        </span>
      )}
    </span>
  );
}
