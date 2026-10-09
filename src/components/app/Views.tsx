import { ArrowLeft, ArrowRight, Check, ExternalLink, Link2, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedTabs from "@/components/smoothui/animated-tabs";
import { ScrollReveal } from "@/components/amicro/scroll-reveal";
import { BUILDS, type Build } from "@/data";
import { FUNCTIONS, PROFILE } from "@/content";
import { BeforeAfter } from "./BeforeAfter";
import { Flow } from "./Flow";
import { StatCard } from "./StatCard";
import { FN_ICON, fnScope, fnSolid } from "./icons";

const Label = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{children}</h3>
);
const Tile = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <section style={style} className={`min-w-0 overflow-hidden rounded-3xl border border-line bg-card/70 p-5 sm:p-6 ${className}`}>{children}</section>
);
// className lands on the wrapper, which is the grid item, so col-span classes go here
const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return <ScrollReveal className={className} duration={0.35} yOffset={12} scale={1}>{children}</ScrollReveal>;
};

// Logo file per tool (public/logos). Tools without one show the name only.
const LOGO: Record<string, string> = {
  "Apollo.io": "apollo.svg", "ChatGPT image model": "openai.svg", Claude: "claude.svg", "Clio API": "clio.png", DocuSign: "docusign.svg",
  "Excel sheets": "excel.svg", Fireflies: "fireflies.png", Gmail: "gmail.svg", GoHighLevel: "gohighlevel.png", HubSpot: "hubspot.svg",
  HyperFrames: "hyperframes.svg", Instagram: "instagram.svg", Kimi: "kimi.svg", "Kommo CRM": "kommo.png", "Kommo workflows": "kommo.png",
  "LinkedIn data": "linkedin.svg", MCP: "mcp.svg", "Make.com": "make.svg", "Meta Ads": "meta.svg", "Microsoft 365": "microsoft-365.svg",
  "Microsoft Entra": "entra.svg", "Microsoft Teams": "teams.svg", Notion: "notion.svg", OpenClaw: "openclaw.svg", Outlook: "outlook.svg",
  "Power BI": "powerbi.svg", Python: "python.svg", "Python (FastMCP)": "python.svg", Salesforce: "salesforce.svg", SharePoint: "sharepoint.svg",
  "Smokeball API": "smokeball.png", "Zoho Recruit": "zoho.svg",
};

// Tool chips; each one filters the work explorer to the builds that use that tool
const toolHref = (t: string) => `#/?tool=${encodeURIComponent(t)}`;
function ToolsSlot({ tools, active }: { tools: string[]; active?: string | null }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map((t) => (
        <li key={t}>
          <a href={toolHref(t)} aria-pressed={active === t}
            className={`inline-flex min-h-9 items-center gap-2 rounded-full border py-1 pr-3 text-sm font-medium transition-colors ${LOGO[t] ? "pl-1.5" : "pl-3"} ${active === t ? "border-foreground bg-surface" : "border-line bg-card hover:border-foreground/50"}`}>
            {LOGO[t] && <img src={`./logos/${LOGO[t]}`} alt="" aria-hidden width={22} height={22} loading="lazy" className="size-[22px] shrink-0 object-contain" />}
            {t}
          </a>
        </li>
      ))}
    </ul>
  );
}

// Named products used across builds (skips generic labels like "Email" or "Workflows"), most used first
const PRODUCTS = new Set(["Excel sheets", "LinkedIn data", "Claude", "OpenClaw", "Kimi", "MCP", "Smokeball API", "Clio API", "HubSpot", "Notion", "Salesforce", "GoHighLevel",
  "Kommo CRM", "Apollo.io", "Zoho Recruit", "Microsoft 365", "Microsoft Teams", "Microsoft Entra", "SharePoint", "Outlook", "Power BI",
  "Gmail", "Make.com", "DocuSign", "Fireflies", "Meta Ads", "ChatGPT image model", "HyperFrames", "Python", "Instagram"]);
const ALL_TOOLS = (() => {
  const count = new Map<string, number>();
  BUILDS.forEach((b) => b.tools.forEach((t) => PRODUCTS.has(t) && count.set(t, (count.get(t) ?? 0) + 1)));
  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
})();

// The builds the bio names as the biggest
const FEATURED = ["openclaw-firmwide-workforce", "smokeball-mcp-connector", "clio-mcp-connector", "hubspot-notion-two-way-sync", "zoho-recruit-integration", "sherlock-reel-pipeline"]
  .map((id) => BUILDS.find((b) => b.id === id)!).filter(Boolean);

function BuildCard({ b, hideFn = false }: { b: Build; hideFn?: boolean }) {
  const Icon = FN_ICON[b.fn];
  return (
    <a href={`#/build/${b.id}`} className="group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:bg-surface">
      <div style={fnScope(b.fn)} className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
        <span className="grid size-7 place-items-center rounded-lg bg-surface"><Icon aria-hidden className="size-4" /></span> {hideFn ? b.source : `${b.fn} + ${b.source}`}
      </div>
      <div className="font-display text-xl leading-[1.35]">{b.title}</div>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.helped}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Open build <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
    </a>
  );
}

