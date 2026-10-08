import { ArrowLeft, ArrowRight, ExternalLink, Mail } from "lucide-react";
import { useReducedMotion } from "motion/react";
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

function ToolsSlot({ tools }: { tools: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map((t) => (
        <li key={t} className={`inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-card py-1 pr-3 text-sm font-medium ${LOGO[t] ? "pl-1.5" : "pl-3"}`}>
          {LOGO[t] && <img src={`./logos/${LOGO[t]}`} alt="" aria-hidden width={22} height={22} loading="lazy" className="size-[22px] shrink-0 object-contain" />}
          {t}
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

function BuildCard({ b }: { b: Build }) {
  const Icon = FN_ICON[b.fn];
  return (
    <a href={`#/build/${b.id}`} className="group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:bg-surface">
      <div style={fnScope(b.fn)} className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
        <span className="grid size-7 place-items-center rounded-lg bg-surface"><Icon aria-hidden className="size-4" /></span> {b.fn} + {b.source}
      </div>
      <div className="font-display text-xl leading-[1.35]">{b.title}</div>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.helped}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Open build <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
    </a>
  );
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
        <Reveal className="lg:col-span-3"><Tile className="h-full"><Label>About</Label>{PROFILE.bio.map((p, i) => <p key={i} className="mb-3 last:mb-0">{p}</p>)}</Tile></Reveal>
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

      <Reveal><Tile>
        <Label>Biggest builds</Label>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{FEATURED.map((b) => <BuildCard key={b.id} b={b} />)}</div>
      </Tile></Reveal>

      <Reveal>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {FUNCTIONS.map((f) => {
            const Icon = FN_ICON[f.name];
            const n = BUILDS.filter((b) => b.fn === f.name).length;
            return (
              <a key={f.id} href={`#/function/${f.id}`} style={fnScope(f.name)} className="flex cursor-pointer flex-col rounded-2xl border border-transparent bg-surface p-5 text-foreground transition-colors hover:border-foreground/40">
                <Icon aria-hidden className="mb-3 size-5" />
                <div className="font-display text-xl">{f.name}</div>
                {f.line && <p className="mt-1 text-sm">{f.line}</p>}
                <p className="mt-auto pt-3 text-sm font-semibold">{n} builds</p>
              </a>
            );
          })}
        </div>
      </Reveal>

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

      <Reveal><Tile><Label>Tools</Label><ToolsSlot tools={ALL_TOOLS} /></Tile></Reveal>

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
        {items.map((b) => <Reveal key={b.id}><BuildCard b={b} /></Reveal>)}
      </div>
    </div>
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

export function Contact() {
  return (
    <div className="rounded-3xl border border-line bg-card/70 p-8 md:p-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Contact</p>
      <h1 className="font-display text-5xl leading-[1.3] pb-1">{PROFILE.name}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{PROFILE.title} · {PROFILE.location}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 rounded-2xl border border-line bg-card p-5 hover:bg-surface"><Mail className="size-5" />{PROFILE.email}</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-line bg-card p-5 hover:bg-surface"><ExternalLink className="size-5" />{PROFILE.linkedinLabel}</a>
      </div>
    </div>
  );
}
