import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Home className="h-6 w-6 text-primary" />
      <span className={cn("text-xl font-bold font-headline tracking-tighter")}>
        NextHood
      </span>
    </div>
  );
}
