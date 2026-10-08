import { Mail, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedTabs from "@/components/smoothui/animated-tabs";
import BasicAccordion from "@/components/smoothui/basic-accordion";
import { BUILDS } from "@/data";
import { FUNCTIONS, PROFILE } from "@/content";
import type { Route } from "@/useHashRoute";
import { cn } from "@/lib/utils";
import { FN_ICON } from "./icons";

export function Sidebar({ route, onNavigate }: { route: Route; onNavigate?: () => void }) {
  const [q, setQ] = useState("");
  const [fn, setFn] = useState("all");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return BUILDS.filter((b) => (fn === "all" || b.fn.toLowerCase() === fn) &&
      (!s || [b.title, b.fn, ...b.tools].join(" ").toLowerCase().includes(s)));
  }, [q, fn]);

  const activeId = route.view === "build" ? route.id : null;
  const listRef = useRef<HTMLDivElement>(null);
  // keep the open build visible in the index
  useEffect(() => {
    listRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }, [activeId]);
  const link = (href: string, label: string, active: boolean) => (
    <a href={href} onClick={onNavigate}
      className={cn("block rounded-lg px-3 py-2 text-[15px] transition-colors hover:bg-surface",
        active && "bg-surface font-semibold shadow-[inset_3px_0_0_var(--color-text)]")}
      aria-current={active ? "page" : undefined}>{label}</a>
  );

  const groups = FUNCTIONS.map((f) => ({ f, items: filtered.filter((b) => b.fn === f.name) })).filter((g) => g.items.length);

  return (
    <nav aria-label="Portfolio index" className="flex h-full flex-col gap-4 p-5">
      <a href="#/" onClick={onNavigate} className="block">
        <div className="font-display text-2xl leading-snug">{PROFILE.name}</div>
        <div className="text-sm text-muted-foreground">{PROFILE.title}</div>
      </a>

      <div className="space-y-1">
        {link("#/", "Overview", route.view === "overview")}
        {link("#/contact", "Contact", route.view === "contact")}
      </div>

      <label className="relative block">
                <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search builds or tools" aria-label="Search builds or tools"
          className="h-11 w-full rounded-xl border border-muted-foreground/50 bg-card pl-9 pr-9 text-[15px] placeholder:text-muted-foreground" />
        {q && (
          <button type="button" aria-label="Clear search" onClick={() => setQ("")}
            className="absolute right-1 top-1/2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-lg hover:bg-surface">
            <X className="size-4" />
          </button>
        )}
      </label>

      <div>
        <AnimatedTabs variant="pill" className="flex-wrap rounded-2xl" activeTab={fn} onChange={setFn}
          tabs={[{ id: "all", label: "All" }, ...FUNCTIONS.map((f) => ({ id: f.id, label: f.name }))]} />
      </div>

      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto pr-1">
        {groups.length === 0 ? (
          <div className="rounded-xl border border-line bg-card p-4 text-sm">
            <p className="font-semibold">No builds match “{q}”.</p>
            <p className="mt-1 text-muted-foreground">Try a tool name like HubSpot, Teams or Smokeball.</p>
          </div>
        ) : (
          <BasicAccordion allowMultiple defaultExpandedIds={groups.map((g) => g.f.id)}
            items={groups.map(({ f, items }) => {
              const Icon = FN_ICON[f.name];
              return {
                id: f.id,
                title: `${f.name} · ${items.length}`,
                content: (
                  <div className="space-y-0.5 pb-2">
                    <a href={`#/function/${f.id}`} onClick={onNavigate}
                      className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface",
                        route.view === "function" && route.fn === f.id && "bg-surface font-semibold text-foreground")}>
                      <Icon aria-hidden className="size-4" /> All {f.name.toLowerCase()} builds
                    </a>
                    {items.map((b) => link(`#/build/${b.id}`, b.title, activeId === b.id))}
                  </div>
                ),
              };
            })} />
        )}
      </div>

      <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm hover:bg-surface">
        <Mail aria-hidden className="size-4" /> {PROFILE.email}
      </a>
    </nav>
  );
}
