import NumberFlowLib from "@number-flow/react";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/data";

export function StatCard({ s }: { s: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce || s.num === null ? s.num ?? 0 : 0);
  useEffect(() => { if (inView && s.num !== null) setVal(s.num); }, [inView, s.num]);
  return (
    <div ref={ref} className="rounded-2xl border border-line bg-card p-5">
      <div className="font-display text-4xl leading-[1.3] pb-1">
        {s.num === null ? s.raw : (
          <>
            {s.prefix}
            <NumberFlowLib value={val} transformTiming={{ duration: reduce ? 0 : 900, easing: "ease-out" }} />
            {s.suffix}
          </>
        )}
      </div>
      <p className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</p>
    </div>
  );
}
