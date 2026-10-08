import { Building2, Megaphone, Scale, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

export const FN_ICON: Record<string, LucideIcon> = {
  Admin: Building2,
  Sales: TrendingUp,
  Recruitment: Users,
  Marketing: Megaphone,
  Legal: Scale,
};

// Re-points the ink and surface tokens at a function's colours, so anything inside picks them up
export const fnScope = (fn: string): CSSProperties => {
  const k = fn.toLowerCase();
  return { "--color-text": `var(--fn-${k})`, "--color-surface": `var(--fn-${k}-tint)` } as CSSProperties;
};
export const fnSolid = (fn: string): CSSProperties => ({ background: `var(--fn-${fn.toLowerCase()})` });
