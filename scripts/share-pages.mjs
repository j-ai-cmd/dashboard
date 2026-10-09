// Writes public/b/<id>/index.html for every build: a tiny page with its own link preview
// (title, description, image) that forwards visitors to the build inside the app (/#/build/<id>).
// Chat apps and social sites ignore everything after '#', so each build needs a real path for its preview.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const SITE = "https://jai-dhingra.vercel.app";
const src = readFileSync(new URL("../src/data.ts", import.meta.url), "utf8");
const start = src.indexOf("BUILDS:Build[]=") + "BUILDS:Build[]=".length;
const builds = JSON.parse(src.slice(start, src.lastIndexOf("]") + 1));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const b of builds) {
  const dir = new URL(`../public/b/${b.id}/`, import.meta.url);
  mkdirSync(dir, { recursive: true });
  const img = existsSync(new URL(`../public/og/${b.id}.jpg`, import.meta.url)) ? `${SITE}/og/${b.id}.jpg` : `${SITE}/og/site.jpg`;
  const title = `${b.title} · Jai Dhingra`;
  const target = `/#/build/${b.id}`;
  writeFileSync(new URL("index.html", dir), `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(b.helped)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(b.helped)}">
<meta property="og:image" content="${img}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:url" content="${SITE}/b/${b.id}/">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="${SITE}${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)})</script>
</head><body><a href="${target}">${esc(b.title)}</a></body></html>
`);
}
console.log(`share pages: ${builds.length}`);
