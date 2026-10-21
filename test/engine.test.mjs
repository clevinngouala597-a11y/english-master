import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const C = require("../src/content.js");
globalThis.EM_CONTENT = C;
const E = require("../src/engine.js");

const cafe = E.lessonById("cafe");
let pass = 0;
function t(name, fn) { fn(); pass++; console.log("ok -", name); }

t("normalisation : prix, contractions, chiffres", () => {
  assert.equal(E.normalize("That's $2.50!"), "that is two fifty");
  assert.equal(E.normalize("I'd like a tea"), "i would like a tea");
  assert.equal(E.normalize("I get up at 7"), "i get up at seven");
  assert.equal(E.normalize("They're 1.99 a kilo"), "they are one ninety nine a kilo");
  assert.equal(E.normalize("I finish at 4:30"), "i finish at four thirty");
  assert.equal(E.normalize("seven o’clock"), "seven o clock");
});

t("traduction exacte = 10/10", () => {
  const r = E.scoreTranslation(cafe.exercises.translation, "I'd like a tea, please");
  assert.equal(r.score10, 10);
  assert.equal(r.verdict, "Correct");
});

t("traduction sans would like = moins de 10 et notion signalée", () => {
  const r = E.scoreTranslation(cafe.exercises.translation, "I want a tea please");
  assert.ok(r.score10 < 10 && r.score10 >= 4, "score " + r.score10);
  assert.equal(r.concept, "would-like");
  assert.match(r.points[0], /would like/);
});

t("dictée : exacte 100 %, faute légère comptée à moitié", () => {
  assert.equal(E.scoreDictation("Small, please. How much is it?", "small please how much is it").pct, 100);
  const r = E.scoreDictation("Small, please. How much is it?", "smal please how much is it");
  assert.equal(r.words[0].status, "typo");
  assert.equal(r.pct, 92);
});

t("répétition orale : 5 mots sur 6 = 83 %", () => {
  const r = E.scoreRepeat("I would like a coffee, please.", "I what like a coffee please");
  assert.equal(r.pct, 83);
  assert.equal(r.words[1].status, "missing");
});

t("QCM et trous", () => {
  assert.equal(E.scoreChoices(cafe.exercises.vocab, [0, 0, 2]).pct, 67);
  assert.equal(E.scoreGaps(cafe.exercises.gaps, ["like", "LARGE ", "many"]).pct, 67);
});

t("périodes d’alternance", () => {
  const p = { period: { type: "ecole", end: "2026-10-30" } };
  const a = E.periodInfo(p, "2026-10-20");
  assert.deepEqual([a.type, a.start, a.end, a.dayIndex], ["ecole", "2026-10-19", "2026-10-30", 2]);
  const b = E.periodInfo(p, "2026-11-03");
  assert.deepEqual([b.type, b.start, b.end, b.dayIndex], ["entreprise", "2026-11-02", "2026-11-13", 2]);
  const c = E.periodInfo(p, "2026-10-08");
  assert.deepEqual([c.type, c.start], ["entreprise", "2026-10-05"]);
});

t("score de leçon, maîtrise à 80 %", () => {
  const s = E.defaultState();
  [100, 100, 67, 60, 75, 67, 50].forEach((p, i) => E.recordResult(s, "cafe", E.EX_TYPES[i], p, "2026-10-20"));
  E.finishExercises(s, "cafe", "2026-10-20");
  assert.equal(E.lessonScore(s, "cafe"), 74);
  assert.equal(E.lessonStatus(s, "cafe").key, "fragile");
});

t("recommandation : nouvel élève = première leçon A1", () => {
  const s = E.defaultState();
  const r = E.recommend(s, { date: "2026-10-20" });
  assert.equal(r[0].lesson.id, "hello");
});

t("recommandation : une leçon à consolider passe devant les nouvelles", () => {
  const s = E.defaultState();
  E.L(s, "hello").started = "2026-10-16";
  [100, 100, 100, 90, 90, 70, 80].forEach((p, i) => E.recordResult(s, "hello", E.EX_TYPES[i], p, "2026-10-16"));
  E.finishExercises(s, "hello", "2026-10-16");
  E.L(s, "cafe").started = "2026-10-18";
  [100, 100, 67, 60, 75, 67, 50].forEach((p, i) => E.recordResult(s, "cafe", E.EX_TYPES[i], p, "2026-10-18"));
  E.finishExercises(s, "cafe", "2026-10-18");
  const r = E.recommend(s, { date: "2026-10-20" });
  assert.equal(r[0].lesson.id, "cafe");
  assert.ok(r.find((x) => x.lesson.id === "hello").kind === "done");
});

t("une vidéo vue sans exercices n’est pas maîtrisée", () => {
  const s = E.defaultState();
  const ls = E.L(s, "weather"); ls.started = "2026-10-20"; ls.watched = "2026-10-20";
  assert.equal(E.lessonStatus(s, "weather").key, "en-cours");
});

