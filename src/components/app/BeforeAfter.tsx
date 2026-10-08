/* Custom component: no before/after slider ships in smoothui, amicro or bencho. */
import { useCallback, useRef, useState } from "react";

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="relative h-60 select-none overflow-hidden rounded-2xl border border-line bg-card sm:h-44"
        onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setFromX(e.clientX); }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => { dragging.current = false; }}
      >
        <div className="absolute inset-0 flex flex-col justify-center p-5 pb-14 pr-[calc(50%+1.25rem)]">
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Before</span>
          <p className="text-[15px] leading-snug">{before}</p>
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-center bg-surface p-5 pb-14 pl-[calc(50%+1.25rem)]"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <span className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">After</span>
          <p className="text-[15px] leading-snug">{after}</p>
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-foreground" style={{ left: `${pos}%` }} />
        <button
          type="button"
          role="slider"
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 10));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 10));
          }}
          className="absolute bottom-2 grid size-11 -translate-x-1/2 cursor-ew-resize place-items-center rounded-full border border-foreground bg-card text-sm font-semibold"
          style={{ left: `${pos}%` }}
        >
          ⇆
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Drag the handle, or use the arrow keys.</p>
    </div>
  );
}