function About() {
  const [more, setMore] = useState(false);
  const [first, ...rest] = PROFILE.bio;
  return (
    <div>
      <p>{first}</p>
      <AnimatePresence initial={false}>
        {more && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            {rest.map((p, i) => <p key={i} className="mt-3">{p}</p>)}
          </motion.div>
        )}
      </AnimatePresence>
      {rest.length > 0 && (
        <button type="button" onClick={() => setMore((m) => !m)} aria-expanded={more}
          className="mt-3 inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold underline underline-offset-4 hover:no-underline">
          {more ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

const toolFromHash = () => {
  const q = window.location.hash.split("?")[1];
  return q ? new URLSearchParams(q).get("tool") : null;
};

// One place to browse every build: function tabs, plus an optional tool filter from the URL (#/?tool=HubSpot)
function WorkExplorer() {
  const [tab, setTab] = useState("featured");
  const [tool, setTool] = useState<string | null>(toolFromHash);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const sync = () => {
      const t = toolFromHash();
      setTool(t);
      if (t) setTimeout(() => ref.current?.scrollIntoView({ block: "start" }), 300);
    };
    if (toolFromHash()) sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const items = useMemo(() => {
    if (tool) return BUILDS.filter((b) => b.tools.includes(tool));
    if (tab === "featured") return FEATURED;
    if (tab === "all") return BUILDS;
    return BUILDS.filter((b) => b.fn.toLowerCase() === tab);
  }, [tab, tool]);
  const fnTab = !tool && FUNCTIONS.some((f) => f.id === tab);
  return (
    <section ref={ref} className="scroll-mt-20 rounded-3xl border border-line bg-card/70 p-5 sm:p-6">
      <Label>Work</Label>
      <AnimatedTabs variant="pill" className="flex-wrap rounded-2xl" activeTab={tool ? "" : tab}
        onChange={(id) => { setTab(id); if (tool) window.location.hash = "#/"; }}
        tabs={[{ id: "featured", label: "Featured" }, { id: "all", label: "All" }, ...FUNCTIONS.map((f) => ({ id: f.id, label: f.name }))]} />
      {tool && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">{items.length} builds use</span>
          <a href="#/" className="inline-flex min-h-9 items-center gap-2 rounded-full bg-foreground px-3 font-semibold text-white" aria-label={`Clear ${tool} filter`}>
            {LOGO[tool] && <img src={`./logos/${LOGO[tool]}`} alt="" className="size-5 rounded-full bg-white object-contain p-0.5" />}{tool}<span aria-hidden>×</span>
          </a>
        </div>
      )}
      <motion.div layout className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((b) => (
            <motion.div key={b.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }}>
              <BuildCard b={b} hideFn={fnTab} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

// Tools list that marks the tool currently filtering the explorer
function OverviewTools() {
  const [tool, setTool] = useState<string | null>(toolFromHash);
  useEffect(() => {
    const on = () => setTool(toolFromHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return <ToolsSlot tools={ALL_TOOLS} active={tool} />;
}

export function Overview() {
  return (
    <div className="space-y-6">
      <Reveal>
        <header className="grid gap-6 rounded-3xl bg-foreground p-6 text-white sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">{PROFILE.title}</p>
            <h1 className="font-display text-3xl leading-[1.3] pb-1 sm:text-4xl md:text-5xl">{PROFILE.headline}</h1>
            <p className="mt-4 text-white/85">{PROFILE.name} · {PROFILE.location}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${PROFILE.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-[15px] font-semibold text-foreground hover:bg-white/90"><Mail aria-hidden className="size-4" />{PROFILE.email}</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/50 px-4 text-[15px] font-semibold hover:bg-white/10"><ExternalLink aria-hidden className="size-4" />LinkedIn</a>
            </div>
          </div>
          <img src="./photo.png" alt={PROFILE.name} className="order-first size-24 rounded-2xl border border-white/20 object-cover md:order-none md:size-44 md:rounded-3xl" />
        </header>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-3"><Tile className="h-full"><Label>About</Label><About /></Tile></Reveal>
        <Reveal className="lg:col-span-2"><Tile className="h-full">
          <Label>Experience</Label>
          <ol className="relative ml-2 border-l border-line">
            {PROFILE.experience.map((e) => (
              <li key={e.role} className="mb-5 ml-5 last:mb-0">
                <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-foreground" />
                <p className="font-semibold">{e.role}</p>
                <p className="text-sm text-muted-foreground">{e.org} · {e.when}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 border-t border-line pt-4">
            <Label>Education</Label>
            <p className="font-semibold">{PROFILE.education.degree}</p>
            <p className="text-sm text-muted-foreground">{PROFILE.education.school} · {PROFILE.education.when}</p>
          </div>
        </Tile></Reveal>
      </div>

      <Reveal><WorkExplorer /></Reveal>

      <Reveal><Tile>
        <Label>How I work</Label>
        <div className="grid gap-4 md:grid-cols-3">
          {PROFILE.howIWork.map((s, i) => (
            <div key={s.step} className="rounded-2xl border border-line bg-card p-5">
              <div className="text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-display text-2xl">{s.step}</div>
              <p className="mt-1 text-muted-foreground">{s.line}</p>
            </div>
          ))}
        </div>
      </Tile></Reveal>

      <Reveal><Tile><Label>Tools</Label><OverviewTools /></Tile></Reveal>

    </div>
  );
}

export function FunctionView({ fnId }: { fnId: string }) {
  const f = FUNCTIONS.find((x) => x.id === fnId) ?? FUNCTIONS[0];
  const Icon = FN_ICON[f.name];
  const items = BUILDS.filter((b) => b.fn === f.name);
  return (
    <div className="space-y-6">
      <header className="rounded-3xl p-8 text-white" style={fnSolid(f.name)}>
        <Icon aria-hidden className="mb-4 size-7" />
        <h1 className="font-display text-5xl leading-[1.3] pb-1">{f.name}</h1>
        {f.line && <p className="mt-2 text-lg text-white/85">{f.line}</p>}
        <p className="mt-4 text-sm font-semibold">{items.length} builds</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((b) => <Reveal key={b.id}><BuildCard b={b} hideFn /></Reveal>)}
      </div>
    </div>
  );
}

// Copies the build's share link (/b/<id>/), which has its own link preview image
function CopyLink({ id }: { id: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}/b/${id}/`); setDone(true); setTimeout(() => setDone(false), 1800); } catch { /* clipboard blocked */ }
  };
  return (
    <button type="button" onClick={copy} className="mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/50 px-4 text-[15px] font-semibold hover:bg-white/10">
      {done ? <Check aria-hidden className="size-4" /> : <Link2 aria-hidden className="size-4" />}
      <span aria-live="polite">{done ? "Link copied" : "Copy link"}</span>
    </button>
  );
}

export function BuildView({ id }: { id: string }) {
  const i = Math.max(0, BUILDS.findIndex((b) => b.id === id));
  const b = BUILDS[i];
  const prev = BUILDS[i - 1];
  const next = BUILDS[i + 1];
  const Icon = FN_ICON[b.fn];
  return (
    <article className="space-y-6">
      <header className="rounded-3xl p-6 text-white sm:p-8" style={fnSolid(b.fn)}>
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
          <Icon aria-hidden className="size-4" /> {b.fn} + {b.source}
        </div>
        <h1 className="font-display text-3xl leading-[1.3] pb-1 break-words sm:text-4xl md:text-5xl">{b.title}</h1>
        <p className="mt-4 max-w-3xl text-lg">{b.problem}</p>
        <CopyLink id={b.id} />
      </header>

      <div className="grid gap-6 lg:grid-cols-6">
        <Tile className="lg:col-span-4"><Label>What I built</Label><p>{b.build}</p></Tile>
        <Tile className="lg:col-span-2"><Label>Built with</Label><ToolsSlot tools={b.tools} /></Tile>
        <Tile className="lg:col-span-6" style={fnScope(b.fn)}><Label>What changed</Label><BeforeAfter before={b.before} after={b.after} /></Tile>
        <Tile className="lg:col-span-6" style={fnScope(b.fn)}><Label>How it runs</Label><Flow steps={b.flow} /></Tile>
        {b.stats.length > 0 && (
          <Tile className="lg:col-span-6" style={fnScope(b.fn)}>
            <Label>Results</Label>
            <div className="grid gap-4 sm:grid-cols-3">{b.stats.map((s) => <StatCard key={s.raw + s.label} s={s} />)}</div>
          </Tile>
        )}
        <Tile className="lg:col-span-6 border-transparent bg-surface text-foreground" style={fnScope(b.fn)}><Label>How it helped the team</Label><p className="font-display text-2xl leading-snug md:text-3xl">{b.helped}</p></Tile>
      </div>

      <nav aria-label="More builds" className="grid gap-4 sm:grid-cols-2">
        {prev ? <a href={`#/build/${prev.id}`} className="flex items-center gap-3 rounded-2xl border border-line p-4 hover:bg-surface"><ArrowLeft className="size-5 shrink-0" /><span><span className="block text-xs text-muted-foreground">Previous</span>{prev.title}</span></a> : <span />}
        {next && <a href={`#/build/${next.id}`} className="flex items-center justify-end gap-3 rounded-2xl border border-line p-4 text-right hover:bg-surface"><span><span className="block text-xs text-muted-foreground">Next</span>{next.title}</span><ArrowRight className="size-5 shrink-0" /></a>}
      </nav>
    </article>
  );
}
