// Construit les deux versions d'English Master à partir de src/ :
//   index.html          → version GitHub Pages (document complet, hors ligne, micro de Safari)
//   dist/artifact.html  → version claude.ai (fragment de page, coach Claude et sauvegarde du compte)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const css = read("./src/styles.css");
import { existsSync } from "node:fs";
const audioManifest = existsSync(new URL("./audio/manifest.json", import.meta.url)) ? read("./audio/manifest.json") : "null";
const js = ["window.EM_AUDIO = " + audioManifest + ";", read("./src/content.js"), read("./src/engine.js"), read("./src/app.js")].join("\n");
const version = createHash("sha1").update(css + js).digest("hex").slice(0, 8);

const fonts = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;700&display=swap">';
const body = '<main id="app" aria-live="off"></main>\n<nav id="nav" class="nav" aria-label="Navigation principale" hidden></nav>\n<div id="toast" class="toast" role="status" aria-live="polite" hidden></div>';

const fragment = `<title>English Master</title>
<meta name="claude:viewport-fit-sides" content="cover">
${fonts}
<style>
${css}
</style>
${body}
<script>
${js}
</script>
`;

const page = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>English Master</title>
<meta name="description" content="Apprendre l’anglais avec des leçons vidéo adaptées à ton niveau, de l’oral, un coach et un suivi calé sur l’alternance.">
<meta name="theme-color" content="#0A0A0A">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="English Master">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="icon-192.png">
<link rel="manifest" href="manifest.webmanifest">
${fonts}
<style>
${css}
html { padding-top: env(safe-area-inset-top, 0px); }
</style>
</head>
<body>
${body}
<script>
${js}
</script>
</body>
</html>
`;

const sw = `/* English Master — cache hors ligne (version ${version}) */
const CACHE = "em-${version}";
const ASSETS = ["./", "./index.html", "./icon-180.png", "./icon-192.png", "./manifest.webmanifest"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin || u.pathname.includes("/audio/")) return;
  e.respondWith(
    fetch(e.request)
      .then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {}); return r; })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
  );
});
`;

const manifest = {
  name: "English Master",
  short_name: "English Master",
  description: "Apprendre l’anglais : leçons, oral, coach et suivi par périodes.",
  start_url: "./",
  scope: "./",
  display: "standalone",
  background_color: "#0A0A0A",
  theme_color: "#0A0A0A",
  lang: "fr",
  icons: [
    { src: "icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "icon-512.png", sizes: "512x512", type: "image/png" }
  ]
};

mkdirSync(new URL("./dist/", import.meta.url), { recursive: true });
writeFileSync(new URL("./index.html", import.meta.url), page);
writeFileSync(new URL("./dist/artifact.html", import.meta.url), fragment);
writeFileSync(new URL("./sw.js", import.meta.url), sw);
writeFileSync(new URL("./manifest.webmanifest", import.meta.url), JSON.stringify(manifest, null, 2) + "\n");
console.log("Construit : index.html, dist/artifact.html, sw.js, manifest.webmanifest — version " + version);
