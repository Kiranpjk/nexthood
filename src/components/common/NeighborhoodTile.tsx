import { cn } from '@/lib/utils';

// Airport-style codes give each city a short, recognisable tag on the tile.
const CITY_CODES: Record<string, string> = {
  Bengaluru: 'BLR',
  Mumbai: 'BOM',
  'New Delhi': 'DEL',
  Gurugram: 'GGN',
  Chennai: 'MAA',
  Pune: 'PNQ',
  Hyderabad: 'HYD',
  Kolkata: 'CCU',
};

// Small deterministic PRNG so a neighborhood always draws the same street plan.
function seeded(text: string) {
  let a = [...text].reduce((h, ch) => Math.imul(h ^ ch.charCodeAt(0), 2654435761), 1779033703);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cuts(rand: () => number, total: number, min: number, spread: number) {
  const out = [0];
  while (out[out.length - 1] < total) out.push(out[out.length - 1] + min + rand() * spread);
  return out;
}

interface NeighborhoodTileProps {
  name: string;
  city: string;
  className?: string;
}

/** A generated street-plan tile: stands in for photos without any network image. */
export default function NeighborhoodTile({ name, city, className }: NeighborhoodTileProps) {
  const rand = seeded(name + city);
  const W = 400;
  const H = 240;
  const xs = cuts(rand, W, 46, 54);
  const ys = cuts(rand, H, 34, 40);
  const blocks: { x: number; y: number; w: number; h: number; tone: number }[] = [];
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = 0; j < ys.length - 1; j++) {
      blocks.push({ x: xs[i], y: ys[j], w: xs[i + 1] - xs[i], h: ys[j + 1] - ys[j], tone: rand() });
    }
  }
  const inner = blocks.filter((b) => b.x > 40 && b.y > 30 && b.x + b.w < W - 20 && b.y + b.h < H - 20);
  const lit = (inner.length ? inner : blocks)[Math.floor(rand() * (inner.length || blocks.length))];
  const roadY = 60 + rand() * 120;
  const roadTilt = (rand() - 0.5) * 140;
  const code = CITY_CODES[city] ?? city.slice(0, 3).toUpperCase();

  return (
    <div className={cn('relative overflow-hidden bg-secondary', className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {blocks.map((b, i) =>
          b.tone > 0.55 ? (
            <rect key={i} x={b.x + 3} y={b.y + 3} width={b.w - 6} height={b.h - 6} rx="3" className="fill-secondary-strong" opacity={b.tone > 0.8 ? 0.9 : 0.5} />
          ) : null
        )}
        <rect x={lit.x + 3} y={lit.y + 3} width={lit.w - 6} height={lit.h - 6} rx="3" className="fill-highlight" />
        <path
          d={`M -20 ${roadY} C ${W * 0.35} ${roadY + roadTilt}, ${W * 0.65} ${roadY - roadTilt}, ${W + 20} ${roadY + roadTilt / 3}`}
          className="stroke-primary"
          strokeWidth="5"
          fill="none"
          opacity="0.85"
        />
        <circle cx={lit.x + lit.w / 2} cy={lit.y + lit.h / 2} r="4" className="fill-primary" />
      </svg>
      <span className="absolute left-3 top-3 rounded bg-background/90 px-1.5 py-0.5 font-headline text-xs font-bold tracking-[0.08em] text-primary">
        {code}
      </span>
    </div>
  );
}