t("révisions espacées : 1, 3, 7 jours", () => {
  const s = E.defaultState();
  E.addConcept(s, "would-like", "cafe", "2026-10-20");
  assert.equal(s.concepts["would-like"].next, "2026-10-21");
  E.review(s.concepts["would-like"], true, "2026-10-21");
  assert.equal(s.concepts["would-like"].next, "2026-10-24");
  E.review(s.concepts["would-like"], true, "2026-10-24");
  assert.equal(s.concepts["would-like"].next, "2026-10-31");
  E.review(s.concepts["would-like"], false, "2026-10-31");
  assert.equal(s.concepts["would-like"].next, "2026-11-01");
});

t("une erreur passée revient dans les exercices d’une autre leçon", () => {
  const s = E.defaultState();
  E.addConcept(s, "would-like", "cafe", "2026-10-18");
  const steps = E.buildSteps(s, E.lessonById("supermarket"), "2026-10-20");
  const rev = steps.find((x) => x.type === "revision");
  assert.ok(rev && rev.concept === "would-like");
  assert.equal(steps.length, 8);
});

t("calendrier et série de jours", () => {
  const s = E.defaultState();
  ["2026-10-17", "2026-10-18", "2026-10-19"].forEach((d) => E.logDay(s, d, "lesson", 10));
  assert.equal(E.streak(s, "2026-10-20"), 3);
  const cal = E.calendar(s, "2026-10-20", 3);
  assert.equal(cal.length, 21);
  assert.equal(cal.find((c) => c.date === "2026-10-19").status, "done");
  assert.equal(cal.find((c) => c.date === "2026-10-20").status, "today");
  assert.equal(cal.find((c) => c.date === "2026-10-21").status, "future");
});

t("les jours avant le début ne comptent pas comme manqués", () => {
  const s = E.defaultState();
  s.profile.since = "2026-10-20";
  const cal = E.calendar(s, "2026-10-20", 2);
  assert.equal(cal.find((c) => c.date === "2026-10-14").status, "before");
  assert.equal(E.fmtSlot("20:00"), "20h");
  assert.equal(E.fmtSlot("19:30"), "19h30");
});

t("shadowing : temps de répétition", () => {
  assert.equal(E.shadowGap("Is it far?", 1), 2.4);
  assert.ok(E.shadowGap("I start at eight and I finish at half past four.", 0.75) > E.shadowGap("I start at eight and I finish at half past four.", 1));
});

t("vidéo : vue en entier à 90 % de la durée, pas avant", () => {
  const v = {};
  E.videoProgress(v, 100, 242, 100);
  assert.equal(v.done, undefined);
  assert.equal(v.pct, 41);
  E.videoProgress(v, 220, 242, 120);
  assert.equal(v.done, true);
});

t("vidéo commencée : la leçon passe en tête des recommandations", () => {
  const s = E.defaultState();
  const ls = E.L(s, "weather"); ls.started = "2026-10-20"; ls.video = { max: 60, pct: 30, sec: 60 };
  const r = E.recommend(s, { date: "2026-10-21" });
  assert.equal(r[0].lesson.id, "weather");
  assert.match(r[0].reasons[0], /vidéo YouTube/);
});

t("chaque leçon a une vraie vidéo YouTube", () => {
  C.LESSONS.forEach((l) => {
    assert.ok(l.video && /^[A-Za-z0-9_-]{11}$/.test(l.video.id), l.id);
    assert.ok(l.video.title && l.video.channel && l.video.url.endsWith(l.video.id));
  });
});

t("toutes les leçons ont un contenu complet", () => {
  C.LESSONS.forEach((l) => {
    assert.ok(l.lines.length >= 8, l.id);
    assert.ok(l.lines.some((x) => x.sp === "Toi") && l.lines.filter((x) => x.sp === "Toi").every((x) => x.keys), l.id + " keys");
    l.lines.forEach((x) => x.w.forEach((k) => assert.ok(l.vocab.find((v) => v.key === k), l.id + " vocab " + k)));
    ["comprehension", "vocab", "gaps", "translation", "dictation", "oral", "summary"].forEach((k) => assert.ok(l.exercises[k], l.id + " " + k));
    l.exercises.vocab.forEach((q) => assert.ok(l.vocab.find((v) => v.key === q.word), l.id + " qcm " + q.word));
    assert.ok(C.CONCEPTS[l.exercises.translation.concept], l.id + " concept");
    assert.ok(l.exercises.translation.show, l.id + " show");
    assert.ok(E.lessonMinutes(l) >= 1 && E.lessonMinutes(l) <= 5, l.id + " durée " + E.lessonMinutes(l));
    l.exercises.gaps.forEach((g) => assert.ok(g.text.includes("___")));
  });
});

console.log("\n" + pass + " tests OK");
