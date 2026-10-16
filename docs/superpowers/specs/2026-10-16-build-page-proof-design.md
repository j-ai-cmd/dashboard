# Build page proof tiles: design

Date: 2026-10-16
Status: approved in chat, awaiting spec review

## Why

SaaSy Cookies (Jasmin Benioni) turned down Jai's quote for a Microsoft 365 project on 2026-10-16. Her feedback:

- Skills match fell short "mainly [on] proof of Microsoft builds". Power Automate, Copilot Studio and SharePoint were listed as skills, but no specific build showed them.
- She asked for "one or two concrete Microsoft case studies (the tenant, what you built, the outcome)".
- She advised quoting only where evidence exists.

On the current build pages a reader can't see which business the build was for, what feature was targeted, what was done inside each tool, what changed, or how deep Jai's knowledge of each tool goes. The OpenClaw page ends with "It worked for the firm."

## Goal

A reviewer reading any build page can answer, without asking:

1. Which business was this for (type, size, stack or tenant)?
2. Which feature or problem was targeted?
3. Which tools were touched, what was set up in each one, and what that changed?
4. What was the outcome?
5. What proof exists?

A reviewer working from a brief can match a brief line (for example "Entra app permissions") to a specific build.

## Constraints

- **Additive only.** All existing tiles and text stay: hero, What I built, Built with, What changed, How it runs, Results, How it helped. The 5 Microsoft sub-pages stay.
- **No invented facts.** Every new value is dictated by Jai. A field without data is omitted, never filled with a guess.
- No em dashes in copy. Firm names stay anonymised unless Jai says otherwise. No jdotai / j.ai branding.
- The OpenClaw build makes no Power Automate claim. Power Automate gets its own case study later, from a different job.

## Data model

All new fields on `Build` (src/data.ts) are optional, so builds without them render exactly as they do today.

```ts
export type ToolUse = { tool: string; setup: string; effect: string };
export type Proof = { kind: "image" | "video" | "link"; src: string; caption: string };

export type Build = {
  // ...existing fields unchanged
  snapshot?: { business?: string; stack?: string; role?: string; timeline?: string };
  feature?: string;           // one line: the exact feature targeted
  toolUses?: ToolUse[];       // one row per tool
  proof?: Proof[];
  demo?: string;              // "Can demo on a call: ..."
  tags?: string[];            // capability tags for brief matching
};
```

`stats` (existing) gets filled with real numbers where Jai has them.

## Page additions (BuildView, src/components/app/Views.tsx)

Rendered only when the field exists. Order, with existing tiles in brackets:

1. [Hero]
2. **Snapshot strip**: full width, 2 to 4 label/value cells (Business, Stack, My role, Timeline). Cells without data are skipped.
3. [What I built] + **Feature I targeted** (a line at the top of the What I built tile, labelled) | [Built with]
4. **Tool by tool**: full width. A table on desktop, stacked cards on mobile. Columns: Tool (with existing logo) · What I set up · What it changed.
5. [What changed] [How it runs]
6. [Results]: existing tile, now fed by `stats`.
7. **Proof**: images or video thumbnails with captions, links as buttons, then the `demo` line.
8. **Capability tags**: small chips, not links.
9. [How it helped the team]

The styling reuses `Tile`, `Label`, `fnScope` and the existing chip styles. No new colours or fonts.

## Overview Tools tile

The current tile is `OverviewTools`, which shows chips that filter builds via `#/?tool=X`. Additions:

- Each chip shows a count of the builds that use it.
- When a tool filter is active, one line under the chips states what Jai has done with that tool. The line is dictated (a `TOOL_NOTES: Record<string,string>` in src/content.ts). If there is no note, no line shows.
- A tool only gets a chip if at least one build lists it (true today, since chips come from `BUILDS`).

## Depth by build

- **Full set** (all new fields): openclaw-firmwide-workforce, smokeball-mcp-connector, clio-mcp-connector, hubspot-notion-two-way-sync, zoho-recruit-integration, sherlock-reel-pipeline.
- **Light set** (snapshot + toolUses, others if given): the remaining 25.
- Order of dictation: OpenClaw first, then the other 5 featured, then the light set.

## Content process

1. Jai answers a dictation form per build (OpenClaw first).
2. Claude transcribes the answers into data.ts verbatim, editing for length and no-em-dash only, and shows the diff.
3. Anything ambiguous or contradicting existing copy gets asked, not resolved silently.

## Testing

- `npm run build` passes (type check plus Vite build).
- A build with no new fields renders identically to today. Check with a screenshot of one light-set build before and after.
- The OpenClaw page renders all new tiles at desktop and at 375px width, with no horizontal scroll.
- The tool table is readable in both themes.

## Out of scope

- Rewriting existing copy.
- Merging or removing pages.
- The Power Automate case study (separate build entry, later).
- The PDF portfolio export.
