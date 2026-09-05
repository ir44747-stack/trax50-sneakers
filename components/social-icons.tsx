/** Brand glyphs (removed from lucide). Inline SVGs keep us dependency-free. */

export function InstagramGlyph({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function XGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.9 7.9L23.4 22h-6.4l-5-6.5L6.3 22H3.1l7.4-8.5L1.6 2H8l4.5 6 6.4-6Zm-1.1 18h1.8L7.1 3.9H5.2L17.8 20Z" />
    </svg>
  );
}
