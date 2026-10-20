/* English Master — moteur pédagogique (logique pure, testable sans navigateur). */
(function (root) {
  "use strict";

  var C = root.EM_CONTENT || (typeof require !== "undefined" ? require("./content.js") : null);

  /* ---------- Dates (jour local, format AAAA-MM-JJ) ---------- */
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(s) { var p = String(s).split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
  function today() { return iso(new Date()); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function diffDays(a, b) { return Math.round((parse(b) - parse(a)) / 86400000); }
  function weekday(s) { return (parse(s).getDay() + 6) % 7; } /* lundi = 0 */
  function mondayOf(s) { return addDays(s, -weekday(s)); }
  function isoWeek(s) {
    var d = parse(s);
    var t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dayNum = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - dayNum);
    var y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return Math.ceil(((t - y0) / 86400000 + 1) / 7);
  }
  var MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  var DAYS = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];
  function fmtDay(s) { var d = parse(s); return d.getDate() + " " + MONTHS[d.getMonth()]; }
  function fmtShort(s, ref) {
    var t = ref || today();
    var n = diffDays(t, s);
    if (n === 0) return "Aujourd’hui";
    if (n === 1) return "Demain";
    if (n === -1) return "Hier";
    var w = DAYS[weekday(s)];
    return w.charAt(0).toUpperCase() + w.slice(1) + " " + parse(s).getDate();
  }

  /* ---------- Texte ---------- */
  var SMALL = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  var TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  function numWords(n) {
    n = Number(n);
    if (n < 20) return SMALL[n];
    if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + SMALL[n % 10] : "");
    if (n < 1000) return SMALL[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + numWords(n % 100) : "");
    return String(n);
  }
  var CONTRACTIONS = {
    "i'm": "i am", "you're": "you are", "we're": "we are", "they're": "they are", "he's": "he is", "she's": "she is",
    "it's": "it is", "that's": "that is", "what's": "what is", "where's": "where is", "there's": "there is", "here's": "here is",
    "isn't": "is not", "aren't": "are not", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "can not",
    "won't": "will not", "i'll": "i will", "you'll": "you will", "it'll": "it will", "we'll": "we will", "they'll": "they will",
    "i'd": "i would", "you'd": "you would", "we'd": "we would", "i've": "i have", "you've": "you have", "let's": "let us",
    "wasn't": "was not", "weren't": "were not", "o'clock": "o clock", "how's": "how is", "who's": "who is"
  };
  function normalize(text) {
    var s = String(text == null ? "" : text).toLowerCase().replace(/[’‘`´]/g, "'");
    s = s.replace(/(\d+):(\d{2})/g, function (m, a, b) { return numWords(+a) + (b === "00" ? "" : " " + numWords(+b)); });
    s = s.replace(/(\d+)[.,](\d{2})(?!\d)/g, function (m, a, b) { return numWords(+a) + " " + (b.charAt(0) === "0" ? "oh " + numWords(+b.charAt(1)) : numWords(+b)); });
    s = s.replace(/\d+/g, function (m) { return m.length <= 3 ? numWords(+m) : m; });
    s = s.replace(/\bcannot\b/g, "can not");
    s = s.replace(/[a-z]+'[a-z]+/g, function (w) { return CONTRACTIONS[w] || w.replace(/'/g, ""); });
    s = s.replace(/-/g, " ").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
    return s;
  }
  function tokens(text) { var n = normalize(text); return n ? n.split(" ") : []; }
  function hasPhrase(normText, phrase) { var p = normalize(phrase); return p !== "" && (" " + normText + " ").indexOf(" " + p + " ") !== -1; }
  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length, prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur = [i];
      for (j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }

  /* Alignement mot à mot entre la phrase attendue et la réponse.
     ok = 1 point, faute d'orthographe légère (fuzzy) = 0,5 point. */
  function align(target, answer, opts) {
    opts = opts || {};
    var t = Array.isArray(target) ? target : tokens(target);
    var a = Array.isArray(answer) ? answer : tokens(answer);
    var m = t.length, n = a.length, i, j;
    var dp = [];
    function w(x, y) {
      if (x === y) return 1;
      if (opts.fuzzy && x.length >= 4 && lev(x, y) <= 1) return 0.5;
      return -1;
    }
    for (i = 0; i <= m; i++) { dp[i] = []; for (j = 0; j <= n; j++) dp[i][j] = 0; }
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      var best = Math.max(dp[i - 1][j], dp[i][j - 1]);
      var ww = w(t[i - 1], a[j - 1]);
      if (ww > 0) best = Math.max(best, dp[i - 1][j - 1] + ww);
      dp[i][j] = best;
    }
    var status = new Array(m), usedA = new Array(n);
    i = m; j = n;
    while (i > 0 && j > 0) {
      var ww2 = w(t[i - 1], a[j - 1]);
      if (ww2 > 0 && Math.abs(dp[i][j] - (dp[i - 1][j - 1] + ww2)) < 1e-9) {
        status[i - 1] = ww2 === 1 ? "ok" : "typo"; usedA[j - 1] = true; i--; j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) { i--; } else { j--; }
    }
    var words = t.map(function (x, k) { return { word: x, status: status[k] || "missing" }; });
    var extra = a.filter(function (x, k) { return !usedA[k]; });
    var got = dp[m][n];
    var denom = opts.penalizeExtra ? Math.max(m, n) : m;
    var pct = denom === 0 ? 0 : Math.round((got / denom) * 100);
    return { pct: Math.max(0, Math.min(100, pct)), words: words, extra: extra };
  }

  function keyGroups(answer, groups) {
    var n = normalize(answer);
    var missing = [];
    var hit = 0;
    (groups || []).forEach(function (g) {
      var ok = g.some(function (p) { return hasPhrase(n, p); });
      if (ok) hit++; else missing.push(g);
    });
    var total = (groups || []).length;
    return { hit: hit, total: total, ratio: total ? hit / total : 0, missing: missing };
  }
  function matchesAccepted(answer, accept) {
    var n = normalize(answer);
    return (accept || []).some(function (x) { return normalize(x) === n; });
  }
  function pretty(s) {
    var t = String(s).trim();
    if (!t) return t;
    t = t.charAt(0).toUpperCase() + t.slice(1);
    return /[.!?]$/.test(t) ? t : t + ".";
  }

  /* ---------- Correction des exercices ---------- */
  function scoreChoices(items, answers) {
    var results = items.map(function (it, k) { return answers[k] === it.answer; });
    var ok = results.filter(Boolean).length;
    return { pct: items.length ? Math.round((ok / items.length) * 100) : 0, results: results };
  }
  function scoreGaps(items, answers) {
    var results = items.map(function (it, k) { return matchesAccepted(answers[k] || "", it.accept); });
    var ok = results.filter(Boolean).length;
    return { pct: items.length ? Math.round((ok / items.length) * 100) : 0, results: results };
  }
  function bestAlign(answer, accept) {
    var best = null;
    (accept || []).forEach(function (x) {
      var r = align(x, answer, { fuzzy: true, penalizeExtra: true });
      if (!best || r.pct > best.pct) { best = r; best.target = x; }
    });
    return best || { pct: 0, words: [], extra: [], target: "" };
  }
  function scoreTranslation(item, answer) {
    var expected = item.show || pretty(item.accept[0]);
    if (!normalize(answer)) return { score10: 0, verdict: "À revoir", expected: expected, points: ["Écris une réponse en anglais pour être corrigé."], concept: item.concept || null, local: true };
    if (matchesAccepted(answer, item.accept)) return { score10: 10, verdict: "Correct", expected: expected, points: ["Traduction exacte."], concept: null, local: true };
    var k = keyGroups(answer, item.keys);
    var al = bestAlign(answer, item.accept);
    var score10 = Math.round((0.6 * k.ratio + 0.4 * (al.pct / 100)) * 10);
    if (score10 >= 10) score10 = 9;
    var points = k.missing.map(function (g) { return "Il manque « " + g[0] + " »" + (g.length > 1 ? " (ou « " + g.slice(1).join(" », « ") + " »)" : "") + "."; });
    if (!points.length) points.push("Le sens y est. Compare l’ordre des mots avec la réponse attendue.");
    return { score10: score10, verdict: score10 >= 7 ? "Presque" : "À revoir", expected: expected, points: points, concept: item.concept || null, local: true };
  }
  function scoreDictation(target, answer) {
    return align(target, answer, { fuzzy: true, penalizeExtra: true });
  }
  function scoreRepeat(target, transcript) {
    return align(target, transcript, { fuzzy: true });
  }
  function scoreSummary(item, answer) {
    var words = tokens(answer).length;
    var k = keyGroups(answer, item.keys);
    var pct = Math.round(k.ratio * 100);
    if (words < 4) pct = Math.min(pct, 40);
    var points = k.missing.map(function (g) { return "Tu peux parler de « " + g[0] + " »."; });
    if (words < 4) points.unshift("Écris au moins une phrase complète.");
    return { pct: pct, points: points, model: item.model, local: true };
  }
  function scoreRoleplay(line, answer) {
    var k = keyGroups(answer, line.keys || []);
    var al = align(line.en, answer, { fuzzy: true });
    var pct = Math.round(Math.max(k.total ? k.ratio * 100 : 0, al.pct));
    return { pct: pct, understood: pct >= 50, missing: k.missing, local: true };
  }

  /* ---------- Leçons ---------- */
  function lessonById(id) { return C.LESSONS.filter(function (l) { return l.id === id; })[0] || null; }
  var CHAPTERS = ["Dialogue", "Mots clés", "Version lente"];
  function segments(lesson) {
    var segs = [];
    lesson.lines.forEach(function (ln, i) { segs.push({ chapter: 0, kind: "line", line: i, text: ln.en, rate: 1 }); });
    lesson.vocab.forEach(function (v) {
      segs.push({ chapter: 1, kind: "word", vocab: v.key, text: v.en.replace(/…/g, ""), rate: 0.9 });
      if (v.ex) segs.push({ chapter: 1, kind: "example", vocab: v.key, text: v.ex, rate: 0.9 });
    });
    lesson.lines.forEach(function (ln, i) { segs.push({ chapter: 2, kind: "line", line: i, text: ln.en, rate: 0.7 }); });
    return segs;
  }
  function segSeconds(seg) { return tokens(seg.text).length / (2.5 * seg.rate) + 0.8; }
  function lessonSeconds(lesson) { return segments(lesson).reduce(function (s, x) { return s + segSeconds(x); }, 0); }
  function lessonMinutes(lesson) { return Math.max(1, Math.round(lessonSeconds(lesson) / 60)); }
  function chapterShares(lesson) {
    var segs = segments(lesson), tot = [0, 0, 0];
    segs.forEach(function (s) { tot[s.chapter] += segSeconds(s); });
    var sum = tot[0] + tot[1] + tot[2];
    return tot.map(function (x) { return x / sum; });
  }

  /* ---------- État ---------- */
  var EX_TYPES = ["comprehension", "vocab", "gaps", "translation", "dictation", "oral", "summary"];
  var EX_LABELS = { comprehension: "Compréhension", vocab: "QCM vocabulaire", gaps: "Texte à trous", translation: "Traduction", dictation: "Dictée", oral: "Oral", summary: "Résumé en anglais", revision: "Révision", roleplay: "Jeu de rôle", repeat: "Répétition" };
  var SKILLS = {
    comprehension: { label: "Compréhension orale", types: ["comprehension", "dictation"] },
    vocabulaire: { label: "Vocabulaire", types: ["vocab", "gaps"] },
    ecriture: { label: "Écriture", types: ["translation", "summary"] },
    oral: { label: "Oral", types: ["oral", "roleplay", "repeat"] }
  };
  var MASTERY = 80;
  var INTERVALS = [1, 3, 7, 14, 30];

  function defaultState() {
    return {
      v: 1, updatedAt: 0,
      profile: { name: "", level: "A1", goal: "quotidien", minutes: 15, period: null, slot: "19:00", onboarded: false, since: "" },
      lessons: {}, results: [], words: {}, concepts: {}, days: {}, bilans: [], watched: [], plan: []
    };
  }
  function migrate(s) {
    var d = defaultState();
    if (!s || typeof s !== "object") return d;
    Object.keys(d).forEach(function (k) { if (s[k] === undefined) s[k] = d[k]; });
    Object.keys(d.profile).forEach(function (k) { if (s.profile[k] === undefined) s.profile[k] = d.profile[k]; });
    if (s.profile.onboarded && !s.profile.since) { var ds = Object.keys(s.days || {}).sort(); s.profile.since = ds[0] || today(); }
    return s;
  }
  function L(state, id) {
    if (!state.lessons[id]) state.lessons[id] = { started: null, watched: null, maxSeg: 0, watchSec: 0, exDone: null, scores: {}, bilan: null, review: null, last: null };
    return state.lessons[id];
  }
  function logDay(state, date, kind, minutes) {
    var d = state.days[date] || (state.days[date] = { min: 0, k: [] });
    d.min = Math.round((d.min + (minutes || 0)) * 10) / 10;
    if (kind && d.k.indexOf(kind) === -1) d.k.push(kind);
  }
  function recordResult(state, lessonId, type, pct, date) {
    state.results.push({ d: date, l: lessonId, t: type, p: Math.round(pct) });
    if (state.results.length > 600) state.results.splice(0, state.results.length - 600);
    if (lessonId && EX_TYPES.indexOf(type) !== -1) {
      var ls = L(state, lessonId);
      ls.scores[type] = Math.round(pct);
      ls.last = date;
    }
  }
  function lessonScore(state, id) {
    var ls = state.lessons[id];
    if (!ls) return null;
    var vals = EX_TYPES.map(function (t) { return ls.scores[t]; }).filter(function (x) { return typeof x === "number"; });
    if (!vals.length) return null;
    return Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
  }
  function lessonStatus(state, id) {
    var ls = state.lessons[id];
    var sc = lessonScore(state, id);
    if (!ls) return { key: "nouvelle", label: "Nouvelle", pct: null };
    if (ls.exDone && sc !== null && sc >= MASTERY) return { key: "maitrisee", label: "Maîtrisée", pct: sc };
    if (ls.exDone && sc !== null) return { key: "fragile", label: "À consolider", pct: sc };
    if (ls.started) return { key: "en-cours", label: ls.watched ? "Vue, exercices à faire" : "En cours", pct: sc };
    return { key: "nouvelle", label: "Nouvelle", pct: null };
  }
  function finishExercises(state, lessonId, date) {
    var ls = L(state, lessonId);
    ls.exDone = date;
    ls.review = { stage: 0, next: addDays(date, 7) };
  }
  function skillLevels(state) {
    var out = {};
    Object.keys(SKILLS).forEach(function (k) {
      var rs = state.results.filter(function (r) { return SKILLS[k].types.indexOf(r.t) !== -1; }).slice(-10);
      out[k] = rs.length ? Math.round(rs.reduce(function (a, r) { return a + r.p; }, 0) / rs.length) : null;
    });
    return out;
  }
  function weakestSkill(state) {
    var s = skillLevels(state), best = null;
    Object.keys(s).forEach(function (k) { if (s[k] !== null && (best === null || s[k] < s[best])) best = k; });
    return best;
  }

  /* ---------- Révisions espacées ---------- */
  function addWord(state, v, lessonId, source, date) {
    var key = (lessonId ? lessonId + ":" : "") + (v.key || normalize(v.en).replace(/ /g, "-"));
    if (state.words[key]) return false;
    state.words[key] = { en: v.en, fr: v.fr || "", lesson: lessonId || null, added: date, stage: 0, next: addDays(date, 1), source: source || "lesson" };
    return true;
  }
  function addConcept(state, key, lessonId, date) {
    if (!key) return;
    var c = state.concepts[key] || { count: 0 };
    c.count += 1; c.last = date; c.lesson = lessonId || c.lesson || null; c.stage = 0; c.next = addDays(date, 1);
    state.concepts[key] = c;
  }
  function review(item, success, date) {
    if (success) { item.stage = Math.min((item.stage || 0) + 1, INTERVALS.length - 1); item.next = addDays(date, INTERVALS[item.stage]); }
    else { item.stage = 0; item.next = addDays(date, 1); }
    item.last = date;
    return item;
  }
  function dueItems(state, date) {
    var out = [];
    Object.keys(state.concepts).forEach(function (k) {
      var c = state.concepts[k];
      if (c.next && c.next <= date) out.push({ kind: "concept", key: k, item: c });
    });
    (state.plan || []).forEach(function (p) { if (!p.done && p.due <= date) out.push({ kind: "plan", key: p.id, item: p }); });
    Object.keys(state.lessons).forEach(function (id) {
      var ls = state.lessons[id];
      if (ls.review && ls.review.next <= date) out.push({ kind: "lesson", key: id, item: ls.review });
    });
    Object.keys(state.words).forEach(function (k) {
      var w = state.words[k];
      if (w.next && w.next <= date) out.push({ kind: "word", key: k, item: w });
    });
    return out;
  }
  function upcoming(state, date, days) {
    var end = addDays(date, days || 10);
    var rows = [];
    Object.keys(state.concepts).forEach(function (k) {
      var c = state.concepts[k];
      if (c.next && c.next <= end) rows.push({ date: c.next < date ? date : c.next, label: (C.CONCEPTS[k] ? C.CONCEPTS[k].label : k), minutes: 1, kind: "concept" });
    });
    (state.plan || []).forEach(function (p) {
      if (!p.done && p.due <= end) rows.push({ date: p.due < date ? date : p.due, label: p.title, minutes: p.minutes || 2, kind: "plan" });
    });
    Object.keys(state.lessons).forEach(function (id) {
      var ls = state.lessons[id], l = lessonById(id);
      if (ls.review && ls.review.next <= end && l) rows.push({ date: ls.review.next < date ? date : ls.review.next, label: l.title + " en entier", minutes: lessonMinutes(l), kind: "lesson" });
    });
    var byDay = {};
    Object.keys(state.words).forEach(function (k) {
      var w = state.words[k];
      if (w.next && w.next <= end) { var d = w.next < date ? date : w.next; byDay[d] = (byDay[d] || 0) + 1; }
    });
    Object.keys(byDay).forEach(function (d) { rows.push({ date: d, label: byDay[d] + (byDay[d] > 1 ? " mots à revoir" : " mot à revoir"), minutes: Math.max(1, Math.round(byDay[d] / 4)), kind: "words" }); });
    rows.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    return rows;
  }

  /* ---------- Activité, régularité ---------- */
  var STRONG = ["lesson", "exercise", "oral", "coach"];
  function dayStatus(state, d, date) {
    if (d > date) return "future";
    if (state.profile && state.profile.since && d < state.profile.since && !state.days[d]) return "before";
    var x = state.days[d];
    var active = x && (x.min >= 5 || x.k.some(function (k) { return STRONG.indexOf(k) !== -1; }));
    if (active) return "done";
    if (x && x.k.length) return "review";
    if (d === date) return "today";
    return weekday(d) >= 5 ? "rest" : "missed";
  }
  function streak(state, date) {
    var n = 0, d = state.days[date] && state.days[date].k.length ? date : addDays(date, -1);
    while (state.days[d] && state.days[d].k.length) { n++; d = addDays(d, -1); }
    return n;
  }
  function calendar(state, date, weeks) {
    weeks = weeks || 3;
    var start = addDays(mondayOf(date), -7 * (weeks - 1)), cells = [];
    for (var i = 0; i < 7 * weeks; i++) {
      var d = addDays(start, i);
      var st = dayStatus(state, d, date);
      cells.push({ date: d, day: parse(d).getDate(), status: d === date && st !== "done" && st !== "review" ? "today" : st, isToday: d === date });
    }
    return cells;
  }

  /* ---------- Périodes d'alternance (2 semaines école / 2 semaines entreprise) ---------- */
  var PERIOD_LABEL = { ecole: "École", entreprise: "Entreprise" };
  function other(t) { return t === "ecole" ? "entreprise" : "ecole"; }
  function periodInfo(profile, date) {
    if (!profile || !profile.period || !profile.period.end) return null;
    var end = profile.period.end, type = profile.period.type || "ecole";
    var blockEnd = addDays(end, 6 - weekday(end));
    var blockStart = addDays(blockEnd, -13);
    var guard = 0;
    while (date > blockEnd && guard++ < 200) { blockStart = addDays(blockStart, 14); blockEnd = addDays(blockEnd, 14); type = other(type); }
    while (date < blockStart && guard++ < 400) { blockStart = addDays(blockStart, -14); blockEnd = addDays(blockEnd, -14); type = other(type); }
    var dayIndex = 0;
    for (var d = blockStart; d <= date && d <= blockEnd; d = addDays(d, 1)) if (weekday(d) < 5) dayIndex++;
    var next = [], s = blockStart, t = type;
    for (var i = 0; i < 3; i++) { s = addDays(s, 14); t = other(t); next.push({ type: t, start: s, end: addDays(s, 11) }); }
    return { type: type, start: blockStart, end: addDays(blockStart, 11), blockEnd: blockEnd, dayIndex: Math.max(1, Math.min(10, dayIndex)), next: next };
  }
  function fmtSlot(s) {
    var p = String(s || "19:00").split(":");
    return parseInt(p[0], 10) + "h" + (p[1] && p[1] !== "00" ? p[1] : "");
  }
  function periodPlan(type, profile) {
    if (type === "ecole") return { minutes: 15, text: "15 min chaque soir + 1 épisode le week-end" };
    return { minutes: 10, text: "10 min à " + fmtSlot(profile && profile.slot) + " : révisions + oral" };
  }
  var TARGETS = {
    ecole: { lessons: 3, oral: 6, bilans: 3, words: 40, watch: 2 },
    entreprise: { lessons: 1, oral: 4, bilans: 1, words: 20, watch: 2 }
  };
  function periodObjectives(state, info) {
    if (!info) return null;
    var inP = function (d) { return d && d >= info.start && d <= info.blockEnd; };
    var lessons = Object.keys(state.lessons).filter(function (id) {
      var ls = state.lessons[id]; var sc = lessonScore(state, id);
      return inP(ls.exDone) && sc !== null && sc >= MASTERY;
    }).length;
    var oral = Object.keys(state.days).filter(function (d) { return inP(d) && state.days[d].k.indexOf("oral") !== -1; }).length;
    var bilans = state.bilans.filter(function (b) { return inP(b.d); }).length;
    var words = Object.keys(state.words).filter(function (k) { return inP(state.words[k].added); }).length;
    var watch = state.watched.filter(function (w) { return inP(w.d); }).length;
    var tg = TARGETS[info.type];
    return [
      { key: "lessons", label: "Leçons maîtrisées", value: lessons, target: tg.lessons },
      { key: "oral", label: "Séances d’oral", value: oral, target: tg.oral },
      { key: "bilans", label: "Bilans avec le coach", value: bilans, target: tg.bilans },
      { key: "words", label: "Mots appris", value: words, target: tg.words },
      { key: "watch", label: "Épisodes en VO, sous-titres anglais", value: watch, target: tg.watch }
    ];
  }

  /* ---------- Évolution par semaine ---------- */
  function avg(arr) { return arr.length ? Math.round(arr.reduce(function (a, b) { return a + b; }, 0) / arr.length) : null; }
  function weeklyEvolution(state, date, weeks) {
    weeks = weeks || 3;
    var cols = [];
    for (var i = weeks - 1; i >= 0; i--) {
      var mon = addDays(mondayOf(date), -7 * i), sun = addDays(mon, 6);
      var rs = state.results.filter(function (r) { return r.d >= mon && r.d <= sun; });
      var pick = function (types) { return avg(rs.filter(function (r) { return types.indexOf(r.t) !== -1; }).map(function (r) { return r.p; })); };
      cols.push({
        label: "S" + isoWeek(mon),
        comprehension: pick(SKILLS.comprehension.types),
        oral: pick(SKILLS.oral.types),
        ecriture: pick(SKILLS.ecriture.types),
        words: Object.keys(state.words).filter(function (k) { return state.words[k].added <= sun; }).length
      });
    }
    return cols;
  }

  /* ---------- Recommandation ---------- */
  function recommend(state, opts) {
    opts = opts || {};
    var date = opts.date || today();
    var level = opts.level || state.profile.level || "A1";
    var minutes = opts.minutes || state.profile.minutes || 15;
    var weak = weakestSkill(state);
    var due = dueItems(state, date);
    var dueConcepts = due.filter(function (x) { return x.kind === "concept"; }).map(function (x) { return x.key; });
    var dueWords = due.filter(function (x) { return x.kind === "word"; }).map(function (x) { return x.key; });
    var pool = C.LESSONS.filter(function (l) { return l.level === level; });
    var out = pool.map(function (l, idx) {
      var ls = state.lessons[l.id];
      var st = lessonStatus(state, l.id);
      var score = 0, reasons = [], kind = "new";
      if (st.key === "nouvelle") { score += 30; reasons.push("Nouvelle leçon à ton niveau " + level); }
      else if (st.key === "en-cours") { score += 45; kind = "continue"; reasons.push(ls.watched ? "Tu l’as vue : il reste les exercices" : "Tu l’as commencée"); }
      else if (st.key === "fragile") { score += 35; kind = "consolidate"; reasons.push("Score de " + st.pct + " % : à consolider avant d’avancer"); }
      else {
        if (ls.review && ls.review.next <= date) { score += 20; kind = "review"; reasons.push("Révision prévue aujourd’hui"); }
        else { score -= 60; kind = "done"; }
      }
      if (weak && l.skillFocus.indexOf(weak) !== -1 && kind !== "done") { score += 15; reasons.push("Travaille ton point faible : " + SKILLS[weak].label.toLowerCase()); }
      var conceptsHere = [l.exercises.translation.concept];
      var matchC = dueConcepts.filter(function (k) { return conceptsHere.indexOf(k) !== -1; });
      var vocabKeys = l.vocab.map(function (v) { return v.key; });
      var matchW = dueWords.filter(function (k) { var p = k.split(":"); return vocabKeys.indexOf(p[p.length - 1]) !== -1; });
      var reuse = matchC.length + matchW.length;
      if (reuse && kind !== "done") { score += Math.min(30, reuse * 10); reasons.push("Réutilise " + reuse + (reuse > 1 ? " points à revoir" : " point à revoir")); }
      if (l.categories.indexOf(state.profile.goal) !== -1) score += 10;
      var watchMin = lessonMinutes(l), full = watchMin + 8;
      if (full <= minutes) { score += 10; if (kind !== "done") reasons.push("Leçon, exercices et bilan tiennent dans tes " + minutes + " min"); }
      else if (watchMin <= minutes) { score += 2; if (kind !== "done") reasons.push("La leçon tient dans tes " + minutes + " min, les exercices pourront attendre"); }
      else score -= 10;
      if (ls && ls.last === date) score -= 25;
      score += (pool.length - idx);
      return { lesson: l, score: score, reasons: reasons.slice(0, 3), kind: kind, status: st, fullMinutes: full, watchMinutes: watchMin };
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }

  /* ---------- Série d'exercices d'une leçon ---------- */
  function revisionFor(state, lesson, date) {
    var best = null;
    Object.keys(state.concepts).forEach(function (k) {
      var c = state.concepts[k], def = C.CONCEPTS[k];
      if (!def || !def.retry) return;
      if (k === lesson.exercises.translation.concept) return;
      var score = c.count * 10 + (c.next <= date ? 20 : 0) - (c.stage || 0) * 5;
      if (!best || score > best.score) best = { key: k, score: score, c: c, def: def };
    });
    if (!best || (best.c.stage || 0) >= 3) return null;
    var from = best.c.lesson ? lessonById(best.c.lesson) : null;
    return { type: "revision", concept: best.key, item: best.def.retry, label: best.def.label, from: from ? from.title : null };
  }
  function buildSteps(state, lesson, date) {
    var steps = EX_TYPES.map(function (t) { return { type: t }; });
    var rev = revisionFor(state, lesson, date || today());
    if (rev) steps.splice(4, 0, rev);
    return steps;
  }

  var ENGINE = {
    iso: iso, parse: parse, today: today, addDays: addDays, diffDays: diffDays, weekday: weekday, mondayOf: mondayOf, isoWeek: isoWeek, fmtDay: fmtDay, fmtShort: fmtShort,
    numWords: numWords, normalize: normalize, tokens: tokens, hasPhrase: hasPhrase, lev: lev, align: align, keyGroups: keyGroups, matchesAccepted: matchesAccepted, pretty: pretty,
    scoreChoices: scoreChoices, scoreGaps: scoreGaps, scoreTranslation: scoreTranslation, scoreDictation: scoreDictation, scoreRepeat: scoreRepeat, scoreSummary: scoreSummary, scoreRoleplay: scoreRoleplay,
    lessonById: lessonById, CHAPTERS: CHAPTERS, segments: segments, segSeconds: segSeconds, lessonSeconds: lessonSeconds, lessonMinutes: lessonMinutes, chapterShares: chapterShares,
    EX_TYPES: EX_TYPES, EX_LABELS: EX_LABELS, SKILLS: SKILLS, MASTERY: MASTERY, INTERVALS: INTERVALS,
    defaultState: defaultState, migrate: migrate, L: L, logDay: logDay, recordResult: recordResult, lessonScore: lessonScore, lessonStatus: lessonStatus, finishExercises: finishExercises,
    skillLevels: skillLevels, weakestSkill: weakestSkill, addWord: addWord, addConcept: addConcept, review: review, dueItems: dueItems, upcoming: upcoming,
    dayStatus: dayStatus, streak: streak, calendar: calendar, PERIOD_LABEL: PERIOD_LABEL, periodInfo: periodInfo, periodPlan: periodPlan, fmtSlot: fmtSlot, periodObjectives: periodObjectives, TARGETS: TARGETS,
    weeklyEvolution: weeklyEvolution, recommend: recommend, buildSteps: buildSteps, revisionFor: revisionFor
  };
  if (typeof module !== "undefined" && module.exports) module.exports = ENGINE;
  root.EM_ENGINE = ENGINE;
})(typeof window !== "undefined" ? window : globalThis);
