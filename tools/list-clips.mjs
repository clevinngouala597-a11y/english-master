// Liste toutes les phrases que l'app fait lire, groupées par leçon (pour les voix naturelles).
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const C = require("../src/content.js");
globalThis.EM_CONTENT = C;
const E = require("../src/engine.js");
const key = (t) => String(t).replace(/…/g, "").replace(/\s+/g, " ").trim();
const groups = {};
for (const l of C.LESSONS) {
  const set = new Set();
  const add = (t) => { const k = key(t); if (k) set.add(k); };
  E.segments(l).forEach((s) => add(s.text));
  l.lines.forEach((x) => add(x.en));
  l.vocab.forEach((v) => { add(v.en); if (v.ex) add(v.ex); });
  add(l.exercises.dictation.en);
  add(l.exercises.oral.en);
  groups[l.id] = [...set];
}
groups.common = ["Hi! I would like a coffee, please. How much is it?", "Hi! I would like a coffee, please."].map(key);
process.stdout.write(JSON.stringify(groups, null, 1));
