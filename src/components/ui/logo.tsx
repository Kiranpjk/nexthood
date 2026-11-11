import { cn } from "@/lib/utils";

// Mark: a 3x3 block of city plots with one lit in marigold, "the block that fits you".
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-6 w-6", className)}>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}${c}`}
            x={c * 8.5}
            y={r * 8.5}
            width="7"
            height="7"
            rx="1.5"
            className={r === 1 && c === 2 ? "fill-highlight" : "fill-primary"}
          />
        ))
      )}
    </svg>
  );
}

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-headline text-xl font-bold tracking-tight text-primary">NextHood</span>
    </div>
  );
}
