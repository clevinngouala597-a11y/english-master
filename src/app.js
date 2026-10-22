/* English Master — interface. */
(function () {
  "use strict";
  var C = window.EM_CONTENT, E = window.EM_ENGINE;
  var PAGES_URL = "https://clevinngouala597-a11y.github.io/english-master/";
  var IN_CLAUDE = !!(window.claude && typeof window.claude.use === "function");
  var IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  /* ---------- Icônes ---------- */
  var IC = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    grid: '<rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    chart: '<path d="M5 20V11M12 20V4M19 20v-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    heart: '<path d="M12 20s-7-4.4-9.3-8.6C1.2 8.6 3 5 6.5 5c2 0 3.5 1.2 5.5 3.3C14 6.2 15.5 5 17.5 5 21 5 22.8 8.6 21.3 11.4 19 15.6 12 20 12 20z"/>',
    play: '<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/>',
    replay: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
    prev: '<path d="M6 5v14"/><path d="M18 5 9 12l9 7z"/>',
    next: '<path d="M18 5v14"/><path d="m6 5 9 7-9 7z"/>',
    speaker: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    ext: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    coach: '<path d="M3 12h3l3-7 4 14 3-7h5"/>',
    send: '<path d="M4 12 20 4l-6 16-2.5-6.5z"/>',
    chat: '<path d="M4 4h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M20 9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2v3l-3-3h-4"/>',
    cup: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sign: '<path d="M12 3v18"/><path d="M5 5h11l3 2.5L16 10H5z"/><path d="M19 13H8l-3 2.5L8 18h11z"/>',
    basket: '<path d="M3 9h18l-2 11H5z"/><path d="m8 9 4-6 4 6"/><path d="M9 13v4M15 13v4"/>',
    cloud: '<circle cx="8" cy="8" r="3"/><path d="M8 2v1.5M2 8h1.5M3.8 3.8l1 1M12.2 3.8l-1 1"/><path d="M9 20h9a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.4 1.5A3.3 3.3 0 0 0 9 20z"/>',
    book: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'
  };
  function icon(name, size, sw) {
    return '<svg width="' + (size || 22) + '" height="' + (size || 22) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IC[name] || "") + "</svg>";
  }
  var TILE = { chat: "#5CE1E6", cup: "#C8FF2E", clock: "#EDEBE4", sign: "#5CE1E6", basket: "#C8FF2E", cloud: "#EDEBE4" };
  var PARTNER = { Barista: "le barista", Passante: "une passante", "Employé": "l’employé du magasin" };
  var POSTER = { orange: "#FF7A3D", blue: "#5CE1E6", sky: "#9AF0F3", yellow: "#C8FF2E", lime: "#FF4FD8", white: "#EDEBE4" };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pct(n) { return n == null ? "—" : n + " %"; }
  function mmss(sec) { sec = Math.round(sec); return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0"); }

  /* ---------- Sauvegarde ---------- */
  var KEY = "em.state.v1";
  function loadLocal() { try { var r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  var S = E.migrate(loadLocal());
  function save() {
    S.updatedAt = Date.now();
    if (S.bilans.length > 30) S.bilans = S.bilans.slice(-30);
    if (S.watched.length > 200) S.watched = S.watched.slice(-200);
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* stockage indisponible : l'app continue */ }
    Cloud.push();
  }
  var Cloud = {
    ref: null, timer: null,
    init: async function () {
      if (!IN_CLAUDE) return;
      try {
        var db = await window.claude.use("db");
        var user = await window.claude.use("user");
        if (!db || !user) return;
        var uid = await user.id();
        if (!uid) return;
        this.ref = db.doc("data/users/" + uid + "/state");
        var snap = await this.ref.get();
        var remote = snap.exists ? snap.data() : null;
        if (remote && remote.json && (remote.updatedAt || 0) > (S.updatedAt || 0)) {
          S = E.migrate(JSON.parse(remote.json));
          try { localStorage.setItem(KEY, remote.json); } catch (e) { }
          render();
        } else if ((S.updatedAt || 0) > ((remote && remote.updatedAt) || 0)) {
          this.push();
        }
      } catch (e) { this.ref = null; }
    },
    push: function () {
      if (!this.ref) return;
      var self = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        try { self.ref.set({ json: JSON.stringify(S), updatedAt: S.updatedAt || Date.now() }).catch(function () { }); } catch (e) { }
      }, 1200);
    }
  };

  /* ---------- Claude (corrections et coach, version claude.ai) ---------- */
  var AI = {
    fn: null, on: false,
    init: async function () {
      if (!IN_CLAUDE) return;
      try { var s = await window.claude.use("sample"); if (s) { this.fn = s; this.on = true; } } catch (e) { }
    },
    json: async function (input) {
      if (!this.fn || !this.on) throw { code: "off" };
      try { return await this.fn.json(input, { modelTier: "quick" }); }
      catch (e) {
        if (e && ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].indexOf(e.code) !== -1) this.on = false;
        throw e;
      }
    }
  };

  /* ---------- Voix naturelles (phrases pré-enregistrées, Kokoro) ---------- */
  var NV = {
    M: window.EM_AUDIO || null,
    INFO: {
      af_heart: { name: "Heart", desc: "Femme · accent américain" },
      am_michael: { name: "Michael", desc: "Homme · accent américain" },
      bf_emma: { name: "Emma", desc: "Femme · accent britannique" },
      bm_george: { name: "George", desc: "Homme · accent britannique" }
    },
    el: null, token: 0, broken: {}, unlocked: false,
    key: function (t) { return String(t).replace(/…/g, "").replace(/\s+/g, " ").trim(); },
    has: function () { return !!(this.M && this.M.voices && this.M.voices.length); },
    pick: function (lang) {
      if (!this.has()) return null;
      var p = S.profile.voice || "";
      if (p.indexOf("neural:") === 0) return this.M.voices.indexOf(p.slice(7)) !== -1 ? p.slice(7) : null;
      if (p) return null;
      return /gb/i.test(lang || "") ? "bf_emma" : "af_heart";
    },
    clip: function (voice, text) { var c = this.M && this.M.clips[voice] && this.M.clips[voice][this.key(text)]; return c && !this.broken[this.src(voice, c)] ? c : null; },
    src: function (voice, c) { return "audio/" + voice + "/" + c[0] + ".mp3"; },
    audio: function () {
      if (!this.el) { this.el = new Audio(); this.el.preload = "auto"; this.el.setAttribute("playsinline", ""); window.__emAudio = this.el; }
      return this.el;
    },
    unlock: function () {
      if (this.unlocked || !this.has()) return;
      this.unlocked = true;
      var a = this.audio(), v = this.M.voices[0];
      try { a.muted = true; a.src = "audio/" + v + "/common.mp3"; a.setAttribute("data-src", a.src); var p = a.play(); if (p && p.then) p.then(function () { a.pause(); a.muted = false; }).catch(function () { a.muted = false; }); } catch (e) { a.muted = false; }
    },
    play: function (voice, c, rate, vol) {
      var self = this, my = ++this.token, a = this.audio(), src = this.src(voice, c);
      return new Promise(function (res) {
        var done = false, iv = null, to = null;
        var fin = function (ok) {
          if (done) return; done = true; clearInterval(iv); clearTimeout(to); a.removeEventListener("error", onErr);
          if (my === self.token) try { a.pause(); } catch (e) { }
          res(ok);
        };
        var onErr = function () { self.broken[src] = true; fin(false); };
        var start = function () {
          if (my !== self.token) { fin(true); return; }
          try { a.currentTime = c[1]; } catch (e) { }
          a.defaultPlaybackRate = rate; a.playbackRate = rate;
          a.preservesPitch = true; a.webkitPreservesPitch = true; a.mozPreservesPitch = true;
          a.volume = vol == null ? 1 : vol; a.muted = false;
          var p = a.play();
          if (p && p.catch) p.catch(function () { fin(false); });
          iv = setInterval(function () { if (my !== self.token) { fin(true); return; } if (a.currentTime >= c[2] || a.ended) fin(true); }, 25);
          to = setTimeout(function () { fin(true); }, ((c[2] - c[1]) / rate) * 1000 + 6000);
        };
        a.addEventListener("error", onErr);
        var whenReady = function () { var h = function () { a.removeEventListener("loadedmetadata", h); start(); }; a.addEventListener("loadedmetadata", h); };
        if (a.getAttribute("data-src") !== src) { a.setAttribute("data-src", src); whenReady(); a.src = src; a.load(); }
        else if (a.readyState >= 1) start();
        else whenReady();
      });
    },
    stop: function () { this.token++; if (this.el) try { this.el.pause(); } catch (e) { } }
  };

  /* ---------- Voix de l'appareil ---------- */
  var TTS = {
    ok: typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined",
    voices: [],
    load: function () {
      if (!this.ok) return;
      var self = this;
      var f = function () { try { self.voices = window.speechSynthesis.getVoices() || []; } catch (e) { } };
      f();
      try { window.speechSynthesis.addEventListener("voiceschanged", function () { f(); if (ui && ui.route === "settings") render(); }); } catch (e) { }
    },
    NOVELTY: /^(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|grandma|grandpa|rocko|shelley|sandy|eddy|flo|reed)\b/i,
    quality: function (v) {
      var s = (v.name + " " + v.voiceURI).toLowerCase();
      if (/premium/.test(s)) return 3;
      if (/enhanced|améliorée|siri|neural|natural|online/.test(s)) return 2;
      if (/google/.test(s)) return 2;
      return 1;
    },
    english: function () {
      var self = this;
      return this.voices.filter(function (v) { return /^en[-_]/i.test(v.lang || "") && !self.NOVELTY.test(v.name); })
        .sort(function (a, b) { return self.quality(b) - self.quality(a) || (a.lang < b.lang ? -1 : a.lang > b.lang ? 1 : 0) || (a.name < b.name ? -1 : 1); });
    },
    byURI: function (uri) { return uri ? this.voices.filter(function (v) { return v.voiceURI === uri; })[0] || null : null; },
    voice: function (lang, auto) {
      var chosen = auto ? null : this.byURI(S.profile.voice);
      if (chosen) return chosen;
      var self = this, lc = lang.toLowerCase();
      var en = this.english();
      var exact = en.filter(function (v) { return v.lang.replace("_", "-").toLowerCase() === lc; });
      var best = function (list) { return list.slice().sort(function (a, b) { return self.quality(b) - self.quality(a) || (/samantha|daniel|karen|serena|arthur/i.test(b.name) ? 1 : 0) - (/samantha|daniel|karen|serena|arthur/i.test(a.name) ? 1 : 0); })[0]; };
      var e = best(exact), any = best(en);
      if (e && any && self.quality(any) > self.quality(e)) return any;
      return e || any || null;
    },
    speak: function (text, o) {
      var self = this; o = o || {};
      var nv = o.neural || (o.voice ? null : NV.pick(o.lang));
      var c = nv ? NV.clip(nv, text) : null;
      if (c) {
        if (this.ok) try { window.speechSynthesis.cancel(); } catch (e) { }
        return NV.play(nv, c, Math.max(0.5, Math.min(1.2, o.rate || 1)), o.volume).then(function (ok) { return ok ? true : self.speakDevice(text, o); });
      }
      return this.speakDevice(text, o);
    },
    speakDevice: function (text, o) {
      var self = this; o = o || {};
      return new Promise(function (res) {
        if (!self.ok) { res(false); return; }
        var u = new window.SpeechSynthesisUtterance(text);
        u.lang = o.lang || "en-US";
        var v = o.voice || self.voice(u.lang);
        if (v) { try { u.voice = v; } catch (e) { } if (o.voice || S.profile.voice) u.lang = v.lang; }
        u.rate = Math.max(0.4, Math.min(1.2, o.rate || 1));
        if (o.volume != null) u.volume = o.volume;
        var done = false;
        var fin = function (ok) { if (!done) { done = true; res(ok); } };
        u.onend = function () { fin(true); };
        u.onerror = function () { fin(false); };
        setTimeout(function () { fin(true); }, (E.tokens(text).length / (2 * u.rate)) * 1000 + 5000);
        try { window.speechSynthesis.speak(u); } catch (e) { fin(false); }
      });
    },
    cancel: function () { NV.stop(); if (this.ok) try { window.speechSynthesis.cancel(); } catch (e) { } }
  };

  /* ---------- Micro (reconnaissance vocale de Safari / Chrome) ---------- */
  var STT = {
    Ctor: window.SpeechRecognition || window.webkitSpeechRecognition || null,
    blocked: IN_CLAUDE, rec: null,
    ok: function () { return !!this.Ctor && !this.blocked; },
    listen: function (lang) {
      var self = this;
      return new Promise(function (res, rej) {
        if (!self.Ctor) { rej("unsupported"); return; }
        var r;
        try { r = new self.Ctor(); } catch (e) { rej("unsupported"); return; }
        self.rec = r;
        r.lang = lang || "en-US"; r.interimResults = false; r.maxAlternatives = 3; r.continuous = false;
        var got = null;
        r.onresult = function (ev) { var alts = ev.results[0]; got = []; for (var i = 0; i < alts.length; i++) got.push(alts[i].transcript); };
        r.onerror = function (ev) {
          if (["not-allowed", "service-not-allowed", "audio-capture"].indexOf(ev.error) !== -1) self.blocked = true;
          rej(ev.error || "error");
        };
        r.onend = function () { self.rec = null; if (got && got.length) res(got); else rej("no-speech"); };
        try { r.start(); } catch (e) { rej("start"); }
      });
    },
    stop: function () { if (this.rec) try { this.rec.stop(); } catch (e) { } }
  };
  function micMessage(err) {
    if (err === "no-speech") return "Je n’ai rien entendu. Touche le micro et parle tout de suite après.";
    if (STT.blocked || err === "not-allowed" || err === "service-not-allowed") return "Le micro n’est pas autorisé ici. Autorise-le dans Safari, ou ouvre ta version GitHub.";
    return "Le micro n’a pas fonctionné. Réessaie, ou réponds par écrit.";
  }

  /* ---------- État de l'interface ---------- */
  var ui = { sayTok: 0,
    route: S.profile.onboarded ? "home" : "onboard", f: {}, lib: { level: "A1", cat: "quotidien", q: "" },
    watch: { level: S.profile.level || "A1", theme: "Tous" }, suivi: "periode",
    player: null, oral: null, ex: null, coach: null, review: null, confirm: null, lastRun: null
  };
  var NAV_ROUTES = ["home", "library", "watch", "oral", "suivi", "words"];
  function stopAll() {
    if (ui.player && ui.player.playing) pausePlayer();
    YTM.destroy();
    if (ui.oral && ui.oral.sh) ui.oral.sh.token++;
    TTS.cancel(); STT.stop();
    if (ui.oral) ui.oral.listening = false;
  }
  function go(route, params) {
    stopAll();
    ui.route = route; ui.p = params || {}; ui.confirm = null;
    render();
    window.scrollTo(0, 0);
  }
  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 2400);
  }

  /* ---------- Petits composants ---------- */
  function statusPill(st) {
    if (st.key === "maitrisee") return '<span class="pill blue">Maîtrisée · ' + st.pct + " %</span>";
    if (st.key === "fragile") return '<span class="pill org">À consolider · ' + st.pct + " %</span>";
    if (st.key === "en-cours") return '<span class="pill">' + esc(st.label) + "</span>";
    return '<span class="pill">Nouvelle</span>';
  }
  function tile(l, small) {
    return '<span class="tile' + (small ? " sm" : "") + '" style="color:' + (TILE[l.icon] || "#EDEBE4") + '">' + icon(l.icon, small ? 26 : 30) + "</span>";
  }
  function meter(label, value, opts) {
    opts = opts || {};
    if (value == null) return '<div class="meter"><div class="row-between"><span>' + esc(label) + '</span><span class="muted" style="font-weight:500">' + (opts.empty || "pas encore testé") + '</span></div><div class="bar none"></div></div>';
    var weak = value < E.MASTERY;
    return '<div class="meter"><div class="row-between"><span>' + esc(label) + '</span><span' + (weak ? ' style="color:var(--org)"' : "") + ">" + (opts.text || value + " %") + (weak && !opts.text ? " · " + (opts.weakLabel || "fragile") : "") + '</span></div><div class="bar' + (weak ? " org" : "") + '"><i style="width:' + Math.max(2, Math.min(100, value)) + '%"></i></div></div>';
  }
  function notice(text) { return '<p class="notice">' + icon("info", 18) + "<span>" + text + "</span></p>"; }
  function top(backAction, title, sub, right) {
    return '<header class="top"><button class="icon-btn" data-a="' + backAction + '" aria-label="Retour">' + icon(backAction === "close-ex" ? "close" : "back", 22, 2.2) + '</button><div class="title"><h1>' + esc(title) + '</h1><span class="xs muted">' + esc(sub || "") + "</span></div>" + (right || '<span class="spacer"></span>') + "</header>";
  }
  function scene(l, crop) {
    var obj = {
      cup: '<path d="M2 14h34v18a10 10 0 0 1-10 10H12A10 10 0 0 1 2 32z" fill="#C8FF2E"/><path d="M36 19h5a6 6 0 0 1 0 12h-5" fill="none" stroke="#C8FF2E" stroke-width="4"/>',
      clock: '<circle cx="22" cy="24" r="19" fill="none" stroke="#C8FF2E" stroke-width="5"/><path d="M22 13v12l8 5" stroke="#C8FF2E" stroke-width="4" stroke-linecap="round" fill="none"/>',
      sign: '<path d="M22 4v40" stroke="#C8FF2E" stroke-width="4"/><path d="M6 8h26l7 6-7 6H6z" fill="#C8FF2E"/><path d="M38 24H12l-7 6 7 6h26z" fill="#C8FF2E" opacity="0.7"/>',
      basket: '<path d="M2 16h40l-5 26H7z" fill="#C8FF2E"/><path d="m12 16 10-13 10 13" fill="none" stroke="#C8FF2E" stroke-width="4"/>',
      cloud: '<circle cx="14" cy="12" r="8" fill="#C8FF2E"/><path d="M16 44h22a9 9 0 0 0 0-18 12 12 0 0 0-23 3 7.5 7.5 0 0 0 1 15z" fill="#EDEBE4"/>',
      chat: '<path d="M2 6h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H14l-8 7v-7H6a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" fill="#C8FF2E"/>'
    }[l.icon] || "";
    return '<svg viewBox="0 0 358 ' + (crop ? 150 : 214) + '" role="img" aria-label="Scène de la leçon ' + esc(l.title) + '"><rect width="358" height="214" fill="#1C1C1C"/><circle cx="60" cy="40" r="80" fill="#5CE1E6" opacity="0.14"/><rect y="132" width="358" height="82" fill="#0A0A0A"/><circle cx="92" cy="74" r="20" fill="#EDEBE4"/><path d="M60 132a32 30 0 0 1 64 0z" fill="#EDEBE4"/><circle cx="266" cy="70" r="20" fill="#5CE1E6"/><path d="M234 132a32 32 0 0 1 64 0z" fill="#5CE1E6"/><g transform="translate(156 84)">' + obj + "</g></svg>";
  }
  function ring(value, size) {
    size = size || 120;
    var r = 52, c = 2 * Math.PI * r, v = Math.max(0, Math.min(100, value || 0));
    var ang = (-90 + 0.8 * 360) * Math.PI / 180;
    var x1 = 64 + 44 * Math.cos(ang), y1 = 64 + 44 * Math.sin(ang), x2 = 64 + 60 * Math.cos(ang), y2 = 64 + 60 * Math.sin(ang);
    var col = v >= E.MASTERY ? "#5CE1E6" : "#FF7A3D";
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 128 128" role="img" aria-label="Score ' + v + ' %, seuil de maîtrise 80 %"><circle cx="64" cy="64" r="52" fill="none" stroke="#2B2B2B" stroke-width="12"/><circle cx="64" cy="64" r="52" fill="none" stroke="' + col + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + (c * v / 100).toFixed(1) + " " + c.toFixed(1) + '" transform="rotate(-90 64 64)"/><path d="M' + x1.toFixed(1) + " " + y1.toFixed(1) + "L" + x2.toFixed(1) + " " + y2.toFixed(1) + '" stroke="#EDEBE4" stroke-width="3" stroke-linecap="round"/><text x="64" y="73" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="34" fill="#EDEBE4">' + v + " %</text></svg>";
  }
  function stepsBar(n, cls) {
    return '<div class="steps-bar" style="grid-template-columns:repeat(' + n + ',minmax(0,1fr))" aria-hidden="true">' + cls.map(function (c) { return '<i class="' + c + '"></i>'; }).join("") + "</div>";
  }
  function watchLink(title) { return "https://www.google.com/search?q=" + encodeURIComponent("où regarder " + title + " en streaming"); }

  /* ---------- Écrans ---------- */
  var SCREENS = {};

  /* Premier lancement et réglages */
  function profileForm(isSettings) {
    var P = S.profile, f = ui.f;
    var per = P.period || { type: "ecole", end: E.addDays(E.mondayOf(E.today()), 11) };
    var lvl = f.level || P.level || "A1", goal = f.goal || P.goal, ptype = f.ptype || per.type;
    return '<div class="stack">' +
      '<label class="field"><span>Ton prénom</span><input class="input" id="f-name" data-f="name" autocomplete="given-name" value="' + esc(f.name != null ? f.name : P.name) + '"></label>' +
      '<div class="field"><span>Ton niveau</span><div class="seg acc" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + C.LEVELS.map(function (x) { return '<button data-a="set-f" data-v="level:' + x + '" aria-pressed="' + (lvl === x) + '">' + x + "</button>"; }).join("") + "</div>" +
      (lvl !== "A1" ? '<p class="small muted">Les leçons ' + lvl + " sont en préparation. En attendant, l’app te propose l’A1 sans traduction et des séries de ton niveau.</p>" : "") + "</div>" +
      '<div class="field"><span>Ton objectif</span><div class="stack-sm">' + C.GOALS.map(function (g) { return '<button class="choice" data-a="set-f" data-v="goal:' + g.key + '" aria-pressed="' + (goal === g.key) + '">' + esc(g.label) + "</button>"; }).join("") + "</div></div>" +
      '<div class="field"><span>Tu es en ce moment en période…</span><div class="seg" style="grid-template-columns:repeat(2,minmax(0,1fr))"><button data-a="set-f" data-v="ptype:ecole" aria-pressed="' + (ptype === "ecole") + '">École</button><button data-a="set-f" data-v="ptype:entreprise" aria-pressed="' + (ptype === "entreprise") + '">Entreprise</button></div></div>' +
      '<label class="field"><span>Dernier jour de cette période</span><input class="input" type="date" id="f-pend" data-f="pend" value="' + esc(f.pend || per.end) + '"></label>' +
      '<div class="grid2"><label class="field"><span>Heure de tes séances</span><input class="input" type="time" id="f-slot" data-f="slot" value="' + esc(f.slot || P.slot || "19:00") + '"></label>' +
      '<label class="field"><span>Minutes par séance</span><input class="input" type="number" inputmode="numeric" min="5" max="60" step="5" id="f-min" data-f="min" value="' + esc(f.min || P.minutes || 15) + '"></label></div>' +
      '<button class="btn primary big block" data-a="save-profile">' + (isSettings ? "Enregistrer" : "C’est parti") + "</button></div>";
  }
  SCREENS.onboard = function () {
    return '<header class="stack-sm" style="padding-top:8px"><div class="brand"><b><i>EM/</i> English Master</b><span>Video Coach</span></div></header>' +
      '<section class="stack-sm"><h1 class="h1">Ton coach d’anglais, calé sur ton alternance</h1><p class="muted">Leçons avec voix et sous-titres, oral au micro, exercices corrigés, bilan avec le coach à la fin de chaque module.</p></section>' +
      profileForm(false) +
      notice("Tes progrès restent sur ton appareil" + (IN_CLAUDE ? " et dans ton compte Claude." : ".") + " Tu pourras tout modifier dans les réglages.");
  };
  var ACCENT = { "en-us": "américaine", "en-gb": "britannique", "en-au": "australienne", "en-ie": "irlandaise", "en-za": "sud-africaine", "en-in": "indienne", "en-ca": "canadienne", "en-nz": "néo-zélandaise", "en-sc": "écossaise" };
  function voiceSection() {
    var cur = S.profile.voice || "", list = TTS.ok ? TTS.english() : [];
    var row = function (pick, test, label, sub, pill, on) {
      return '<div class="row" style="gap:10px;padding:10px 12px;border-radius:12px;' + (on ? "border:2px solid var(--acc);" : "border:1px solid var(--line);") + '"><button class="grow" style="text-align:left;background:none;border:0;padding:0;min-height:44px;display:flex;flex-direction:column;justify-content:center;gap:2px" data-a="voice-pick" data-v="' + esc(pick) + '" aria-pressed="' + on + '"><span style="font-weight:700">' + esc(label) + (on ? ' <span style="color:var(--acc)">✓</span>' : "") + '</span><span class="xs muted">' + esc(sub) + "</span></button>" + (pill || "") + '<button class="icon-btn" style="width:40px;height:40px" data-a="voice-test" data-v="' + esc(test) + '" aria-label="Écouter ' + esc(label) + '">' + icon("speaker", 18) + "</button></div>";
    };
    var h = '<section class="card stack" id="voix"><div class="stack-sm" style="gap:2px"><p class="eyebrow">Voix anglaise</p><p class="small muted">Touche le haut-parleur pour écouter, puis choisis ta voix. Elle sert partout : leçons, oral, shadowing, dictée.</p></div>';
    if (NV.has()) {
      h += '<div class="stack-sm"><p class="small" style="font-weight:700">Voix naturelles <span class="pill acc">Recommandé</span></p>' +
        row("", "neural:auto", "Automatique", "Heart pour les leçons américaines, Emma pour les britanniques", "", cur === "") +
        NV.M.voices.map(function (v) { var i = NV.INFO[v] || { name: v, desc: "" }; return row("neural:" + v, "neural:" + v, i.name, i.desc, "", cur === "neural:" + v); }).join("") +
        '<p class="xs muted">Toutes les phrases des leçons sont enregistrées avec ces voix. Les phrases que tu ajoutes toi-même sont lues par la voix de ' + (IS_IOS ? "l’iPhone" : "l’appareil") + ".</p></div>";
    }
    if (TTS.ok) {
      var onDevice = !!(cur && cur.indexOf("neural:") !== 0);
      h += '<details' + (onDevice || !NV.has() ? " open" : "") + '><summary class="small" style="cursor:pointer;min-height:44px;display:flex;align-items:center;color:var(--blue-fg);font-weight:600">Voix de ' + (IS_IOS ? "l’iPhone" : "l’appareil") + " (" + list.length + ")</summary>" +
        (list.length ? '<div class="stack-sm">' + list.map(function (v) { var q = TTS.quality(v); return row(v.voiceURI, v.voiceURI, v.name.replace(/\s*\((enhanced|premium|améliorée)\)/i, ""), "Voix " + (ACCENT[v.lang.replace("_", "-").toLowerCase()] || v.lang), '<span class="pill ' + (q === 3 ? "acc" : q === 2 ? "blue" : "") + '">' + (q === 3 ? "Premium" : q === 2 ? "Améliorée" : "Standard") + "</span>", cur === v.voiceURI); }).join("") + "</div>" : '<p class="small muted dots">Chargement des voix</p>') +
        '<p class="xs muted" style="margin-top:8px">Pour d’autres voix : Réglages de l’iPhone → Accessibilité → Contenu énoncé → Voix → Anglais, puis télécharge une voix Premium.</p></details>';
    }
    return h + "</section>";
  }
  SCREENS.settings = function () {
    var confirm = ui.confirm === "reset";
    return top("back-home", "Réglages", "Profil et alternance") + voiceSection() + profileForm(true) +
      '<section class="card stack"><p class="eyebrow">Tes données</p><p class="small muted">' + (IN_CLAUDE ? "Enregistrées dans ton compte Claude et sur cet appareil." : "Enregistrées dans le navigateur de cet appareil.") + " Le coach et les corrections détaillées utilisent Claude " + (IN_CLAUDE ? "(disponible ici)" : "(disponible dans la version claude.ai)") + ".</p>" +
      (confirm ? '<p class="fb bad">Tout effacer : leçons, scores, mots, bilans. Impossible à annuler.</p><div class="row"><button class="btn grow" data-a="cancel-confirm">Annuler</button><button class="btn grow" style="border-color:var(--org);color:var(--org)" data-a="reset-yes">Tout effacer</button></div>' : '<button class="btn ghost" data-a="ask-reset">' + icon("trash", 18) + "Effacer mes données</button>") +
      "</section>";
  };

  function videoPill(l) {
    if (!l.video) return "";
    var inf = (S.vids || {})[l.video.id], lv = (S.lessons[l.id] || {}).video;
    if (inf && inf.err != null && !IN_CLAUDE) return '<span class="pill org">Vidéo indisponible</span>';
    if (lv && lv.done) return '<span class="pill blue">Vidéo vue</span>';
    return '<span class="pill">▶ YouTube</span>';
  }
  function recentHtml() {
    var rows = Object.keys(S.lessons).map(function (id) {
      var ls = S.lessons[id], v = ls.video || {};
      var d = [ls.last, v.last, ls.watched, ls.started].filter(Boolean).sort().pop();
      return { id: id, d: d, ls: ls };
    }).filter(function (r) { return r.d && E.lessonById(r.id); }).sort(function (a, b) { return a.d < b.d ? 1 : -1; }).slice(0, 3);
    if (!rows.length) return "";
    return '<section class="stack"><h2 class="eyebrow">Récemment</h2><div class="card divide" style="padding:0">' + rows.map(function (r) {
      var l = E.lessonById(r.id), st = E.lessonStatus(S, r.id), v = r.ls.video;
      var bits = [E.fmtShort(r.d)];
      if (v && (v.pct || v.done)) bits.push(v.done ? "vidéo vue" : "vidéo " + v.pct + " %");
      if (st.pct != null) bits.push("exercices " + st.pct + " %");
      return '<button class="list-row" style="width:100%;background:none;border-left:0;border-right:0;border-bottom:0;text-align:left" data-a="open-lesson" data-v="' + l.id + '">' + tile(l, true) + '<span class="grow stack-sm" style="gap:2px"><span style="font-weight:600">' + esc(l.title) + '</span><span class="small muted">' + esc(bits.join(" · ")) + "</span></span>" + statusPill(st) + "</button>";
    }).join("") + "</div></section>";
  }

  /* Accueil */
  SCREENS.home = function () {
    var t = E.today(), P = S.profile, pi = E.periodInfo(P, t);
    var recs = E.recommend(S, { date: t, minutes: P.minutes });
    var open = recs.filter(function (r) { return r.kind !== "done"; });
    var rec = open[0] || null;
    var due = E.dueItems(S, t).length;
    var nWords = Object.keys(S.words).length, st = E.streak(S, t), sk = E.skillLevels(S);
    var lastB = S.bilans[S.bilans.length - 1];
    var h = "";
    h += '<header class="row-between" style="align-items:center"><div class="brand"><b><i>EM/</i> English Master</b><span>Video Coach</span></div><div class="row">' +
      '<button class="btn round" style="min-height:44px;padding:0 12px 0 16px" data-a="go" data-v="settings" aria-label="Niveau ' + P.level + ', changer">' + P.level + icon("chev", 16, 2.2) + "</button>" +
      '<button class="avatar" data-a="go" data-v="settings" aria-label="Réglages">' + esc((P.name || "?").charAt(0).toUpperCase()) + "</button></div></header>";
    if (pi) {
      var bars = "";
      for (var i = 1; i <= 10; i++) bars += '<span style="height:5px;border-radius:3px;background:' + (i <= pi.dayIndex ? "var(--acc)" : "var(--line)") + '"></span>';
      h += '<button class="card tight stack-sm" style="text-align:left;color:var(--fg)" data-a="go" data-v="suivi"><span class="row-between" style="align-items:center"><span style="font-weight:600">Période ' + E.PERIOD_LABEL[pi.type].toLowerCase() + " · jour " + pi.dayIndex + ' sur 10</span><span class="small" style="color:var(--blue-fg);font-weight:600">Suivi</span></span><span style="display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:3px">' + bars + '</span><span class="small muted">Objectif : ' + E.periodPlan(pi.type, P).text + "</span></button>";
    }
    h += '<section class="stack-sm"><h1 class="h1">' + (P.name ? "Salut " + esc(P.name) : "Salut") + '</h1><p class="muted">Objectif : ' + esc((C.GOALS.filter(function (g) { return g.key === P.goal; })[0] || C.GOALS[0]).label.toLowerCase()) + " · niveau " + P.level + "</p></section>";
    h += '<section class="stack-sm"><h2 class="eyebrow">Temps disponible</h2><div class="row">' + [5, 10, 15, 20].map(function (m) { return '<button class="btn grow" style="min-height:44px;' + (P.minutes === m ? "background:var(--acc);color:var(--on-acc);border:0;font-weight:700" : "") + '" data-a="minutes" data-v="' + m + '" aria-pressed="' + (P.minutes === m) + '">' + m + " min</button>"; }).join("") + "</div></section>";
    if (rec) {
      var l = rec.lesson;
      var dropN = String(C.LESSONS.indexOf(l) + 1).padStart(2, "0");
      h += '<article class="stack" style="gap:16px"><div class="row-between" style="align-items:center"><span class="sticker">' + (rec.kind === "review" ? "Révision du jour" : "Leçon du jour") + '</span><span class="eyebrow">Drop ' + dropN + " / " + String(C.LESSONS.length).padStart(2, "0") + "</span></div>" +
        '<h2 class="drop-title">' + esc(l.title).split(" ").join("<br>") + '<span class="star" aria-hidden="true">✶</span></h2><p class="muted" style="font-size:16px">' + esc(l.fr) + "</p>" +
        '<div class="row wrap" style="gap:8px"><span class="sticker out">' + l.accent + ' accent</span><span class="pill light">' + l.level + '</span><span class="pill">≈ ' + rec.watchMinutes + ' min</span>' + statusPill(rec.status) + "</div>" +
        '<div class="stage" style="aspect-ratio:358/150">' + scene(l, true) + "</div>" +
        '<div class="stack">' +
        '<div class="card tight stack-sm" style="background:var(--s2);border:0"><p class="eyebrow" style="font-size:11px">Pourquoi cette leçon</p><ul style="margin:0;padding:0;list-style:none" class="stack-sm">' +
        rec.reasons.map(function (r) { return '<li class="row" style="align-items:flex-start;font-size:14px"><span style="color:var(--blue);flex:none;margin-top:1px">' + icon("check", 18, 2.4) + "</span><span>" + esc(r) + "</span></li>"; }).join("") + "</ul></div>" +
        '<div class="row"><button class="btn primary big grow" data-a="open-lesson" data-v="' + l.id + '">' + icon("play", 18) + (rec.kind === "continue" && S.lessons[l.id] && S.lessons[l.id].watched ? "Revoir" : "Regarder") + "</button>" +
        (rec.kind === "continue" && S.lessons[l.id] && S.lessons[l.id].watched ? '<button class="btn big" data-a="start-ex" data-v="' + l.id + '">Exercices</button>' : '<button class="btn big ghost" data-a="harder" data-v="' + l.id + '">Plus difficile</button>') + "</div></div></article>";
    } else {
      h += '<section class="card stack"><h2 class="h2">Toutes les leçons A1 sont maîtrisées</h2><p class="muted">Bravo. Garde le rythme avec les révisions et une série de niveau A2 en attendant les prochaines leçons.</p><button class="btn primary" data-a="go" data-v="watch">Voir les séries</button></section>';
    }
    var tip = lastB && lastB.tip ? lastB.tip : null;
    h += '<section class="card stack" aria-label="Conseil du coach"><div class="row"><span class="avatar" style="width:36px;height:36px;background:var(--fg)">' + icon("coach", 20, 2.2) + '</span><div class="stack-sm" style="gap:0"><span class="eyebrow">Conseil du coach</span><span class="small muted">' + (tip ? "tiré de ton bilan du " + E.fmtDay(lastB.d) : "pour bien démarrer") + "</span></div></div>" +
      '<p style="font-size:17px;font-weight:600;line-height:1.4">' + esc(tip ? tip.title : "Répète chaque phrase à voix haute juste après la voix, sans lire. 5 fois suffisent.") + '</p><p class="small muted">' + esc(tip ? tip.detail : "Pourquoi : lire en silence entraîne tes yeux, pas ta bouche. Pour parler sans traduire, il faut produire la phrase soi-même.") + "</p>" +
      '<div class="row wrap">' + (rec ? '<button class="btn light" data-a="open-oral" data-v="' + rec.lesson.id + ':shadow">' + icon("mic", 18, 2.2) + "2 min de shadowing</button>" : "") +
      (lastB ? '<button class="link" data-a="open-bilan" data-v="' + (S.bilans.length - 1) + '">Relire mon dernier bilan</button>' : "") + "</div></section>";
    if (rec) {
      h += '<section class="card yellow stack" aria-label="Oral du jour"><div class="row-between"><span class="eyebrow" style="color:var(--on-acc);font-weight:800">Oral · 3 min</span><span class="small" style="font-weight:600">' + (STT.ok() ? "micro de l’iPhone" : "à l’écrit ici") + '</span></div><h2 class="h2">Parle avec ' + esc(PARTNER[rec.lesson.partner] || rec.lesson.partner) + '</h2><p>Tu réponds à chaque réplique' + (STT.ok() ? " à voix haute" : "") + ", " + (AI.on ? "Claude corrige ta réponse." : "l’app corrige ta réponse.") + '</p><div class="row"><button class="btn dark big grow" data-a="open-oral" data-v="' + rec.lesson.id + ':role">' + icon("mic", 20, 2.2) + 'Commencer</button><button class="btn big" style="background:transparent;border:2px solid var(--on-acc);color:var(--on-acc)" data-a="open-oral" data-v="' + rec.lesson.id + ':shadow">Shadowing</button></div></section>';
    }
    h += '<section class="grid3" aria-label="Tes chiffres"><button class="stat" data-a="go" data-v="words"><b>' + nWords + '</b><span class="small muted">mots appris</span></button><button class="stat" data-a="go" data-v="suivi"><b>' + st + ' j</b><span class="small muted">d’affilée</span></button><button class="stat' + (due ? " warn" : "") + '" data-a="start-review"><b>' + due + '</b><span class="small">' + (due ? "à réviser" : "révision à faire") + "</span></button></section>";
    h += recentHtml() + '<section class="stack"><div class="row-between"><h2 class="eyebrow">Compétences</h2><span class="small muted">selon tes exercices</span></div><div class="card stack" style="gap:16px">' +
      Object.keys(E.SKILLS).map(function (k) { return meter(E.SKILLS[k].label, sk[k]); }).join("") + "</div></section>";
    if (open.length > 1) {
      h += '<section class="stack"><h2 class="eyebrow">Ensuite pour toi</h2><div class="card divide" style="padding:0">' + open.slice(1, 3).map(function (r) {
        return '<button class="list-row" style="width:100%;background:none;border-left:0;border-right:0;border-bottom:0;text-align:left" data-a="open-lesson" data-v="' + r.lesson.id + '">' + tile(r.lesson, true) + '<span class="grow stack-sm" style="gap:2px"><span style="font-weight:600">' + esc(r.lesson.title) + '</span><span class="small muted">' + r.lesson.level + " · ≈ " + r.watchMinutes + " min · " + esc(r.reasons[0] || r.lesson.fr) + "</span></span></button>";
      }).join("") + '</div><button class="link" data-a="go" data-v="library">Voir toute la bibliothèque</button></section>';
    }
    return h;
  };

  /* Bibliothèque */
  function libTabs(active) {
    return '<nav class="seg" style="grid-template-columns:repeat(2,minmax(0,1fr))" aria-label="Type de contenu"><button data-a="go" data-v="library" aria-pressed="' + (active === "library") + '">Leçons</button><button data-a="go" data-v="watch" aria-pressed="' + (active === "watch") + '">Séries &amp; films</button></nav>';
  }
  function libList() {
    var q = E.normalize(ui.lib.q);
    var t = E.today();
    var recId = (E.recommend(S, { date: t }).filter(function (r) { return r.kind !== "done"; })[0] || {}).lesson;
    recId = recId ? recId.id : null;
    var list = C.LESSONS.filter(function (l) {
      if (l.level !== ui.lib.level) return false;
      if (ui.lib.cat && l.categories.indexOf(ui.lib.cat) === -1) return false;
      if (!q) return true;
      var hay = E.normalize(l.title + " " + l.fr + " " + l.vocab.map(function (v) { return v.en + " " + v.fr; }).join(" "));
      return hay.indexOf(q) !== -1;
    });
    if (!list.length) {
      if (ui.lib.level !== "A1") return '<div class="dashed stack-sm"><b style="color:var(--fg)">' + ui.lib.level + " : en préparation</b><span class=\"small\">Aucune leçon n’est affichée tant qu’elle n’est pas écrite et validée. Pour corser l’A1 : regarde sans traduction en vitesse 1×, ou passe à l’onglet Séries &amp; films.</span></div>";
      return '<div class="dashed small">Aucune leçon validée ' + (q ? "pour cette recherche" : "dans cette catégorie pour l’instant") + ". Essaie la catégorie Quotidien.</div>";
    }
    return '<div class="stack" style="gap:10px">' + list.map(function (l) {
      var st = E.lessonStatus(S, l.id), isRec = l.id === recId;
      return '<button class="lesson-card' + (isRec ? " is-rec" : "") + '" data-a="open-lesson" data-v="' + l.id + '">' + tile(l) + '<span class="grow stack-sm" style="gap:3px"><span class="t">' + esc(l.title) + '</span><span class="small muted">' + esc(l.fr) + '</span><span class="row wrap" style="gap:6px;margin-top:5px">' + (isRec && st.key !== "maitrisee" ? '<span class="pill acc">Recommandée</span>' : "") + statusPill(st) + videoPill(l) + '<span class="xs muted">≈ ' + E.lessonMinutes(l) + " min · " + l.accent + " · validée</span></span></span></button>";
    }).join("") + "</div>";
  }
  SCREENS.library = function () {
    var counts = {};
    C.LESSONS.forEach(function (l) { if (l.level === ui.lib.level) l.categories.forEach(function (c) { counts[c] = (counts[c] || 0) + 1; }); });
    return '<header class="stack"><h1 class="h1">Bibliothèque</h1>' + libTabs("library") + "</header>" +
      '<label class="input row" style="padding:0 14px;color:var(--mut)">' + icon("search", 20) + '<span class="sr">Rechercher une leçon</span><input id="f-libq" type="search" data-f="libq" data-live="lib" placeholder="Un thème, un mot…" value="' + esc(ui.lib.q) + '" style="flex:1;min-width:0;border:0;background:transparent;font-size:16px;outline:none;min-height:46px"></label>' +
      '<section class="stack-sm"><h2 class="eyebrow">Niveau</h2><div class="seg acc" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + C.LEVELS.map(function (x) {
        var n = C.LESSONS.filter(function (l) { return l.level === x; }).length;
        return '<button data-a="lib-level" data-v="' + x + '" aria-pressed="' + (ui.lib.level === x) + '" style="min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px"><span style="font-size:16px;font-weight:800">' + x + '</span><span class="xs" style="font-weight:500">' + (n ? n + " leçons" : "bientôt") + "</span></button>";
      }).join("") + "</div></section>" +
      '<section class="stack-sm"><h2 class="eyebrow">Catégorie</h2><div class="chips">' + C.CATEGORIES.map(function (c) {
        return '<button class="chip" data-a="lib-cat" data-v="' + c.key + '" aria-pressed="' + (ui.lib.cat === c.key) + '">' + esc(c.label) + (counts[c.key] ? " · " + counts[c.key] : "") + "</button>";
      }).join("") + "</div></section>" +
      notice("Leçons originales écrites pour English Master et lues par la voix de ton appareil. Sous-titres EN + FR inclus. Aucune vidéo externe n’est affichée sans source vérifiée.") +
      '<div id="lib-list">' + libList() + "</div>";
  };

  /* Séries et films */
  function watchCard(w, big) {
    var watched = S.watched.filter(function (x) { return x.title === w.title; }).length;
    return '<article class="card stack" style="padding:14px"><div class="row" style="align-items:flex-start;gap:12px"><div class="poster' + (big ? " lg" : "") + '" aria-hidden="true" style="background:' + (POSTER[w.tile] || "#EDEBE4") + '">' + esc(w.title.charAt(0)) + '</div><div class="grow stack-sm"><span style="font-size:' + (big ? 18 : 16) + 'px;font-weight:700">' + esc(w.title) + '</span><span class="small muted">' + esc(w.kind + " · " + w.meta) + '</span><span class="row wrap" style="gap:6px"><span class="pill light">' + w.level + " conseillé</span>" + (watched ? '<span class="pill blue">Vu ' + watched + " fois</span>" : "") + "</span></div></div>" +
      '<p style="font-size:14px"><b>Ce que tu vas entendre :</b> ' + esc(w.note) + '</p><p class="small muted"><b style="color:var(--fg)">Comment :</b> ' + esc(w.how) + "</p>" +
      '<div class="row"><a class="btn grow" style="min-height:44px;font-size:14px" href="' + watchLink(w.title) + '" target="_blank" rel="noopener">Où le regarder' + icon("ext", 16) + '</a><button class="btn primary grow" style="min-height:44px;font-size:14px" data-a="watched" data-v="' + esc(w.title) + '">J’ai regardé</button></div></article>';
  }
  SCREENS.watch = function () {
    var t = E.today();
    var rec = (E.recommend(S, { date: t }).filter(function (r) { return r.kind !== "done"; })[0] || {}).lesson || C.LESSONS[0];
    var linked = C.WATCH.filter(function (w) { return w.lesson === rec.id; });
    if (!linked.length) linked = C.WATCH.filter(function (w) { return w.themes.some(function (x) { return rec.themes.indexOf(x) !== -1; }); }).slice(0, 2);
    var items = C.WATCH.filter(function (w) { return w.level === ui.watch.level && (ui.watch.theme === "Tous" || w.themes.indexOf(ui.watch.theme) !== -1); });
    var h = '<header class="stack"><h1 class="h1">Bibliothèque</h1>' + libTabs("watch") + '<p class="small muted">De vrais titres choisis selon ton niveau et le thème de tes leçons. L’app ne les diffuse pas : elle t’aide à les trouver et à les regarder pour apprendre.</p></header>';
    h += '<section class="stack"><div class="stack-sm" style="gap:2px"><h2 class="eyebrow">Lié à ta leçon</h2><span class="display" style="font-size:22px">' + esc(rec.title) + "</span></div>" + linked.map(function (w) { return watchCard(w, true); }).join("") + "</section>";
    h += '<section class="card yellow stack"><h2 class="h2" style="font-size:22px">Regarder pour vraiment apprendre</h2><ol style="margin:0;padding-left:20px;font-size:15px;line-height:1.45" class="stack-sm"><li><b>Sous-titres en anglais</b>, pas en français : en français tu lis, tu n’écoutes plus.</li><li><b>Court et deux fois</b> : d’abord l’histoire, ensuite les phrases.</li><li><b>Pause, répète</b> une réplique utile à voix haute.</li><li><b>3 phrases max</b> par épisode, ajoutées à tes révisions.</li></ol><p style="font-size:14px;font-weight:500">Repère : si tu comprends moins de la moitié avec les sous-titres anglais, prends un titre d’un niveau en dessous.</p></section>';
    h += '<section class="stack"><h2 class="eyebrow">Par niveau et par thème</h2><div class="seg acc" style="grid-template-columns:repeat(4,minmax(0,1fr))">' + C.LEVELS.map(function (x) { return '<button data-a="watch-level" data-v="' + x + '" aria-pressed="' + (ui.watch.level === x) + '">' + x + "</button>"; }).join("") + '</div><div class="chips">' +
      ["Tous", "Quotidien", "Café", "Travail", "Industrie"].map(function (x) { return '<button class="chip" data-a="watch-theme" data-v="' + x + '" aria-pressed="' + (ui.watch.theme === x) + '">' + x + "</button>"; }).join("") + "</div>" +
      (items.length ? items.map(function (w) { return watchCard(w, false); }).join("") : '<div class="dashed small">Pas encore de titre vérifié pour ce niveau et ce thème. Essaie un autre thème : aucun titre n’est inventé pour remplir.</div>') + "</section>";
    h += '<section class="stack-sm"><label class="field"><span style="color:var(--fg);font-size:14px">Une réplique entendue à garder ?</span><div class="row"><input class="input grow" id="f-heard" data-f="heard" placeholder="Ex. : Can I get a coffee to go?" value="' + esc(ui.f.heard || "") + '"><button class="btn light" data-a="add-heard"' + (ui.busyHeard ? " disabled" : "") + ">" + (ui.busyHeard ? '<span class="dots">Vérif</span>' : "Ajouter") + "</button></div></label><p class=\"small muted\">" + (AI.on ? "Claude vérifie la phrase, la traduit et l’ajoute à tes révisions." : "La phrase est ajoutée à tes révisions.") + "</p></section>";
    return h;
  };

  /* Lecteur */
  function lineTimes(l) {
    var t = 0, out = [];
    l.lines.forEach(function (ln) { out.push(t); t += E.segSeconds({ text: ln.en, rate: 1 }); });
    return out;
  }
  function wordify(ln, li, P) {
    var l = E.lessonById(P.id);
    var html = esc(ln.en);
    (ln.w || []).forEach(function (k) {
      var v = l.vocab.filter(function (x) { return x.key === k; })[0];
      if (!v) return;
      var cands = [v.en.replace(/…/g, "").replace(/[?!.]$/, ""), v.en.split(" / ")[0], v.en.replace(/^(a |an |to )/, "")];
      for (var i = 0; i < cands.length; i++) {
        var c = esc(cands[i].trim());
        if (!c) continue;
        var idx = html.toLowerCase().indexOf(c.toLowerCase());
        if (idx !== -1 && html.slice(0, idx).lastIndexOf("<button") <= html.slice(0, idx).lastIndexOf("</button>")) {
          var on = P.card && P.card.key === k && P.card.line === li;
          html = html.slice(0, idx) + '<button class="word' + (on ? " on" : "") + '" data-a="word" data-v="' + li + ":" + k + '">' + html.slice(idx, idx + c.length) + "</button>" + html.slice(idx + c.length);
          break;
        }
      }
    });
    return html;
  }
  SCREENS.player = function () { return ui.player.tab === "video" ? playerVideo() : playerLesson(); };
  function playerLesson() {
    var P = ui.player, l = E.lessonById(P.id), seg = P.segs[P.idx], ls = S.lessons[l.id] || {};
    var shares = E.chapterShares(l), total = P.segs.length;
    var chapIdx = seg.chapter, inChap = P.segs.filter(function (s) { return s.chapter === chapIdx; }), posInChap = inChap.indexOf(seg);
    var times = lineTimes(l);
    var curLine = seg.kind === "line" ? seg.line : null;
    var subEn = seg.text, subFr = "";
    if (seg.kind === "line") subFr = l.lines[seg.line].fr;
    else { var v = l.vocab.filter(function (x) { return x.key === seg.vocab; })[0]; subFr = seg.kind === "word" ? v.fr : (v.exFr || ""); }
    var h = top("back-home", l.title, l.level + " · " + (l.categories.indexOf("conversations") !== -1 ? "Conversation" : "Quotidien") + " · accent " + l.accent,
      '<button class="icon-btn" data-a="fav" aria-pressed="' + (S.favs && S.favs.indexOf(l.id) !== -1) + '" aria-label="Ajouter la leçon aux favoris" style="' + (S.favs && S.favs.indexOf(l.id) !== -1 ? "color:var(--acc)" : "") + '">' + icon("heart", 20) + "</button>");
    h += playerTabs(P, l);
    h += '<div class="stage">' + scene(l) + '<span class="tag">Leçon originale · ' + (NV.pick(l.lang) ? "voix naturelle " + NV.INFO[NV.pick(l.lang)].name : "voix de " + (IS_IOS ? "l’iPhone" : "l’appareil")) + '</span><div class="subs">' +
      (P.en ? '<p class="en">' + esc(subEn) + "</p>" : "") + (P.fr && subFr ? '<p class="fr">' + esc(subFr) + "</p>" : "") + "</div></div>";
    if (!TTS.ok) h += '<p class="fb bad">La voix n’est pas disponible sur ce navigateur. Lis les sous-titres ci-dessous, ou ouvre l’app dans Safari.</p>';
    h += '<div class="stack-sm"><div class="row-between small muted num"><span>' + E.CHAPTERS[chapIdx] + " · " + (posInChap + 1) + " sur " + inChap.length + "</span><span>" + (P.done || ls.watched ? "Vue en entier ✓" : "≈ " + E.lessonMinutes(l) + " min") + "</span></div>" +
      '<div class="progress" role="progressbar" aria-label="Progression de la leçon" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + (P.idx + 1) + '">' + [0, 1, 2].map(function (c) {
        var segsC = P.segs.filter(function (s) { return s.chapter === c; });
        var fill = c < chapIdx ? 100 : c > chapIdx ? 0 : Math.round(((posInChap + (P.playing ? 0.5 : 0)) / segsC.length) * 100);
        if (P.done) fill = 100;
        return '<div style="flex:' + Math.round(shares[c] * 100) + '"><i style="width:' + fill + '%"></i></div>';
      }).join("") + '</div><div class="chapters">' + [0, 1, 2].map(function (c) { return '<button class="link" style="min-height:32px;font-size:12px;color:' + (c === chapIdx ? "var(--fg)" : "var(--mut)") + ';flex:' + Math.round(shares[c] * 100) + '" data-a="chapter" data-v="' + c + '">' + E.CHAPTERS[c] + "</button>"; }).join("") + "</div></div>";
    h += '<div class="controls"><button class="ctl" data-a="seg-replay" aria-label="Réécouter la phrase">' + icon("replay") + '</button><button class="ctl" data-a="seg-prev" aria-label="Phrase précédente">' + icon("prev") + '</button><button class="ctl play" data-a="play" aria-label="' + (P.playing ? "Pause" : "Lecture") + '">' + icon(P.playing ? "pause" : "play", 28) + '</button><button class="ctl" data-a="seg-next" aria-label="Phrase suivante">' + icon("next") + '</button><button class="ctl mic" data-a="open-oral" data-v="' + l.id + ':repeat" aria-label="Répéter à voix haute">' + icon("mic", 22, 2.2) + "</button></div>";
    h += '<div class="row"><div class="seg acc" role="group" aria-label="Vitesse de la voix" style="grid-template-columns:repeat(3,minmax(0,1fr));flex:1.2">' + [0.5, 0.75, 1].map(function (s) { return '<button data-a="speed" data-v="' + s + '" aria-pressed="' + (P.speed === s) + '" style="min-height:38px">' + String(s).replace(".", ",") + "×</button>"; }).join("") + "</div>" +
      '<div class="seg" style="grid-template-columns:repeat(2,minmax(0,1fr));flex:1"><button data-a="toggle-en" aria-pressed="' + P.en + '" style="min-height:38px">EN</button><button data-a="toggle-fr" aria-pressed="' + P.fr + '" style="min-height:38px">FR</button></div></div>';
    h += '<button class="link" data-a="go" data-v="settings">' + icon("speaker", 16) + "Changer de voix</button>";
    if (IS_IOS) h += notice("Volume : utilise les boutons de ton iPhone. Mode silencieux coupé pour entendre la voix.");
    else h += '<label class="row" style="min-height:44px;color:var(--mut)">' + icon("speaker") + '<span style="color:var(--fg);font-size:14px">Volume de la voix</span><input type="range" id="f-vol" min="0" max="100" value="' + Math.round((P.volume == null ? 1 : P.volume) * 100) + '" data-a-input="volume" style="flex:1;accent-color:#C8FF2E"></label>';
    h += '<p class="xs muted">Source : ' + esc(l.source.name) + " · leçon originale · validée le " + E.fmtDay(l.validation.date) + " · sous-titres " + l.subtitles.join(" + ") + "</p>";
    h += '<section class="card stack-sm"><p class="eyebrow">Objectifs</p><ul style="margin:0;padding-left:18px" class="stack-sm small">' + l.objectives.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ul></section>";
    h += '<section class="stack" style="gap:6px"><div class="stack-sm" style="gap:2px;padding:4px 0 6px"><h2 class="eyebrow">Sous-titres</h2><p class="small muted">Touche l’heure pour y aller, un mot souligné pour le garder.</p></div>';
    l.lines.forEach(function (ln, i) {
      var cur = curLine === i;
      h += '<div class="line' + (cur ? " cur" : "") + '"><div class="head"><button class="time" data-a="goto-line" data-v="' + i + '" aria-label="Aller à ' + mmss(times[i]) + '">' + mmss(times[i]) + '</button><div class="grow stack-sm" style="gap:3px"><span class="sp">' + esc(ln.sp === "Toi" ? (cur ? "Toi · en cours" : "Toi") : ln.sp) + '</span><p class="en">' + wordify(ln, i, P) + "</p>" + (P.fr ? '<p class="fr">' + esc(ln.fr) + "</p>" : "") + "</div></div>";
      if (cur) h += '<div class="row" style="padding-left:56px"><button class="btn" style="min-height:40px;font-size:13px" data-a="say-line" data-v="' + i + '">' + icon("speaker", 16) + 'Écouter</button><button class="btn light" style="min-height:40px;font-size:13px" data-a="open-oral" data-v="' + l.id + ":repeat:" + i + '">' + icon("mic", 16, 2.2) + "Répéter</button></div>";
      if (P.card && P.card.line === i) {
        var v = l.vocab.filter(function (x) { return x.key === P.card.key; })[0];
        var wkey = l.id + ":" + v.key, saved = !!S.words[wkey];
        h += '<div class="wordcard"><div class="row-between" style="align-items:flex-start"><div class="stack-sm" style="gap:2px"><span class="display" style="font-size:24px">' + esc(v.en) + "</span>" + (v.ipa ? '<span class="small muted">' + esc(v.ipa) + "</span>" : "") + '</div><button class="icon-btn" style="background:none;border:0;margin:-8px -8px 0 0" data-a="close-card" aria-label="Fermer la fiche du mot">' + icon("close", 20) + "</button></div>" +
          '<p><b>= ' + esc(v.fr) + (/[.?!]$/.test(v.fr) ? "" : ".") + "</b>" + (v.note ? " " + esc(v.note) : "") + "</p>" + (v.ex ? '<p class="small card tight" style="background:var(--s1)">' + esc(v.ex) + '<br><span class="muted">' + esc(v.exFr || "") + "</span></p>" : "") +
          '<div class="row"><button class="btn grow" style="min-height:44px;font-size:14px" data-a="say-word" data-v="' + v.key + '">' + icon("speaker", 18) + "Écouter</button><button class=\"btn grow " + (saved ? "" : "primary") + '" style="min-height:44px;font-size:14px;' + (saved ? "background:var(--blue-bg);color:var(--blue-fg);border:0" : "") + '" data-a="save-word" data-v="' + v.key + '" aria-pressed="' + saved + '">' + (saved ? "Ajouté ✓" : "Ajouter à mes mots") + "</button></div></div>";
      }
      h += "</div>";
    });
    h += "</section>";
    h += '<div class="stack" style="margin-top:6px"><button class="btn primary big" data-a="start-ex" data-v="' + l.id + '">Passer aux exercices · 7</button><button class="btn big" data-a="open-oral" data-v="' + l.id + ':role">' + icon("mic", 20, 2.2) + 'Jouer le dialogue à l’oral</button><button class="btn big" data-a="open-oral" data-v="' + l.id + ':shadow">' + icon("replay", 20) + 'Shadowing sur ce dialogue</button>' + (l.video ? '<button class="btn big" data-a="player-tab" data-v="video">' + icon("play", 18) + 'Voir la vraie vidéo YouTube</button>' : "") + '<button class="link" style="align-self:center" data-a="go" data-v="watch">Prolonger avec une série sur le même thème</button><p class="small muted" style="text-align:center">La leçon compte comme maîtrisée seulement après les exercices et le bilan.</p></div>';
    return h;
  }
  function openLesson(id, hard) {
    var l = E.lessonById(id);
    if (!l) return;
    var ls = E.L(S, id);
    if (!ls.started) ls.started = E.today();
    save();
    ui.player = { id: id, segs: E.segments(l), idx: 0, playing: false, speed: hard ? 1 : (ui.lastSpeed || 1), fr: !hard, en: true, card: null, done: false, token: 0, t0: 0, volume: 1, tab: "lesson", ytErr: null, ytVol: 100, ysh: { on: false, len: 6, start: 0, end: 6, phase: "play" } };
    go("player");
    if (hard) toast("Version difficile : sans traduction, vitesse normale");
  }
  function playerTick() {
    if (ui.route !== "player") return;
    if (ui.player && ui.player.tab === "video") { ytRefresh(); return; }
    var y = window.scrollY;
    document.getElementById("app").innerHTML = SCREENS.player();
    window.scrollTo(0, y);
  }
  function speakSeg() {
    var P = ui.player, l = E.lessonById(P.id), seg = P.segs[P.idx], my = ++P.token;
    playerTick();
    TTS.speak(seg.text, { lang: l.lang, rate: seg.rate * P.speed, volume: P.volume }).then(function () {
      if (my !== P.token || !P.playing) return;
      if (P.idx >= P.segs.length - 1) { finishPlayer(); return; }
      setTimeout(function () {
        if (my !== P.token || !P.playing) return;
        P.idx++;
        var ls = E.L(S, P.id); ls.maxSeg = Math.max(ls.maxSeg || 0, P.idx);
        speakSeg();
      }, seg.chapter === 1 ? 450 : 650);
    });
  }
  function playPlayer() {
    var P = ui.player;
    if (P.done && P.idx >= P.segs.length - 1) { P.idx = 0; P.done = false; }
    P.playing = true; P.t0 = Date.now();
    speakSeg();
  }
  function accountTime() {
    var P = ui.player;
    if (!P.t0) return;
    var sec = (Date.now() - P.t0) / 1000;
    P.t0 = 0;
    var ls = E.L(S, P.id);
    ls.watchSec = Math.round((ls.watchSec || 0) + sec);
    E.logDay(S, E.today(), "lesson", sec / 60);
    save();
  }
  function pausePlayer() {
    var P = ui.player;
    if (!P) return;
    P.playing = false; P.token++;
    TTS.cancel();
    accountTime();
  }
  function finishPlayer() {
    var P = ui.player;
    P.playing = false; P.done = true;
    accountTime();
    var ls = E.L(S, P.id);
    if (!ls.watched) ls.watched = E.today();
    save();
    playerTick();
    toast("Leçon vue en entier. Place aux exercices.");
  }
  function jumpTo(i, autoplay) {
    var P = ui.player;
    P.idx = Math.max(0, Math.min(P.segs.length - 1, i));
    P.done = false;
    if (P.playing || autoplay) { if (!P.playing) { P.playing = true; P.t0 = Date.now(); } TTS.cancel(); speakSeg(); }
    else playerTick();
  }

  /* ---------- Vidéo YouTube (lecteur officiel YouTube IFrame) ---------- */
  var YT_ERR = {
    2: "L’identifiant de la vidéo n’est pas valide.",
    5: "Le lecteur YouTube n’a pas pu lire la vidéo sur cet appareil.",
    100: "La vidéo a été supprimée ou rendue privée.",
    101: "La chaîne n’autorise pas la lecture en dehors de YouTube.",
    150: "La chaîne n’autorise pas la lecture en dehors de YouTube.",
    153: "YouTube refuse la lecture intégrée ici.",
    load: "Le lecteur YouTube n’a pas pu se charger. Vérifie ta connexion."
  };
  function vidInfo(vid) { S.vids = S.vids || {}; return S.vids[vid] || (S.vids[vid] = {}); }
  var YTM = {
    player: null, vid: null, lesson: null, timer: null, state: -1, cur: 0, dur: 0, rates: [1], rate: 1, lastWall: 0, pending: 0, drag: false, loading: null,
    alive: function () { return !!(this.player && document.getElementById("yt-region") && ui.route === "player" && ui.player && ui.player.tab === "video"); },
    load: function () {
      if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
      if (this.loading) return this.loading;
      var self = this;
      this.loading = new Promise(function (res, rej) {
        var prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () { if (prev) try { prev(); } catch (e) { } res(window.YT); };
        var s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api"; s.async = true;
        s.onerror = function () { self.loading = null; rej("load"); };
        document.head.appendChild(s);
        setTimeout(function () { if (!(window.YT && window.YT.Player)) { self.loading = null; rej("load"); } }, 15000);
      });
      return this.loading;
    },
    lv: function () {
      var ls = E.L(S, this.lesson), t = E.today();
      if (!ls.started) ls.started = t;
      ls.video = ls.video || { sec: 0, max: 0, pct: 0 };
      ls.video.last = t;
      return ls.video;
    },
    mount: function (lessonId) {
      var self = this, l = E.lessonById(lessonId);
      this.destroy();
      this.vid = l.video.id; this.lesson = lessonId; this.cur = 0; this.state = -1; this.rates = [1]; this.rate = 1;
      this.dur = vidInfo(this.vid).dur || l.video.duration || 0;
      this.load().then(function (YT) {
        if (!document.getElementById("yt-host") || !ui.player || ui.player.tab !== "video" || ui.player.id !== lessonId) return;
        self.player = new YT.Player("yt-host", {
          videoId: self.vid, host: "https://www.youtube-nocookie.com", width: "100%", height: "100%",
          playerVars: { playsinline: 1, rel: 0, modestbranding: 1, cc_load_policy: 1, cc_lang_pref: "en", hl: "fr", origin: location.origin },
          events: {
            onReady: function () { self.onReady(); },
            onStateChange: function (e) { self.onState(e.data); },
            onError: function (e) { self.onError(e.data); },
            onPlaybackRateChange: function (e) { self.rate = e.data; ytRefresh(); }
          }
        });
        self.timer = setInterval(function () { self.tick(); }, 400);
      }).catch(function () { if (ui.player) { ui.player.ytErr = "load"; render(); } });
    },
    onReady: function () {
      var p = this.player;
      try {
        var r = p.getAvailablePlaybackRates() || [1];
        this.rates = [0.5, 0.75, 1, 1.25].filter(function (x) { return r.indexOf(x) !== -1; });
        if (!this.rates.length) this.rates = [1];
        var d = p.getDuration();
        if (d > 0) { this.dur = d; vidInfo(this.vid).dur = Math.round(d); delete vidInfo(this.vid).err; save(); }
      } catch (e) { }
      var ld = document.querySelector(".yt-loading");
      if (ld) ld.hidden = true;
      ytRefresh();
    },
    onState: function (st) {
      this.tick();
      this.flush();
      this.state = st;
      if (st === 1) { this.lastWall = Date.now(); this.lv(); }
      if (st === 0) { var v = this.lv(), was = v.done; E.videoProgress(v, this.dur, this.dur, 0); if (!was && v.done) toast("Vidéo vue en entier. Fais les exercices pour maîtriser la leçon."); save(); }
      ytRefresh();
    },
    onError: function (code) {
      if (!ui.player) return;
      ui.player.ytErr = code;
      vidInfo(this.vid).err = code; vidInfo(this.vid).d = E.today();
      save();
      this.destroy();
      render();
    },
    tick: function () {
      var p = this.player;
      if (!p || typeof p.getCurrentTime !== "function") return;
      var cur = 0, d = this.dur;
      try { cur = p.getCurrentTime() || 0; d = p.getDuration() || d; } catch (e) { return; }
      this.cur = cur; if (d > 0) this.dur = d;
      if (this.state === 1) {
        var now = Date.now(), played = Math.min(2, (now - this.lastWall) / 1000);
        this.lastWall = now; this.pending += played;
        var v = this.lv(), was = v.done;
        E.videoProgress(v, cur, this.dur, played);
        if (!was && v.done) { toast("Vidéo vue en entier. Fais les exercices pour maîtriser la leçon."); save(); }
        if (this.pending >= 15) this.flush();
        var ys = ui.player && ui.player.ysh;
        if (ys && ys.on && ys.phase === "play" && cur >= ys.end) { try { p.pauseVideo(); } catch (e) { } ys.phase = "turn"; ytRefresh(); return; }
      }
      var t = document.getElementById("yt-time"), sk = document.getElementById("yt-seek"), pc = document.getElementById("yt-pct");
      if (t && !this.drag) t.textContent = mmss(cur) + " / " + (this.dur ? mmss(this.dur) : "–");
      if (sk && !this.drag) { sk.max = String(Math.max(1, Math.round(this.dur))); sk.value = String(Math.round(cur)); }
      if (pc) { var lv = (S.lessons[this.lesson] || {}).video; pc.textContent = lv && lv.done ? "Vue en entier ✓" : "Vue à " + ((lv && lv.pct) || 0) + " %"; }
    },
    flush: function () {
      if (this.pending > 0.5) { E.logDay(S, E.today(), "watch", this.pending / 60); this.pending = 0; save(); }
    },
    call: function (fn, a, b) { try { if (this.player && this.player[fn]) this.player[fn](a, b); } catch (e) { } },
    destroy: function () {
      clearInterval(this.timer); this.timer = null;
      if (this.player) { this.tick(); this.flush(); try { this.player.destroy(); } catch (e) { } }
      this.player = null; this.state = -1;
    }
  };
  function ytRefresh() {
    if (!YTM.alive()) { render(); return; }
    var y = window.scrollY;
    document.getElementById("pv-top").innerHTML = pvTop();
    document.getElementById("pv-bottom").innerHTML = pvBottom();
    window.scrollTo(0, y);
  }
  function playerTabs(P, l) {
    if (!l.video) return "";
    return '<div class="seg" role="group" aria-label="Support de la leçon" style="grid-template-columns:repeat(2,minmax(0,1fr))"><button data-a="player-tab" data-v="lesson" aria-pressed="' + (P.tab !== "video") + '">Leçon · voix</button><button data-a="player-tab" data-v="video" aria-pressed="' + (P.tab === "video") + '">' + icon("play", 14) + " Vidéo YouTube</button></div>";
  }
  function pvTop() {
    var P = ui.player, l = E.lessonById(P.id);
    return top("back-home", l.title, "Vidéo YouTube · " + l.video.channel) + playerTabs(P, l);
  }
  function ytRegion() {
    var P = ui.player, l = E.lessonById(P.id), v = l.video;
    if (IN_CLAUDE) {
      return '<div class="stage">' + scene(l) + '<span class="tag">YouTube · ' + esc(v.channel) + '</span><div class="subs"><a class="btn primary" href="' + v.url + '" target="_blank" rel="noopener">' + icon("play", 18) + "Regarder sur YouTube" + icon("ext", 16) + "</a></div></div>" +
        notice("Dans Claude, YouTube ne peut pas s’afficher à l’intérieur de l’app : la vidéo s’ouvre sur YouTube. Dans ta version GitHub, elle se lit directement ici, avec la vitesse, la réécoute et le shadowing.");
    }
    var reason = P.ytErr != null ? (YT_ERR[P.ytErr] || "La vidéo n’a pas pu être lue.") : (navigator.onLine === false ? "Tu es hors connexion : la vidéo YouTube a besoin d’internet. La leçon de l’app, elle, marche hors ligne." : null);
    if (reason) {
      return '<section class="card stack" style="border-color:var(--org)"><span class="pill org" style="align-self:flex-start">Vidéo indisponible ici</span><p>' + esc(reason) + '</p><div class="row wrap"><button class="btn primary grow" data-a="player-tab" data-v="lesson">Revenir à la leçon de l’app</button><a class="btn grow" href="' + v.url + '" target="_blank" rel="noopener">Ouvrir sur YouTube' + icon("ext", 16) + '</a></div><button class="link" data-a="yt-retry">Réessayer</button></section>';
    }
    return '<div class="yt-frame"><div id="yt-host"></div><div class="yt-loading">Chargement du lecteur YouTube…</div></div>';
  }
  function pvBottom() {
    var P = ui.player, l = E.lessonById(P.id), v = l.video, ls = S.lessons[l.id] || {}, lv = ls.video || {};
    var embed = !IN_CLAUDE && P.ytErr == null && navigator.onLine !== false;
    var dur = YTM.dur || vidInfo(v.id).dur || v.duration || 0;
    var h = "";
    if (embed) {
      var playing = YTM.state === 1, ys = P.ysh;
      h += '<div class="stack-sm"><label class="sr" for="yt-seek">Position dans la vidéo</label><input type="range" id="yt-seek" min="0" max="' + Math.max(1, Math.round(dur)) + '" step="1" value="' + Math.round(YTM.cur) + '" data-yt="seek"' + (YTM.player ? "" : " disabled") + '><div class="row-between small muted num"><span id="yt-time">' + mmss(YTM.cur) + " / " + (dur ? mmss(dur) : "–") + '</span><span id="yt-pct">' + (lv.done ? "Vue en entier ✓" : "Vue à " + (lv.pct || 0) + " %") + "</span></div></div>";
      h += '<div class="controls" style="justify-content:center;gap:18px"><button class="ctl" data-a="yt-back" aria-label="Reculer de 5 secondes">' + icon("replay") + '</button><button class="ctl play" data-a="yt-play" aria-label="' + (playing ? "Pause" : "Lecture") + '"' + (YTM.player ? "" : " disabled") + ">" + icon(playing ? "pause" : "play", 28) + '</button><button class="ctl" data-a="yt-fwd" aria-label="Avancer de 10 secondes">' + icon("next") + "</button></div>";
      if (YTM.rates.length > 1) h += '<div class="seg acc" role="group" aria-label="Vitesse de la vidéo" style="grid-template-columns:repeat(' + YTM.rates.length + ',minmax(0,1fr))">' + YTM.rates.map(function (r) { return '<button data-a="yt-rate" data-v="' + r + '" aria-pressed="' + (YTM.rate === r) + '" style="min-height:38px">' + String(r).replace(".", ",") + "×</button>"; }).join("") + "</div>";
      else if (YTM.player) h += '<p class="xs muted">Vitesse : non réglable pour cette vidéo.</p>';
      if (!IS_IOS) h += '<label class="row" style="min-height:44px;color:var(--mut)">' + icon("speaker") + '<span style="color:var(--fg);font-size:14px">Volume</span><input type="range" id="yt-vol" min="0" max="100" value="' + (P.ytVol == null ? 100 : P.ytVol) + '" data-yt="vol" style="flex:1"></label>';
      h += '<section class="card stack"><div class="row-between" style="align-items:center"><div class="stack-sm" style="gap:2px"><b>Shadowing vidéo</b><span class="small muted">La vidéo s’arrête pour que tu répètes chaque passage.</span></div><button class="btn' + (ys.on ? " primary" : "") + '" style="min-height:40px" data-a="ysh-toggle" aria-pressed="' + ys.on + '">' + (ys.on ? "Activé" : "Activer") + "</button></div>";
      if (ys.on) {
        h += '<div class="row"><span class="small muted">Passages de</span><div class="seg acc" style="grid-template-columns:repeat(3,minmax(0,1fr));flex:1">' + [4, 6, 8].map(function (n) { return '<button data-a="ysh-len" data-v="' + n + '" aria-pressed="' + (ys.len === n) + '" style="min-height:38px">' + n + " s</button>"; }).join("") + "</div></div>";
        if (ys.phase === "turn") h += '<div class="card yellow stack-sm"><b style="font-size:17px">À toi : répète le passage</b><span class="small num">' + mmss(ys.start) + " → " + mmss(ys.end) + ' · imite le rythme et l’intonation</span><div class="row"><button class="btn dark grow" data-a="ysh-replay">' + icon("replay", 18) + 'Réécouter</button><button class="btn grow" style="background:transparent;border:2px solid var(--on-acc);color:var(--on-acc)" data-a="ysh-next">Passage suivant</button></div></div>';
        else h += '<p class="small muted">Lance la vidéo : elle s’arrêtera toutes les ' + ys.len + " secondes.</p>";
      }
      h += "</section>";
    } else if (IN_CLAUDE) {
      h += '<button class="btn' + (lv.done ? "" : " primary") + '" data-a="v-watched"' + (lv.done ? " disabled" : "") + ">" + (lv.done ? "Vidéo vue ✓" : "J’ai regardé la vidéo en entier") + "</button>";
    }
    h += '<section class="card stack-sm"><p class="eyebrow">La vidéo</p><b>' + esc(v.title) + "</b>" +
      '<p class="small muted">' + esc(v.about) + "</p>" +
      '<dl class="small" style="margin:6px 0 0;display:grid;grid-template-columns:auto 1fr;gap:4px 12px">' +
      "<dt class=\"muted\">Chaîne</dt><dd style=\"margin:0\">" + esc(v.channel) + "</dd>" +
      "<dt class=\"muted\">Niveau</dt><dd style=\"margin:0\">" + esc(v.level) + "</dd>" +
      "<dt class=\"muted\">Langue</dt><dd style=\"margin:0\">Anglais" + (v.accent ? ", accent " + esc(v.accent) : "") + "</dd>" +
      "<dt class=\"muted\">Durée</dt><dd style=\"margin:0\">" + (dur ? mmss(dur) : "affichée au lancement") + "</dd>" +
      "<dt class=\"muted\">Sous-titres</dt><dd style=\"margin:0\">" + esc(v.subtitles || "Bouton CC du lecteur, si la chaîne en propose") + "</dd>" +
      "<dt class=\"muted\">Source</dt><dd style=\"margin:0\">YouTube · page vérifiée le " + E.fmtDay(v.validation.date) + "</dd></dl>" +
      '<a class="link" href="' + v.url + '" target="_blank" rel="noopener">Voir la vidéo d’origine sur YouTube' + icon("ext", 16) + "</a>" +
      '<p class="xs muted">L’app ne contrôle pas les sous-titres de YouTube et n’en récupère pas le texte. Les sous-titres interactifs EN/FR sont dans l’onglet Leçon.</p></section>';
    h += '<section class="stack-sm"><label class="field"><span style="color:var(--fg);font-size:14px">Une phrase entendue dans la vidéo ?</span><div class="row"><input class="input grow" id="f-vheard" data-f="vheard" placeholder="Ex. : Can I have a small latte?" value="' + esc(ui.f.vheard || "") + '"><button class="btn light" data-a="add-vheard"' + (ui.busyHeard ? " disabled" : "") + ">" + (ui.busyHeard ? '<span class="dots">Vérif</span>' : "Ajouter") + '</button></div></label><p class="small muted">Note 3 phrases utiles : elles rejoignent tes révisions.</p></section>';
    h += '<div class="stack"><button class="btn primary big" data-a="start-ex" data-v="' + l.id + '">Passer aux exercices · 7</button><button class="btn big" data-a="open-oral" data-v="' + l.id + ':shadow">' + icon("mic", 20, 2.2) + 'Shadowing sur le dialogue de la leçon</button><p class="small muted" style="text-align:center">Regarder la vidéo ne suffit pas : la leçon est maîtrisée à 80 % aux exercices.</p></div>';
    return h;
  }
  function playerVideo() {
    return '<div id="pv-top" class="stack">' + pvTop() + '</div><div id="yt-region">' + ytRegion() + '</div><div id="pv-bottom" class="stack">' + pvBottom() + "</div>";
  }
  function addHeard(field, lessonId, source) {
    var txt = (ui.f[field] || "").trim();
    if (!txt) { toast("Écris la phrase d’abord."); return; }
    var t = E.today(), en = txt, fr = "";
    var done = function () {
      E.addWord(S, { en: en, fr: fr }, lessonId || null, source, t);
      ui.f[field] = ""; ui.busyHeard = false; save();
      toast("Ajouté à tes révisions"); render();
    };
    if (!AI.on) { done(); return; }
    ui.busyHeard = true; render();
    AI.json("Un élève francophone a noté une phrase entendue dans une vidéo ou une série en anglais : « " + txt + " ». Corrige-la si besoin (orthographe, ponctuation) sans changer le sens, et traduis-la. Réponds uniquement avec un objet JSON : {\"en\": \"la phrase corrigée\", \"fr\": \"traduction naturelle\"}")
      .then(function (r) { if (r && r.en) { en = String(r.en); fr = String(r.fr || ""); } })
      .catch(function () { })
      .then(done);
  }

  /* ---------- Shadowing sur les leçons ---------- */
  function shState() { return { i: 0, round: 0, phase: "idle", text: "full", speed: 1, rounds: 2, scores: [], mic: false, token: 0, t0: 0, heard: null, reveal: false, gapMs: 0, gapStart: 0, rating: null }; }
  function shadowView(O, l) {
    var sh = O.sh, lines = l.lines, n = lines.length;
    var h = "";
    if (sh.phase === "done") {
      var avg = sh.scores.length ? Math.round(sh.scores.reduce(function (a, b) { return a + b; }, 0) / sh.scores.length) : null;
      h += '<section class="card card-lg stack"><b class="display" style="font-size:24px">Shadowing terminé</b><p class="muted">' + n + " phrases × " + sh.rounds + " · " + Math.max(1, Math.round((Date.now() - sh.t0) / 60000)) + " min" + (avg != null ? " · " + avg + " % de mots reconnus" : "") + "</p>" +
        '<p style="font-weight:600">C’était comment ?</p><div class="row">' + [["facile", "Facile"], ["correct", "Correct"], ["difficile", "Difficile"]].map(function (x) { return '<button class="btn grow' + (sh.rating === x[0] ? " primary" : "") + '" data-a="sh-rate" data-v="' + x[0] + '" aria-pressed="' + (sh.rating === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>" +
        (sh.rating ? '<p class="small muted">' + (sh.rating === "facile" ? (sh.text === "none" ? "Passe à 1× si ce n’est pas déjà fait, ou à la leçon suivante." : "Refais-le sans texte : c’est là que ça rentre vraiment.") : sh.rating === "difficile" ? "Normal au début. Refais-le demain à 0,75× avec le texte : la prononciation est ajoutée à tes révisions." : "Refais-le demain, une étape plus difficile (moins de texte ou vitesse 1×).") + "</p>" : "") +
        '<div class="row"><button class="btn grow" data-a="sh-restart" data-v="' + sh.text + '">Recommencer</button><button class="btn light grow" data-a="sh-restart" data-v="none">Sans texte</button></div></section>';
      return h;
    }
    var running = sh.phase === "listen" || sh.phase === "turn";
    h += '<p class="small muted">Écoute la phrase, puis répète-la tout de suite en imitant le rythme et la mélodie. Commence avec le texte, puis enlève-le : le but est de répéter sans lire.</p>';
    h += '<div class="stack-sm"><div class="seg" role="group" aria-label="Texte affiché" style="grid-template-columns:repeat(3,minmax(0,1fr))">' + [["full", "Texte + FR"], ["en", "Texte"], ["none", "Sans texte"]].map(function (x) { return '<button data-a="sh-text" data-v="' + x[0] + '" aria-pressed="' + (sh.text === x[0]) + '" style="min-height:40px">' + x[1] + "</button>"; }).join("") + "</div>" +
      '<div class="row"><div class="seg acc" role="group" aria-label="Vitesse" style="grid-template-columns:repeat(2,minmax(0,1fr));flex:1">' + [0.75, 1].map(function (x) { return '<button data-a="sh-speed" data-v="' + x + '" aria-pressed="' + (sh.speed === x) + '" style="min-height:40px">' + String(x).replace(".", ",") + "×</button>"; }).join("") + '</div><div class="seg" role="group" aria-label="Répétitions par phrase" style="grid-template-columns:repeat(3,minmax(0,1fr));flex:1.3">' + [1, 2, 3].map(function (x) { return '<button data-a="sh-rounds" data-v="' + x + '" aria-pressed="' + (sh.rounds === x) + '" style="min-height:40px">' + x + "×</button>"; }).join("") + "</div></div>" +
      (STT.ok() ? '<button class="btn' + (sh.mic ? " primary" : "") + '" style="min-height:42px" data-a="sh-mic" aria-pressed="' + sh.mic + '">' + icon("mic", 18, 2.2) + (sh.mic ? "Noter ma voix : oui" : "Noter ma voix : non") + "</button>" : "") + "</div>";
    var ln = lines[Math.min(sh.i, n - 1)];
    var showTxt = sh.text !== "none" || sh.reveal;
    h += '<section class="card card-lg stack" style="min-height:220px"><div class="row-between small muted num"><span>Phrase ' + (Math.min(sh.i, n - 1) + 1) + " sur " + n + (sh.rounds > 1 ? " · tour " + (sh.round + 1) + "/" + sh.rounds : "") + '</span><span class="sp" style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">' + esc(ln.sp) + "</span></div>" +
      (showTxt ? '<p class="display" style="font-size:24px;line-height:1.25">' + esc(ln.en) + "</p>" + (sh.text === "full" ? '<p class="small muted">' + esc(ln.fr) + "</p>" : "") : '<p class="display muted" style="font-size:22px">Écoute, puis répète</p><button class="link" data-a="sh-reveal">Voir la phrase</button>');
    if (sh.phase === "listen") h += '<p class="row" style="color:var(--blue-fg);font-weight:700">' + icon("speaker", 18) + "Écoute…</p>";
    if (sh.phase === "turn") {
      var el = Math.max(0, Date.now() - sh.gapStart);
      h += '<p class="row" style="color:var(--acc);font-weight:800;font-size:18px">' + icon("mic", 20, 2.2) + "À toi : répète !</p>" + '<div class="countdown" aria-hidden="true"><i style="animation-duration:' + sh.gapMs + "ms;animation-delay:-" + el + 'ms"></i></div>';
    }
    if (sh.phase === "paused") h += '<p class="small muted">En pause</p>';
    if (sh.heard) h += '<div class="row wrap" style="gap:6px">' + sh.heard.words.map(function (w) { return '<span class="pill ' + (w.status === "ok" ? "blue" : "org") + '">' + esc(w.word) + (w.status === "ok" ? " ✓" : " ✗") + "</span>"; }).join("") + '<span class="small muted">' + sh.heard.pct + " %</span></div>";
    h += "</section>";
    h += '<div class="controls" style="justify-content:center;gap:18px"><button class="ctl" data-a="sh-replay" aria-label="Réécouter la phrase">' + icon("replay") + '</button><button class="ctl play" data-a="sh-play" aria-label="' + (running ? "Pause" : "Lancer") + '">' + icon(running ? "pause" : "play", 28) + '</button><button class="ctl" data-a="sh-next" aria-label="Phrase suivante">' + icon("next") + "</button></div>";
    if (sh.phase === "idle") h += '<p class="small muted" style="text-align:center">' + n + " phrases × " + sh.rounds + " ≈ " + Math.max(1, Math.round(lines.reduce(function (a, x) { return a + (E.segSeconds({ text: x.en, rate: sh.speed }) + E.shadowGap(x.en, sh.speed)) * sh.rounds; }, 0) / 60)) + " min</p>";
    return h;
  }
  function shStep() {
    var O = ui.oral, sh = O.sh, l = E.lessonById(O.id), lines = l.lines, my = ++sh.token;
    if (sh.i >= lines.length) { shFinish(); return; }
    if (!sh.t0) sh.t0 = Date.now();
    var ln = lines[sh.i];
    sh.phase = "listen"; sh.heard = null;
    render();
    TTS.speak(ln.en, { lang: l.lang, rate: sh.speed }).then(function () {
      if (my !== sh.token || ui.route !== "oral" || ui.oral !== O) return;
      sh.phase = "turn"; sh.gapMs = Math.round(E.shadowGap(ln.en, sh.speed) * 1000); sh.gapStart = Date.now();
      render();
      var after = function () {
        if (my !== sh.token) return;
        sh.round++;
        if (sh.round >= sh.rounds) { sh.round = 0; sh.i++; sh.reveal = false; }
        shStep();
      };
      if (sh.mic && STT.ok()) {
        var stopper = setTimeout(function () { if (my === sh.token) STT.stop(); }, sh.gapMs + 2500);
        STT.listen(l.lang).then(function (alts) {
          clearTimeout(stopper);
          if (my !== sh.token) return;
          var best = null;
          alts.forEach(function (a) { var r = E.scoreRepeat(ln.en, a); if (!best || r.pct > best.pct) best = r; });
          sh.heard = best; sh.scores.push(best.pct);
          render();
          setTimeout(after, 900);
        }).catch(function (err) {
          clearTimeout(stopper);
          if (my !== sh.token) return;
          if (err !== "no-speech") { sh.mic = false; toast(micMessage(err)); }
          setTimeout(after, 300);
        });
      } else setTimeout(after, sh.gapMs);
    });
  }
  function shStop(sh) { sh.token++; TTS.cancel(); STT.stop(); }
  function shFinish() {
    var O = ui.oral, sh = O.sh, t = E.today();
    sh.phase = "done";
    E.logDay(S, t, "oral", (Date.now() - sh.t0) / 60000);
    if (sh.scores.length) E.recordResult(S, O.id, "shadow", Math.round(sh.scores.reduce(function (a, b) { return a + b; }, 0) / sh.scores.length), t);
    var ticked = 0;
    (S.plan || []).forEach(function (p) { if (!p.done && p.due <= t && /shadow/i.test(p.title + " " + p.detail)) { p.done = true; p.doneAt = t; ticked++; } });
    save();
    render();
    if (ticked) toast("Étape « Shadowing » de ton plan cochée");
  }

  /* Oral : jeu de rôle et répétition */
  function oralState(id, mode, line) {
    var l = E.lessonById(id);
    var targets = l.lines.map(function (x, i) { return { i: i, en: x.en, fr: x.fr, sp: x.sp }; }).filter(function (x) { return x.sp === "Toi"; });
    targets.push({ i: -1, en: l.exercises.oral.en, fr: "" });
    var start = 0;
    if (line != null) { var k = targets.map(function (x) { return x.i; }).indexOf(Number(line)); if (k !== -1) start = k; }
    return { id: id, mode: mode || "role", log: [], pos: 0, waiting: false, listening: false, busy: false, help: false, done: false, scores: [], targets: targets, t: start, attempts: [], result: null, t0: Date.now(), sh: shState() };
  }
  SCREENS.oral = function () {
    var O = ui.oral, l = E.lessonById(O.id);
    var h = top(ui.p && ui.p.fromTab ? "back-home" : "back-player", "Oral", l.title + " · " + l.level);
    h += '<div class="seg" role="group" aria-label="Type d’exercice oral" style="grid-template-columns:repeat(3,minmax(0,1fr))"><button data-a="oral-mode" data-v="role" aria-pressed="' + (O.mode === "role") + '">Jeu de rôle</button><button data-a="oral-mode" data-v="repeat" aria-pressed="' + (O.mode === "repeat") + '">Répéter</button><button data-a="oral-mode" data-v="shadow" aria-pressed="' + (O.mode === "shadow") + '">Shadowing</button></div>';
    if (ui.p && ui.p.fromTab) h += '<div class="chips">' + C.LESSONS.map(function (x) { return '<button class="chip" data-a="oral-lesson" data-v="' + x.id + '" aria-pressed="' + (x.id === O.id) + '">' + esc(x.title) + "</button>"; }).join("") + "</div>";
    if (!STT.ok()) h += '<p class="fb bad">' + (STT.Ctor && !IN_CLAUDE ? micMessage("not-allowed") : IN_CLAUDE ? "Le micro n’est pas accessible dans la version claude.ai. Réponds par écrit ici, ou ouvre ta version GitHub dans Safari pour parler." : "Ce navigateur ne reconnaît pas la voix. Ouvre l’app dans Safari (iPhone) ou Chrome, ou réponds par écrit.") + (IN_CLAUDE ? ' <a href="' + PAGES_URL + '" target="_blank" rel="noopener">Ouvrir la version GitHub</a>' : "") + "</p>";
    if (O.mode === "role") h += roleView(O, l); else if (O.mode === "shadow") h += shadowView(O, l); else h += repeatView(O, l);
    h += notice((STT.ok() ? "Ton appareil transcrit ce que tu dis : l’app vérifie les mots compris, pas ton accent au son près. " : "") + "Seul le texte est sauvegardé, jamais ta voix.");
    return h;
  };
  function roleView(O, l) {
    var h = '<div class="row-between"><p class="small muted">Tu joues « Toi ». Réponds ' + (STT.ok() ? "à voix haute" : "par écrit") + ' à chaque réplique.</p><span class="small" style="font-weight:700">' + Math.min(O.log.filter(function (x) { return x.me; }).length + (O.waiting ? 1 : 0), O.targets.length - 1) + " / " + (O.targets.length - 1) + "</span></div>";
    if (!O.started) {
      return h + '<div class="card stack"><p>' + esc(l.partner) + " commence. Écoute, puis réponds avec tes mots : pas besoin de réciter le dialogue mot pour mot.</p>" + '<button class="btn primary big" data-a="rp-start">' + icon("play", 18) + "Commencer le jeu de rôle</button></div>";
    }
    h += '<div class="stack">';
    O.log.forEach(function (m) {
      if (!m.me) h += '<div class="who"><span class="face" aria-hidden="true">' + esc((m.sp || l.partner).charAt(0)) + '</span><div class="bubble them row" style="gap:6px;padding-right:6px"><span>' + esc(m.text) + '</span><button class="icon-btn" style="width:36px;height:36px;background:var(--s2);border:0" data-a="say" data-v="' + esc(m.text) + '" aria-label="Réécouter">' + icon("speaker", 16) + "</button></div></div>";
      else {
        h += '<div class="stack-sm" style="align-items:flex-end"><span class="xs muted">Toi · ' + (m.voice ? "entendu par l’appareil" : "écrit") + '</span><div class="bubble me">' + esc(m.text) + "</div></div>";
        if (m.fb) h += '<div class="card stack-sm"><div class="row-between" style="align-items:center"><span class="eyebrow" style="font-size:11px">Correction · ' + (m.fb.local ? "automatique" : "Claude") + '</span><span class="pill ' + (m.fb.understood ? "blue" : "org") + '">' + (m.fb.understood ? "Compris" : "À reformuler") + " · " + m.fb.score + " %</span></div><p>" + esc(m.fb.feedback) + "</p>" + (m.fb.better ? '<p style="font-size:16px;font-weight:600">' + esc(m.fb.better) + "</p>" : "") + "</div>";
      }
    });
    if (O.busy) h += '<p class="small muted dots">Correction en cours</p>';
    if (O.waiting && !O.busy) {
      var exp = l.lines[O.pos];
      h += '<div class="stack" style="align-items:center;padding-top:8px">';
      if (STT.ok()) h += '<button class="mic-big' + (O.listening ? " on" : "") + '" data-a="rp-mic" aria-pressed="' + O.listening + '" aria-label="' + (O.listening ? "Arrêter l’écoute" : "Parler") + '">' + icon("mic", 36, 2.2) + '</button><span style="font-weight:600">' + (O.listening ? "J’écoute…" : "Touche pour répondre") + "</span>";
      h += '<div class="row" style="width:100%"><label class="grow"><span class="sr">Ta réponse écrite</span><input class="input" id="f-rp" data-f="rp" placeholder="' + (STT.ok() ? "ou écris ta réponse" : "Écris ta réponse en anglais") + '" value="' + esc(ui.f.rp || "") + '"></label><button class="btn light" data-a="rp-send" aria-label="Envoyer">' + icon("send", 18) + "</button></div>";
      h += '<button class="link" style="align-self:center" data-a="rp-help">' + (O.help ? "Masquer l’aide" : "Besoin d’aide ?") + "</button>" + (O.help ? '<p class="card tight small">Exemple : <b>' + esc(exp.en) + '</b><br><span class="muted">' + esc(exp.fr) + "</span></p>" : "") + "</div>";
    }
    if (O.done) {
      var sc = O.scores.length ? Math.round(O.scores.reduce(function (a, b) { return a + b; }, 0) / O.scores.length) : 0;
      h += '<div class="card stack"><div class="row-between"><b>Dialogue terminé</b><span class="display" style="font-size:24px">' + sc + ' %</span></div><p class="small muted">Score enregistré dans tes compétences à l’oral.</p><div class="row"><button class="btn grow" data-a="rp-restart">Recommencer</button><button class="btn primary grow" data-a="start-ex" data-v="' + l.id + '">Exercices</button></div></div>';
    }
    return h + "</div>";
  }
  function repeatView(O, l) {
    var tg = O.targets[O.t];
    var h = '<div class="card stack card-lg"><span class="small muted" style="font-weight:600">Phrase ' + (O.t + 1) + " sur " + O.targets.length + '</span><p class="display" style="font-size:25px;line-height:1.2">' + esc(tg.en) + "</p>" + (tg.fr ? '<p class="small muted">' + esc(tg.fr) + "</p>" : "") +
      '<div class="row"><button class="btn grow" data-a="rep-listen" data-v="1">' + icon("speaker", 18) + 'Écouter le modèle</button><button class="btn" data-a="rep-listen" data-v="0.75" aria-label="Écouter à 0,75 fois">0,75×</button></div></div>';
    if (STT.ok()) {
      h += '<div class="stack" style="align-items:center;gap:8px"><button class="mic-big' + (O.listening ? " on" : "") + '" data-a="rep-mic" aria-pressed="' + O.listening + '" aria-label="' + (O.listening ? "Arrêter l’écoute" : "Parler") + '">' + icon("mic", 36, 2.2) + '</button><span style="font-weight:600">' + (O.listening ? "J’écoute… touche pour arrêter" : "Touche et répète la phrase") + "</span></div>";
    } else {
      h += '<div class="dashed small">La répétition note ta prononciation : elle a besoin du micro. Ici, écoute le modèle et répète à voix haute pour toi, puis passe à la suivante.</div>';
    }
    if (O.result) {
      var r = O.result;
      var missing = r.words.filter(function (w) { return w.status !== "ok"; }).map(function (w) { return w.word; });
      var tip = null;
      missing.some(function (w) { if (C.PRONUNCIATION[w]) { tip = C.PRONUNCIATION[w]; return true; } return false; });
      h += '<div class="card stack"><div class="row-between"><b>Essai ' + O.attempts.length + '</b><span class="display" style="font-size:24px">' + r.pct + ' %</span></div><p class="small muted">' + r.words.filter(function (w) { return w.status === "ok"; }).length + " mots reconnus sur " + r.words.length + '</p><div class="row wrap" style="gap:6px">' +
        r.words.map(function (w) { return '<span class="pill ' + (w.status === "ok" ? "blue" : "org") + '" style="font-size:14px;padding:6px 10px">' + esc(w.word) + (w.status === "ok" ? " ✓" : " ✗") + "</span>"; }).join("") + "</div>" +
        (r.heard ? '<p class="small muted">Entendu : « ' + esc(r.heard) + " »</p>" : "") +
        (missing.length ? '<p class="fb bad" style="color:var(--fg)">' + esc(tip || "Réécoute à 0,75×, puis répète juste après la voix en exagérant l’articulation.") + "</p>" : '<p class="fb good">Parfait. Passe à la phrase suivante.</p>') +
        '<p class="small muted">' + O.attempts.map(function (a, i) { return "Essai " + (i + 1) + " : " + a + " %"; }).join(" · ") + "</p></div>";
    }
    h += '<button class="btn primary big" data-a="rep-next">' + (O.t < O.targets.length - 1 ? "Phrase suivante" : "Terminer") + "</button>";
    return h;
  }
  function openOral(v, fromTab) {
    var p = String(v || "").split(":");
    var id = p[0] || ((E.recommend(S, {}).filter(function (r) { return r.kind !== "done"; })[0] || {}).lesson || C.LESSONS[0]).id;
    ui.oral = oralState(id, p[1] || "role", p[2]);
    go("oral", { fromTab: !!fromTab });
  }
  function rpAdvance() {
    var O = ui.oral, l = E.lessonById(O.id);
    O.waiting = false;
    function step() {
      if (ui.route !== "oral" || ui.oral !== O) return;
      if (O.pos >= l.lines.length) { rpFinish(); return; }
      var ln = l.lines[O.pos];
      if (ln.sp === "Toi") { O.waiting = true; O.help = false; render(); return; }
      O.log.push({ text: ln.en, sp: ln.sp });
      O.pos++;
      render();
      TTS.speak(ln.en, { lang: l.lang, rate: 0.95 }).then(function () { setTimeout(step, 300); });
    }
    step();
  }
  async function rpAnswer(text, voice) {
    var O = ui.oral, l = E.lessonById(O.id), ln = l.lines[O.pos];
    if (!text || !text.trim()) { toast("Réponds d’abord, à l’oral ou par écrit."); return; }
    ui.f.rp = "";
    var entry = { me: true, text: text, voice: !!voice };
    O.log.push(entry); O.waiting = false; O.busy = true;
    render();
    var prev = O.log.filter(function (m) { return !m.me; }).slice(-1)[0];
    var local = E.scoreRoleplay(ln, text);
    var fb = null;
    if (AI.on) {
      try {
        var r = await AI.json("Tu corriges un élève francophone de niveau " + l.level + " dans un jeu de rôle en anglais (« " + l.title + " »). Le partenaire (" + l.partner + ") vient de dire : « " + (prev ? prev.text : "") + " ». Réponse modèle possible : « " + ln.en + " ». L’élève a répondu" + (voice ? " (transcription automatique de sa voix, sans ponctuation fiable)" : "") + " : « " + text + " ».\nAccepte toute réponse naturelle et adaptée, même différente du modèle. Réponds uniquement avec un objet JSON : {\"understood\": true|false, \"score\": entier de 0 à 100, \"better\": \"une version naturelle et correcte en anglais\", \"feedback\": \"30 mots maximum, en français, tutoiement, concret\", \"concept\": une clé parmi " + JSON.stringify(Object.keys(C.CONCEPTS)) + " ou null}");
        if (r && typeof r.score === "number") fb = { understood: !!r.understood, score: Math.max(0, Math.min(100, Math.round(r.score))), better: String(r.better || ""), feedback: String(r.feedback || ""), concept: C.CONCEPTS[r.concept] ? r.concept : null, local: false };
      } catch (e) { }
    }
    if (!fb) {
      fb = { understood: local.understood, score: local.pct, better: ln.en, local: true, concept: null,
        feedback: local.understood ? (local.missing.length ? "Compris. Pour être plus naturel, tu peux dire :" : "Très bien, c’est clair et naturel. Exemple de version complète :") : "Pas encore clair. Il manque « " + ((local.missing[0] || [""])[0]) + " ». Exemple :" };
    }
    entry.fb = fb;
    O.scores.push(fb.score);
    if (fb.concept) E.addConcept(S, fb.concept, O.id, E.today());
    O.busy = false; O.pos++;
    save();
    rpAdvance();
  }
  function rpFinish() {
    var O = ui.oral;
    O.done = true; O.waiting = false;
    var sc = O.scores.length ? Math.round(O.scores.reduce(function (a, b) { return a + b; }, 0) / O.scores.length) : 0;
    E.recordResult(S, O.id, "roleplay", sc, E.today());
    E.logDay(S, E.today(), "oral", (Date.now() - O.t0) / 60000);
    save();
    render();
  }

  /* Exercices */
  function exClasses(X) {
    return X.steps.map(function (s, i) {
      var r = X.res[i];
      if (i === X.i && !r) return "cur";
      if (!r) return "";
      if (r.skipped) return "skip";
      return r.pct >= E.MASTERY ? "ok" : "ko";
    });
  }
  SCREENS.ex = function () {
    var X = ui.ex, l = E.lessonById(X.id), step = X.steps[X.i], res = X.res[X.i];
    var h = '<header class="stack"><div class="top"><button class="icon-btn" data-a="close-ex" aria-label="Quitter les exercices">' + icon("close", 20, 2.2) + '</button><div class="title"><h1>Exercices</h1><span class="xs muted">' + esc(l.title) + " · " + l.level + '</span></div><span class="spacer num" style="text-align:right;font-weight:800">' + (X.i + 1) + "/" + X.steps.length + "</span></div>" + stepsBar(X.steps.length, exClasses(X)) +
      '<p class="xs muted">' + X.steps.map(function (s, i) { var lb = E.EX_LABELS[s.type]; return i === X.i ? '<b style="color:var(--fg)">' + lb + "</b>" : lb; }).join(" · ") + "</p></header>";
    h += '<section class="stack">' + exBody(X, l, step, res) + "</section>";
    if (res) h += '<button class="btn primary big" style="margin-top:auto" data-a="ex-next">' + (X.i < X.steps.length - 1 ? "Suivant · " + E.EX_LABELS[X.steps[X.i + 1].type] : "Voir mes résultats") + "</button>";
    else if (!X.busy) h += '<button class="btn primary big" style="margin-top:auto" data-a="ex-check">Valider</button>';
    else h += '<button class="btn big" disabled><span class="dots">Correction en cours</span></button>';
    return h;
  };
  function choicesHtml(items, X, key) {
    var ans = X.ans[key] || [], res = X.res[X.i];
    return items.map(function (it, qi) {
      return '<div class="stack-sm"><p style="font-weight:600">' + esc(it.q) + "</p>" + it.options.map(function (o, oi) {
        var cls = "choice";
        if (res) { if (oi === it.answer) cls += " good"; else if (ans[qi] === oi) cls += " bad"; }
        return '<button class="' + cls + '" data-a="ex-pick" data-v="' + qi + ":" + oi + '" aria-pressed="' + (ans[qi] === oi) + '"' + (res ? " disabled" : "") + ">" + esc(o) + "</button>";
      }).join("") + "</div>";
    }).join("");
  }
  function corrCard(title, local, inner) {
    return '<section class="card stack"><div class="row-between" style="align-items:center"><span class="eyebrow" style="font-size:11px">' + title + " · " + (local ? "correction automatique" : "Claude") + '</span><span class="xs muted">Sauvegardée</span></div>' + inner + "</section>";
  }
  function exBody(X, l, step, res) {
    var ex = l.exercises, t = step.type, h = "";
    if (t === "comprehension" || t === "vocab") {
      h += '<h2 class="h2">' + (t === "comprehension" ? "Tu as compris le dialogue ?" : "Le sens des mots") + "</h2>" + choicesHtml(ex[t], X, t);
      if (res) h += '<p class="fb ' + (res.pct >= E.MASTERY ? "good" : "bad") + '">' + res.pct + " % · " + (res.pct >= E.MASTERY ? "Bien." : "Revois les réponses en bleu, elles reviendront dans tes révisions.") + "</p>";
    } else if (t === "gaps") {
      h += '<h2 class="h2">Complète les phrases</h2>';
      ex.gaps.forEach(function (g, i) {
        var parts = g.text.split("___");
        var ok = res ? res.results[i] : null;
        h += '<label class="card tight stack-sm"><span class="sr">Phrase ' + (i + 1) + '</span><span style="font-size:16px;line-height:1.6">' + esc(parts[0]) + '<input class="input" id="f-gap' + i + '" data-f="gap' + i + '" autocapitalize="off" autocomplete="off" spellcheck="false" value="' + esc(ui.f["gap" + i] || "") + '" style="display:inline-block;width:120px;min-height:38px;padding:4px 10px;' + (ok === true ? "border-color:var(--blue)" : ok === false ? "border-color:var(--org)" : "") + '"' + (res ? " disabled" : "") + ">" + esc(parts[1] || "") + "</span>" + (ok === false ? '<span class="small" style="color:var(--org-fg)">Réponse : <b>' + esc(g.accept[0]) + "</b></span>" : "") + "</label>";
      });
      if (res) h += '<p class="fb ' + (res.pct >= E.MASTERY ? "good" : "bad") + '">' + res.pct + " %</p>";
    } else if (t === "translation" || t === "revision") {
      var item = t === "revision" ? step.item : ex.translation;
      if (t === "revision") h += '<span class="pill org" style="align-self:flex-start">Reprend ton erreur' + (step.from ? " de la leçon " + esc(step.from) : "") + " : " + esc(step.label) + "</span>";
      h += '<h2 class="h2">Traduis en anglais</h2><p class="card" style="font-size:18px;font-weight:500">« ' + esc(item.fr) + " »</p>" +
        '<label class="field"><span>Ta réponse</span><textarea class="input" rows="2" id="f-tr" data-f="tr" autocapitalize="sentences"' + (res ? " disabled" : "") + ">" + esc(ui.f.tr || "") + "</textarea></label>";
      if (!res && STT.ok()) h += '<button class="link" data-a="dictate" data-v="tr">' + icon("mic", 18, 2.2) + (ui.dictating === "tr" ? "J’écoute…" : "Répondre à l’oral") + "</button>";
      if (res) h += corrCard("Correction", res.local, '<div class="row" style="align-items:baseline;gap:10px"><span class="display" style="font-size:36px">' + res.score10 + '/10</span><span style="font-weight:700;color:' + (res.score10 >= 8 ? "var(--blue-fg)" : "var(--org)") + '">' + esc(res.verdict) + '</span></div><div class="card tight stack-sm" style="background:var(--s2);border:0"><span class="xs muted" style="font-weight:600">Réponse attendue</span><span style="font-size:17px;font-weight:600">' + esc(res.expected) + '</span></div><ol style="margin:0;padding-left:20px" class="stack-sm">' + res.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ol>" + (res.score10 < 10 && (res.concept || item.concept) ? '<p class="small" style="color:var(--org-fg);font-weight:600">« ' + esc((C.CONCEPTS[res.concept || item.concept] || {}).label || "") + " » reviendra dans tes révisions.</p>" : ""));
    } else if (t === "dictation") {
      h += '<h2 class="h2">Dictée</h2><p class="muted">Écoute, puis écris exactement ce que tu entends.</p><div class="row"><button class="btn primary grow" data-a="ex-say" data-v="1">' + icon("speaker", 18) + 'Écouter</button><button class="btn grow" data-a="ex-say" data-v="0.7">Plus lentement</button></div>' +
        '<label class="field"><span>Ce que tu entends</span><textarea class="input" rows="2" id="f-dic" data-f="dic" autocapitalize="sentences" spellcheck="false"' + (res ? " disabled" : "") + ">" + esc(ui.f.dic || "") + "</textarea></label>";
      if (res) h += corrCard("Dictée", true, '<span class="display" style="font-size:30px">' + res.pct + ' %</span><p style="font-size:16px;line-height:1.7">' + res.words.map(function (w) { return '<span style="' + (w.status === "ok" ? "" : w.status === "typo" ? "color:var(--org-fg);text-decoration:underline wavy" : "color:var(--org);text-decoration:line-through") + '">' + esc(w.word) + "</span>"; }).join(" ") + '</p><p class="small muted">Phrase : ' + esc(ex.dictation.en) + "</p>");
    } else if (t === "oral") {
      h += '<h2 class="h2">Répète la phrase</h2><p class="card display" style="font-size:22px">' + esc(ex.oral.en) + '</p><button class="btn" data-a="ex-say-oral">' + icon("speaker", 18) + "Écouter le modèle</button>";
      if (!res) {
        if (STT.ok()) h += '<div class="stack" style="align-items:center"><button class="mic-big' + (ui.dictating === "oral" ? " on" : "") + '" data-a="ex-mic" aria-label="Parler">' + icon("mic", 36, 2.2) + '</button><span style="font-weight:600">' + (ui.dictating === "oral" ? "J’écoute…" : "Touche et répète") + "</span></div>";
        else h += '<div class="dashed small">L’oral est noté avec le micro, indisponible ici. Cet exercice sera « non évalué » et ne comptera pas dans ton score.' + (IN_CLAUDE ? ' Pour le faire : <a href="' + PAGES_URL + '" target="_blank" rel="noopener">ta version GitHub</a> dans Safari.' : "") + '</div><button class="btn" data-a="ex-skip">Passer (non évalué)</button>';
      } else if (res.skipped) h += '<p class="fb bad">Non évalué : ne compte pas dans ton score.</p>';
      else h += corrCard("Oral", true, '<span class="display" style="font-size:30px">' + res.pct + ' %</span><div class="row wrap" style="gap:6px">' + res.words.map(function (w) { return '<span class="pill ' + (w.status === "ok" ? "blue" : "org") + '" style="font-size:14px;padding:6px 10px">' + esc(w.word) + (w.status === "ok" ? " ✓" : " ✗") + "</span>"; }).join("") + '</div><p class="small muted">Entendu : « ' + esc(res.heard) + " »</p>");
    } else if (t === "summary") {
      h += '<h2 class="h2">Résume en anglais</h2><p class="muted">' + esc(ex.summary.prompt) + '</p><label class="field"><span>Ton résumé</span><textarea class="input" rows="3" id="f-sum" data-f="sum" autocapitalize="sentences"' + (res ? " disabled" : "") + ">" + esc(ui.f.sum || "") + "</textarea></label>";
      if (res) h += corrCard("Résumé", res.local, '<span class="display" style="font-size:30px">' + res.pct + " %</span>" + (res.points.length ? '<ul style="margin:0;padding-left:20px" class="stack-sm">' + res.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" : "") + '<div class="card tight stack-sm" style="background:var(--s2);border:0"><span class="xs muted" style="font-weight:600">' + (res.local ? "Exemple de résumé" : "Version corrigée") + '</span><span style="font-weight:600">' + esc(res.model) + "</span></div>");
    }
    return h;
  }
  function startEx(id) {
    var l = E.lessonById(id);
    var ls = E.L(S, id);
    if (!ls.started) ls.started = E.today();
    ui.ex = { id: id, steps: E.buildSteps(S, l, E.today()), i: 0, ans: {}, res: {}, busy: false, t0: Date.now(), run: { concepts: [], words: [] } };
    ["tr", "dic", "sum", "gap0", "gap1", "gap2"].forEach(function (k) { ui.f[k] = ""; });
    save();
    go("ex");
  }
  function noteConcept(X, key) {
    if (!key || !C.CONCEPTS[key]) return;
    E.addConcept(S, key, X.id, E.today());
    if (X.run.concepts.indexOf(key) === -1) X.run.concepts.push(key);
  }
  async function exCheck() {
    var X = ui.ex, l = E.lessonById(X.id), step = X.steps[X.i], ex = l.exercises, t = step.type, r = null, today = E.today();
    if (t === "comprehension" || t === "vocab") {
      var ans = X.ans[t] || [];
      if (ans.filter(function (x) { return x != null; }).length < ex[t].length) { toast("Réponds à toutes les questions."); return; }
      r = E.scoreChoices(ex[t], ans);
      if (t === "vocab") ex.vocab.forEach(function (q, i) {
        var v = l.vocab.filter(function (x) { return x.key === q.word; })[0];
        if (r.results[i] && v && E.addWord(S, v, l.id, "lesson", today)) X.run.words.push(v.en);
      });
      if (r.pct < E.MASTERY) noteConcept(X, t === "vocab" ? "vocabulaire" : "comprehension");
    } else if (t === "gaps") {
      r = E.scoreGaps(ex.gaps, ex.gaps.map(function (g, i) { return ui.f["gap" + i] || ""; }));
      if (r.pct < E.MASTERY) noteConcept(X, "vocabulaire");
    } else if (t === "translation" || t === "revision") {
      var item = t === "revision" ? step.item : ex.translation;
      var answer = ui.f.tr || "";
      if (!answer.trim()) { toast("Écris ta traduction d’abord."); return; }
      X.busy = true; render();
      r = E.scoreTranslation(Object.assign({ concept: t === "revision" ? step.concept : item.concept }, item), answer);
      if (AI.on && r.score10 < 10) {
        try {
          var a = await AI.json("Corrige la traduction d’un élève francophone de niveau A1.\nPhrase française : « " + item.fr + " »\nRéponses de référence : " + JSON.stringify(item.accept.map(E.pretty)) + "\nRéponse de l’élève : « " + answer + " »\nAccepte toute traduction naturelle et correcte, même différente des références. Les majuscules ne comptent pas ; une faute de ponctuation coûte au plus 1 point.\nRéponds uniquement avec un objet JSON : {\"score\": entier de 0 à 10, \"verdict\": \"Correct\" | \"Presque\" | \"À revoir\", \"expected\": \"la meilleure réponse en anglais\", \"points\": [\"2 ou 3 explications courtes en français, tutoiement\"], \"concept\": une clé parmi " + JSON.stringify(Object.keys(C.CONCEPTS)) + " ou null}");
          if (a && typeof a.score === "number") r = { score10: Math.max(0, Math.min(10, Math.round(a.score))), verdict: String(a.verdict || ""), expected: String(a.expected || r.expected), points: (a.points || []).map(String).slice(0, 4), concept: C.CONCEPTS[a.concept] ? a.concept : (a.score < 10 ? item.concept || step.concept : null), local: false };
        } catch (e) { }
      }
      r.pct = r.score10 * 10;
      if (t === "revision") {
        var c = S.concepts[step.concept];
        if (c) E.review(c, r.score10 >= 8, today);
      } else if (r.score10 < 10) noteConcept(X, r.concept || item.concept);
      if (r.concept && r.concept !== item.concept && t !== "revision") noteConcept(X, r.concept);
      X.busy = false;
    } else if (t === "dictation") {
      if (!(ui.f.dic || "").trim()) { toast("Écris ce que tu as entendu."); return; }
      r = E.scoreDictation(ex.dictation.en, ui.f.dic);
      if (r.pct < E.MASTERY) noteConcept(X, "comprehension");
    } else if (t === "summary") {
      var txt = ui.f.sum || "";
      if (!txt.trim()) { toast("Écris ton résumé d’abord."); return; }
      X.busy = true; render();
      r = E.scoreSummary(ex.summary, txt);
      if (AI.on) {
        try {
          var s2 = await AI.json("Évalue le résumé en anglais d’un élève francophone de niveau A1.\nConsigne : " + ex.summary.prompt + "\nDialogue : " + l.lines.map(function (x) { return x.sp + ": " + x.en; }).join(" / ") + "\nRésumé de l’élève : « " + txt + " »\nSois juste pour un A1 : le sens compte plus que le style. Réponds uniquement avec un objet JSON : {\"score\": entier de 0 à 100, \"points\": [\"2 ou 3 remarques courtes en français, tutoiement\"], \"corrected\": \"sa phrase corrigée, au plus près de ce qu’il a écrit\", \"concept\": une clé parmi " + JSON.stringify(Object.keys(C.CONCEPTS)) + " ou null}");
          if (s2 && typeof s2.score === "number") { r = { pct: Math.max(0, Math.min(100, Math.round(s2.score))), points: (s2.points || []).map(String).slice(0, 4), model: String(s2.corrected || ex.summary.model), local: false }; if (C.CONCEPTS[s2.concept] && r.pct < E.MASTERY) noteConcept(X, s2.concept); }
        } catch (e) { }
      }
      X.busy = false;
    } else if (t === "oral") {
      toast("Touche le micro et répète la phrase.");
      return;
    }
    if (!r) return;
    X.res[X.i] = r;
    if (t !== "revision") E.recordResult(S, X.id, t, r.pct, today);
    else E.recordResult(S, X.id, "revision", r.pct, today);
    save();
    render();
  }
  function exNext() {
    var X = ui.ex;
    if (X.i < X.steps.length - 1) { X.i++; ["tr", "dic", "sum"].forEach(function (k) { ui.f[k] = ""; }); render(); window.scrollTo(0, 0); return; }
    var today = E.today();
    E.finishExercises(S, X.id, today);
    E.logDay(S, today, "exercise", (Date.now() - X.t0) / 60000);
    ui.lastRun = { id: X.id, concepts: X.run.concepts.slice(), words: X.run.words.slice(), skipped: Object.keys(X.res).filter(function (k) { return X.res[k].skipped; }).map(function (k) { return X.steps[k].type; }) };
    save();
    go("results", { id: X.id });
  }

  /* Résultats */
  SCREENS.results = function () {
    var id = (ui.p && ui.p.id) || (ui.lastRun && ui.lastRun.id), l = E.lessonById(id), ls = S.lessons[id] || { scores: {} };
    var sc = E.lessonScore(S, id) || 0, mastered = sc >= E.MASTERY;
    var run = ui.lastRun && ui.lastRun.id === id ? ui.lastRun : { concepts: [], words: [], skipped: [] };
    var next = E.recommend(S, {}).filter(function (r) { return r.kind !== "done" && r.lesson.id !== id; })[0];
    var w = C.WATCH.filter(function (x) { return x.lesson === id; })[0] || C.WATCH.filter(function (x) { return x.level === l.level; })[0];
    var h = top("back-home", "Résultats", l.title + " · " + l.level);
    h += '<section class="card card-lg row" style="gap:16px;align-items:center">' + ring(sc) + '<div class="grow stack-sm"><span class="small" style="font-weight:600;color:var(--blue-fg)">' + (ls.watched ? "Vue en entier ✓" : "Leçon pas encore vue en entier") + '</span><span class="pill ' + (mastered ? "blue" : "org") + '" style="align-self:flex-start;font-size:13px">' + (mastered ? "Maîtrisée" : "Pas encore maîtrisée") + '</span><p class="small muted">Il faut 80 % aux exercices (trait blanc). Regarder jusqu’au bout ne suffit pas.</p></div></section>';
    h += '<section class="card stack" style="gap:14px"><h2 class="eyebrow">Détail des exercices</h2>' + E.EX_TYPES.map(function (t) {
      var v = ls.scores[t];
      if (v == null) return meter(E.EX_LABELS[t], null, { empty: run.skipped.indexOf(t) !== -1 ? "non évalué" : "pas fait" });
      return meter(E.EX_LABELS[t], v, { weakLabel: "à revoir" });
    }).join("") + "</section>";
    if (run.concepts.length) h += '<section class="stack-sm"><h2 class="eyebrow">Erreurs retenues</h2><div class="row wrap" style="gap:6px">' + run.concepts.map(function (k) { return '<span class="pill org" style="font-size:14px;padding:6px 10px">' + esc(C.CONCEPTS[k].label) + "</span>"; }).join("") + "</div></section>";
    if (run.words.length) h += '<section class="stack-sm"><h2 class="eyebrow">Mots appris · +' + run.words.length + '</h2><div class="row wrap" style="gap:6px">' + run.words.map(function (x) { return '<span class="pill blue" style="font-size:14px;padding:6px 10px">' + esc(x) + "</span>"; }).join("") + "</div></section>";
    h += '<section class="card stack"><h2 class="eyebrow" style="color:var(--acc)">Ce que ça change pour toi</h2><ul style="margin:0;padding:0;list-style:none" class="stack">' +
      (ls.review ? "<li>Révision de <b>" + esc(l.title) + "</b> prévue " + esc(E.fmtShort(ls.review.next).toLowerCase()) + " (jour 7).</li>" : "") +
      (run.concepts.length ? "<li>" + run.concepts.length + (run.concepts.length > 1 ? " notions reviennent" : " notion revient") + " demain dans tes révisions, puis à jour 3 et jour 7.</li>" : "") +
      (next ? "<li>Prochaine leçon conseillée : <b>" + esc(next.lesson.title) + "</b>" + (next.reasons[0] ? " (" + esc(next.reasons[0].toLowerCase()) + ")" : "") + ".</li>" : "") +
      (w ? "<li>À regarder : <b>" + esc(w.title) + "</b>, " + esc(w.how.charAt(0).toLowerCase() + w.how.slice(1)) + "</li>" : "") + "</ul></section>";
    h += '<div class="stack"><button class="btn primary big" data-a="open-coach" data-v="' + id + '">' + icon("coach", 20, 2.2) + 'Faire le bilan avec le coach</button><button class="btn big" data-a="start-review">Revoir mes erreurs</button><p class="small muted" style="text-align:center">Le module se termine avec le bilan.</p></div>';
    return h;
  };

  /* Bilan avec le coach */
  function coachOpening(id) {
    var l = E.lessonById(id), ls = S.lessons[id] || { scores: {} }, sc = E.lessonScore(S, id);
    var types = E.EX_TYPES.filter(function (t) { return ls.scores[t] != null; });
    var best = types.slice().sort(function (a, b) { return ls.scores[b] - ls.scores[a]; })[0];
    var worst = types.slice().sort(function (a, b) { return ls.scores[a] - ls.scores[b]; })[0];
    var run = ui.lastRun && ui.lastRun.id === id ? ui.lastRun.concepts : [];
    var weakTxt = run.length ? run.slice(0, 2).map(function (k) { return "« " + C.CONCEPTS[k].label + " »"; }).join(" et ") : (worst ? E.EX_LABELS[worst].toLowerCase() + " (" + ls.scores[worst] + " %)" : "rien de marquant");
    if (sc == null) return "Bilan de « " + l.title + " » : tu n’as pas encore fait les exercices. Qu’est-ce qui t’a paru le plus dur dans la leçon ?";
    return "Bilan de « " + l.title + " » : " + sc + " %" + (sc >= E.MASTERY ? ", leçon maîtrisée." : ", pas encore maîtrisée (il faut 80 %).") + (best ? " Ton point fort : " + E.EX_LABELS[best].toLowerCase() + " (" + ls.scores[best] + " %)." : "") + " À travailler : " + weakTxt + ".\nQu’est-ce qui t’a paru le plus dur ?";
  }
  function fallbackPlan(id) {
    var l = E.lessonById(id), run = ui.lastRun && ui.lastRun.id === id ? ui.lastRun.concepts : [];
    var key = run.filter(function (k) { return C.CONCEPTS[k] && C.CONCEPTS[k].retry; })[0] || l.exercises.translation.concept;
    var c = C.CONCEPTS[key];
    return {
      concept: key,
      steps: [
        { when: "Ce soir", minutes: 2, title: "Shadowing", detail: "Répète 5 fois « " + l.exercises.oral.en + " » juste après la voix, sans lire." },
        { when: "Demain", minutes: 2, title: "Rappel actif", detail: c.retry ? "Traduis de mémoire, sans aide : « " + c.retry.fr + " »" : c.advice },
        { when: "Jour 3", minutes: 1, title: "Révision espacée", detail: "« " + c.label + " » revient juste avant que tu l’oublies." },
        { when: "Vraie vie", minutes: 1, title: "Dans la vraie vie", detail: "Utilise une phrase de la leçon pour de vrai, ou dans ta tête, à la prochaine occasion." }
      ]
    };
  }
  function whenToDate(w, today) {
    var m = { "ce soir": 0, "aujourd’hui": 0, "demain": 1, "jour 3": 3, "jour 7": 7, "vraie vie": 1 };
    var k = String(w || "").toLowerCase().replace("'", "’");
    return E.addDays(today, m[k] != null ? m[k] : 1);
  }
  SCREENS.coach = function () {
    var K = ui.coach, l = E.lessonById(K.id), sc = E.lessonScore(S, K.id), ls = S.lessons[K.id] || {};
    var h = '<header class="top"><button class="icon-btn" data-a="' + (K.readOnly ? "go" : "back-results") + '" data-v="suivi" aria-label="Retour">' + icon("back", 22, 2.2) + '</button><span class="avatar" style="background:var(--fg)">' + icon("coach", 22, 2.2) + '</span><div class="grow stack-sm" style="gap:0"><h1 class="display" style="margin:0;font-size:20px">Ton coach</h1><span class="small muted">' + (K.readOnly ? "Bilan du " + E.fmtDay(K.date) : "Bilan de fin de module") + " · " + esc(l.title) + "</span></div></header>";
    if (!K.readOnly) {
      var nW = ui.lastRun && ui.lastRun.id === K.id ? ui.lastRun.words.length : 0;
      h += '<section class="card grid2" style="grid-template-columns:repeat(4,minmax(0,1fr));text-align:center;padding:14px"><div class="stack-sm" style="gap:2px"><b class="display" style="font-size:22px;color:' + (sc != null && sc < E.MASTERY ? "var(--org)" : "var(--fg)") + '">' + pct(sc) + '</b><span class="xs muted">score</span></div><div class="stack-sm" style="gap:2px"><b class="display" style="font-size:22px">+' + nW + '</b><span class="xs muted">mots</span></div><div class="stack-sm" style="gap:2px"><b class="display" style="font-size:22px">' + pct(ls.scores && ls.scores.oral != null ? ls.scores.oral : null) + '</b><span class="xs muted">oral</span></div><div class="stack-sm" style="gap:2px"><b class="display" style="font-size:22px">' + Math.max(1, Math.round((ls.watchSec || 0) / 60 + (ui.ex && ui.ex.id === K.id ? (Date.now() - ui.ex.t0) / 60000 : 0))) + ' min</b><span class="xs muted">temps</span></div></section><p class="small muted" style="text-align:center">Le module se termine quand le bilan est fait.</p>';
    }
    h += '<div class="stack">';
    K.msgs.forEach(function (m, i) {
      if (m.r === "me") h += '<div class="stack-sm" style="align-items:flex-end">' + (m.voice ? '<span class="xs muted">' + icon("mic", 14) + " message vocal</span>" : "") + '<div class="bubble me">' + esc(m.t) + "</div></div>";
      else h += '<div class="bubble them">' + esc(m.t) + "</div>";
      if (m.plan && m.plan.length) {
        h += '<section class="card card-lg stack" aria-label="Plan du coach"><div class="row-between" style="align-items:center"><h2 class="display" style="margin:0;font-size:20px">Ton plan</h2><span class="xs muted">' + m.plan.length + ' étapes</span></div><ol style="margin:0;padding:0;list-style:none" class="stack">' + m.plan.map(function (s, k) {
          return '<li class="row" style="align-items:flex-start;gap:12px"><span class="avatar" style="width:28px;height:28px;font-size:13px;' + (k ? "background:var(--s2);color:var(--fg)" : "") + '">' + (k + 1) + '</span><span class="stack-sm" style="gap:2px"><span class="eyebrow" style="font-size:11px">' + esc(s.when) + (s.minutes ? " · " + s.minutes + " min" : "") + '</span><span style="font-size:15px"><b>' + esc(s.title) + "</b> : " + esc(s.detail) + "</span></span></li>";
        }).join("") + "</ol>" + (K.readOnly ? "" : '<button class="btn ' + (m.added ? "" : "primary") + '" data-a="plan-add" data-v="' + i + '"' + (m.added ? " disabled" : "") + ">" + (m.added ? "Ajouté à ton suivi ✓" : "Ajouter à mon suivi") + "</button>") + "</section>";
      }
      if (m.ask && !K.readOnly && !m.answered) {
        h += '<div class="row wrap" style="justify-content:flex-end;gap:8px" role="group" aria-label="Réponses rapides">' + m.ask.map(function (a) { return '<button class="btn" style="min-height:44px;border-color:var(--acc);font-size:14px" data-a="coach-quick" data-v="' + esc(a) + '">' + esc(a) + "</button>"; }).join("") + "</div>";
      }
    });
    if (K.busy) h += '<div class="bubble them muted"><span class="dots">Le coach réfléchit</span></div>';
    h += "</div>";
    if (!K.readOnly) {
      h += '<div class="stack" style="margin-top:auto">' + notice(AI.on ? "Ton coach, c’est Claude : il lit tes scores et tes erreurs sauvegardées pour te répondre. Le bilan est rangé dans ton suivi." : "Le coach te répond avec des conseils préparés à partir de tes résultats. Les réponses libres de Claude sont disponibles dans la version claude.ai.") +
        '<div class="row"><label class="grow"><span class="sr">Écrire au coach</span><input class="input round" id="f-coach" data-f="coach" placeholder="Écris ou parle à ton coach…" value="' + esc(ui.f.coach || "") + '"' + (K.busy ? " disabled" : "") + "></label>" +
        (STT.ok() ? '<button class="avatar" style="width:52px;height:52px;border-radius:26px" data-a="coach-mic" aria-label="Parler au coach">' + icon("mic", 22, 2.2) + "</button>" : "") +
        '<button class="icon-btn" style="width:52px;height:52px;border-radius:26px;background:var(--fg);color:var(--bg);border:0" data-a="coach-send" aria-label="Envoyer"' + (K.busy ? " disabled" : "") + ">" + icon("send", 20) + "</button></div>" +
        '<button class="btn big' + (K.sent ? " light" : "") + '" data-a="coach-finish"' + (K.sent ? "" : " disabled") + ">Terminer le module</button>" + (K.sent ? "" : '<p class="xs muted" style="text-align:center">Réponds au coach au moins une fois pour terminer.</p>') + "</div>";
    }
    return h;
  };
  function openCoach(id) {
    ui.coach = { id: id, msgs: [{ r: "coach", t: coachOpening(id) }], busy: false, sent: 0, askedSlot: false, readOnly: false };
    ui.f.coach = "";
    go("coach");
  }
  function coachContext(id) {
    var l = E.lessonById(id), ls = S.lessons[id] || { scores: {} }, pi = E.periodInfo(S.profile, E.today());
    var run = ui.lastRun && ui.lastRun.id === id ? ui.lastRun : { concepts: [], words: [] };
    return "Tu es le coach d’anglais de l’app English Master. Tu parles à " + (S.profile.name || "l’élève") + ", francophone, niveau " + S.profile.level + ", objectif : " + S.profile.goal + ".\n" +
      (pi ? "Il est en alternance : période " + pi.type + " jusqu’au " + pi.end + ", puis période " + pi.next[0].type + " à partir du " + pi.next[0].start + ". Séances prévues vers " + S.profile.slot + ".\n" : "") +
      "Module terminé : « " + l.title + " ». Scores : " + JSON.stringify(ls.scores) + " (maîtrise à 80 %). Notions fragiles : " + JSON.stringify(run.concepts.map(function (k) { return C.CONCEPTS[k].label; })) + ". Mots appris : " + JSON.stringify(run.words) + ".\n" +
      "Règles : réponds en français, tutoie, 90 mots maximum, ton direct et chaleureux, sans flatterie. Donne des conseils concrets et efficaces : répétition à voix haute juste après la voix (shadowing), rappel actif sans aide, révisions espacées (jour 1, 3, 7), utilisation en situation réelle, séries en VO avec sous-titres anglais. Si la question sort de l’anglais, ramène gentiment au sujet.\n" +
      "Réponds uniquement avec un objet JSON : {\"reply\": \"ton message\", \"plan\": null ou une liste de 3 ou 4 étapes {\"when\": \"Ce soir\" | \"Demain\" | \"Jour 3\" | \"Jour 7\" | \"Vraie vie\", \"minutes\": entier, \"title\": \"2 à 4 mots\", \"detail\": \"une phrase concrète\"}}. Donne un plan seulement s’il n’y en a pas encore eu dans la conversation.";
  }
  async function coachSend(text, voice) {
    var K = ui.coach;
    if (!text || !text.trim() || K.busy) return;
    K.msgs.push({ r: "me", t: text.trim(), voice: !!voice });
    K.sent++; K.busy = true; ui.f.coach = "";
    render(); window.scrollTo(0, document.body.scrollHeight);
    var hadPlan = K.msgs.some(function (m) { return m.plan; });
    var reply = null, plan = null;
    if (AI.on) {
      try {
        var turns = [{ role: "user", content: coachContext(K.id) }];
        K.msgs.forEach(function (m) { turns.push({ role: m.r === "me" ? "user" : "assistant", content: m.t }); });
        var r = await AI.json(turns);
        if (r && r.reply) {
          reply = String(r.reply);
          if (!hadPlan && Array.isArray(r.plan) && r.plan.length) plan = r.plan.slice(0, 4).map(function (s) { return { when: String(s.when || "Demain"), minutes: Number(s.minutes) || 2, title: String(s.title || "Étape"), detail: String(s.detail || "") }; });
        }
      } catch (e) { }
    }
    if (!reply) {
      if (!hadPlan) {
        var fp = fallbackPlan(K.id);
        reply = "Merci, c’est noté. " + C.CONCEPTS[fp.concept].advice + "\nVoici ton plan pour que ça rentre vraiment :";
        plan = fp.steps;
      } else {
        reply = "Noté. Le plus efficace : quelques minutes chaque jour, à voix haute, plutôt qu’une longue séance de temps en temps. Tu peux terminer le module quand tu veux.";
      }
    }
    K.msgs.push({ r: "coach", t: reply, plan: plan });
    var pi = E.periodInfo(S.profile, E.today());
    if (!K.askedSlot && pi) {
      K.askedSlot = true;
      var nx = pi.next[0];
      K.msgs.push({ r: "coach", t: "Tu passes en période " + E.PERIOD_LABEL[nx.type].toLowerCase() + " le " + E.fmtDay(nx.start) + (/\.$/.test(E.fmtDay(nx.start)) ? " " : ". ") + "À quelle heure tu fais tes " + E.periodPlan(nx.type, S.profile).minutes + " minutes d’anglais pendant cette période ?", ask: ["19h", "20h", "21h", "Le week-end"] });
    }
    K.busy = false;
    render(); window.scrollTo(0, document.body.scrollHeight);
  }
  function coachQuick(v) {
    var K = ui.coach;
    var ask = K.msgs.filter(function (m) { return m.ask && !m.answered; })[0];
    if (ask) ask.answered = true;
    K.msgs.push({ r: "me", t: v });
    K.sent++;
    if (/h$/.test(v)) {
      S.profile.slot = (v.replace("h", "").padStart(2, "0")) + ":00";
      K.msgs.push({ r: "coach", t: "C’est noté : " + v + " pendant ta prochaine période. C’est dans ton suivi. Le plus important, c’est la régularité : même 5 minutes comptent." });
    } else {
      K.msgs.push({ r: "coach", t: "OK pour le week-end : 2 séances de 15 minutes. Sans pratique en semaine tu oublies plus vite, alors garde au moins 2 minutes de révision le soir." });
    }
    save(); render(); window.scrollTo(0, document.body.scrollHeight);
  }
  function coachFinish() {
    var K = ui.coach, today = E.today();
    var planMsg = K.msgs.filter(function (m) { return m.plan; })[0];
    var tip = planMsg ? { title: planMsg.plan[0].title + " : " + planMsg.plan[0].detail, detail: "Étape 1 de ton plan, puis " + planMsg.plan.slice(1).map(function (s) { return s.when.toLowerCase(); }).join(", ") + "." } : null;
    S.bilans.push({ d: today, lesson: K.id, msgs: K.msgs.map(function (m) { return { r: m.r, t: String(m.t).slice(0, 800), plan: m.plan || null }; }).slice(-14), tip: tip });
    E.L(S, K.id).bilan = today;
    E.logDay(S, today, "coach", 3);
    save();
    toast("Module terminé. Bilan rangé dans ton suivi.");
    go("suivi");
  }

  /* Suivi */
  SCREENS.suivi = function () {
    var t = E.today(), P = S.profile, pi = E.periodInfo(P, t);
    var weeks = ui.suivi === "semaine" ? 1 : ui.suivi === "mois" ? 4 : 2;
    var h = '<header class="stack-sm"><h1 class="h1">Suivi</h1><p class="muted">Alternance : 2 semaines école, 2 semaines entreprise</p></header>';
    h += '<div class="seg acc" role="group" aria-label="Vue" style="grid-template-columns:repeat(3,minmax(0,1fr))">' + [["semaine", "Semaine"], ["periode", "Période"], ["mois", "Mois"]].map(function (x) { return '<button data-a="suivi-view" data-v="' + x[0] + '" aria-pressed="' + (ui.suivi === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>";
    if (pi) {
      var cards = [{ type: pi.type, start: pi.start, end: pi.end, cur: true }].concat(pi.next);
      h += '<section class="stack"><h2 class="eyebrow">Tes périodes</h2><div class="grid2">' + cards.map(function (c, i) {
        return '<div class="card tight stack-sm" style="gap:4px;' + (c.cur ? "border:2px solid var(--acc);padding:11px" : "") + '">' + (c.cur ? '<span class="xs" style="font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.08em">En cours · j ' + pi.dayIndex + "/10</span>" : i === 1 ? '<span class="xs muted" style="font-weight:700;text-transform:uppercase;letter-spacing:.08em">Ensuite</span>' : "") + '<span style="font-size:17px;font-weight:700">' + E.PERIOD_LABEL[c.type] + '</span><span class="small muted">' + E.fmtDay(c.start) + " → " + E.fmtDay(c.end) + '</span><span class="small" style="margin-top:4px">' + esc(E.periodPlan(c.type, P).text) + "</span></div>";
      }).join("") + '</div><button class="link" data-a="go" data-v="settings">Modifier mes dates d’alternance</button></section>';
      var obj = E.periodObjectives(S, pi);
      h += '<section class="card stack" style="gap:14px"><div class="row-between"><h2 class="eyebrow">Objectifs de la période</h2><span class="small muted">' + E.PERIOD_LABEL[pi.type].toLowerCase() + " · " + E.fmtDay(pi.start) + " → " + E.fmtDay(pi.end) + "</span></div>" + obj.map(function (o) {
        var p = Math.round((Math.min(o.value, o.target) / o.target) * 100);
        return '<div class="meter"><div class="row-between"><span>' + esc(o.label) + '</span><span class="num">' + o.value + " / " + o.target + '</span></div><div class="bar"><i style="width:' + Math.max(o.value ? 4 : 0, p) + '%"></i></div></div>';
      }).join("") + "</section>";
    } else {
      h += '<section class="card stack"><p>Indique ta période actuelle pour voir tes objectifs école / entreprise.</p><button class="btn primary" data-a="go" data-v="settings">Régler mes périodes</button></section>';
    }
    var cal = E.calendar(S, t, weeks);
    h += '<section class="stack"><div class="row-between"><h2 class="eyebrow">Régularité</h2><span style="font-weight:700;color:var(--acc)">' + E.streak(S, t) + " jour" + (E.streak(S, t) > 1 ? "s" : "") + " d’affilée</span></div><div class=\"card stack-sm\" style=\"padding:14px\"><div class=\"cal xs muted\" aria-hidden=\"true\" style=\"text-align:center\">" + ["L", "M", "M", "J", "V", "S", "D"].map(function (d) { return "<span>" + d + "</span>"; }).join("") + '</div><div class="cal">' + cal.map(function (c) {
      var lab = { done: "séance faite", review: "révisions seulement", missed: "manquée", rest: "repos", today: "aujourd’hui", future: "à venir", before: "avant ton début" }[c.status];
      var sym = { done: "✓", review: "↻", missed: "✗", rest: "–", today: "auj.", future: "", before: "" }[c.status];
      return '<span class="d ' + c.status + (c.isToday ? " is-today" : "") + '" aria-label="' + E.fmtDay(c.date) + ", " + lab + '"><span>' + c.day + "</span><span>" + sym + "</span></span>";
    }).join("") + '</div><div class="row wrap xs muted" style="gap:4px 14px;padding-top:4px"><span>✓ séance faite</span><span>↻ révisions seulement</span><span>✗ manquée</span><span>– repos</span></div></div></section>';
    var evo = E.weeklyEvolution(S, t, 3);
    var row = function (label, key, suffix) {
      var vals = evo.map(function (c) { return c[key]; });
      var first = vals.filter(function (v) { return v != null; })[0], last = vals[vals.length - 1];
      var d = first != null && last != null ? last - first : null;
      return '<tr><th scope="row">' + label + "</th>" + vals.map(function (v, i) { return '<td style="' + (i === vals.length - 1 ? "font-weight:700" : "color:var(--mut)") + '">' + (v == null ? "—" : v + (suffix || "")) + "</td>"; }).join("") + '<td style="font-weight:700;color:var(--blue-fg)">' + (d == null ? "—" : (d >= 0 ? "+" : "") + d) + "</td></tr>";
    };
    h += '<section class="stack"><h2 class="eyebrow">Évolution sur 3 semaines</h2><div class="card" style="padding:4px 14px;overflow-x:auto"><table class="evo"><thead><tr><th scope="col">Compétence</th>' + evo.map(function (c) { return '<th scope="col">' + c.label + "</th>"; }).join("") + '<th scope="col">Écart</th></tr></thead><tbody>' + row("Compréhension", "comprehension", " %") + row("Oral", "oral", " %") + row("Écriture", "ecriture", " %") + row("Mots (total)", "words", "") + "</tbody></table></div></section>";
    var up = E.upcoming(S, t, 10);
    var due = E.dueItems(S, t).length;
    h += '<section class="stack"><div class="stack-sm" style="gap:2px"><h2 class="eyebrow">Révisions planifiées</h2><span class="small muted">Chaque notion revient juste avant que tu l’oublies : jour 1, 3, 7, puis 14.</span></div>' +
      (up.length ? '<div class="card divide" style="padding:0">' + up.slice(0, 8).map(function (r) { return '<div class="list-row"><span style="width:84px;flex:none;font-size:13px;font-weight:700;' + (r.date <= t ? "color:var(--acc)" : "") + '">' + esc(r.date <= t ? "Aujourd’hui" : E.fmtShort(r.date, t)) + '</span><span class="grow small">' + esc(r.label) + '</span><span class="small muted">' + r.minutes + " min</span></div>"; }).join("") + "</div>" : '<div class="dashed small">Rien de prévu pour l’instant. Les révisions apparaissent après tes exercices.</div>') +
      (due ? '<button class="btn primary" data-a="start-review">Commencer les révisions · ' + due + "</button>" : "") +
      '<button class="link" data-a="go" data-v="words">Mes mots · ' + Object.keys(S.words).length + "</button></section>";
    h += '<section class="stack"><h2 class="eyebrow">Bilans avec le coach</h2>' + (S.bilans.length ? S.bilans.slice().reverse().slice(0, 6).map(function (b, k) {
      var idx = S.bilans.length - 1 - k, l = E.lessonById(b.lesson);
      return '<button class="card stack-sm" style="text-align:left;color:var(--fg)" data-a="open-bilan" data-v="' + idx + '"><span class="row-between small muted"><span>' + E.fmtDay(b.d) + " · " + esc(l ? l.title : "") + '</span><span style="color:var(--blue-fg);font-weight:600">Ouvrir</span></span><span>' + esc(b.tip ? b.tip.title : "Bilan de fin de module") + "</span></button>";
    }).join("") : '<div class="dashed small">Ton premier bilan apparaîtra ici à la fin d’un module.</div>') + "</section>";
    return h;
  };

  /* Mes mots */
  SCREENS.words = function () {
    var keys = Object.keys(S.words).sort(function (a, b) { return S.words[b].added < S.words[a].added ? -1 : 1; });
    var h = '<header class="stack-sm"><h1 class="h1">Mes mots</h1><p class="muted">' + keys.length + " mot" + (keys.length > 1 ? "s" : "") + " · chacun revient à jour 1, 3, 7, 14 puis 30</p></header>";
    if (!keys.length) return h + '<div class="dashed">Aucun mot pour l’instant. Touche un mot souligné dans une leçon, ou réussis le QCM de vocabulaire.</div>';
    h += '<div class="card divide" style="padding:0">' + keys.map(function (k) {
      var w = S.words[k], l = w.lesson ? E.lessonById(w.lesson) : null;
      var conf = ui.confirm === "del:" + k;
      return '<div class="list-row"><button class="icon-btn" style="width:40px;height:40px" data-a="say-plain" data-v="' + esc(w.en) + '|' + (l ? l.lang : "en-US") + '" aria-label="Écouter ' + esc(w.en) + '">' + icon("speaker", 18) + '</button><span class="grow stack-sm" style="gap:1px"><b>' + esc(w.en) + '</b><span class="small muted">' + esc(w.fr || "") + (w.source === "video" ? " · vu dans une vidéo" : w.source === "watch" ? " · entendu dans une série" : "") + '</span></span><span class="xs muted" style="text-align:right">' + (w.next <= E.today() ? '<span style="color:var(--acc);font-weight:700">à revoir</span>' : esc(E.fmtShort(w.next))) + "</span>" +
        (conf ? '<button class="btn" style="min-height:40px;font-size:13px;color:var(--org);border-color:var(--org)" data-a="del-word" data-v="' + esc(k) + '">Supprimer</button>' : '<button class="icon-btn" style="width:40px;height:40px;background:none;border:0;color:var(--mut)" data-a="ask-del" data-v="' + esc(k) + '" aria-label="Supprimer ' + esc(w.en) + '">' + icon("trash", 18) + "</button>") + "</div>";
    }).join("") + "</div>";
    return h;
  };

  /* Révisions */
  SCREENS.review = function () {
    var R = ui.review;
    var h = top("back-home", "Révisions", R.queue.length ? (Math.min(R.i + 1, R.queue.length)) + " sur " + R.queue.length : "");
    if (!R.queue.length || R.i >= R.queue.length) {
      return h + '<section class="card stack"><h2 class="h2">' + (R.queue.length ? "Révisions terminées" : "Rien à réviser aujourd’hui") + '</h2><p class="muted">' + (R.queue.length ? R.ok + " réussie" + (R.ok > 1 ? "s" : "") + " sur " + R.queue.length + ". Les notions ratées reviennent demain, les autres plus tard." : "Les prochaines révisions sont dans ton suivi.") + '</p><button class="btn primary" data-a="go" data-v="home">Retour à l’accueil</button></section>';
    }
    var it = R.queue[R.i];
    h += stepsBar(R.queue.length, R.queue.map(function (x, i) { return i < R.i ? (R.marks[i] ? "ok" : "ko") : i === R.i ? "cur" : ""; }));
    if (it.kind === "word") {
      var w = it.item, l = w.lesson ? E.lessonById(w.lesson) : null;
      h += '<section class="card card-lg stack" style="text-align:center;padding:28px 16px"><span class="eyebrow">Mot · ' + (l ? esc(l.title) : "à toi") + '</span><p class="display" style="font-size:30px">' + esc(w.en) + '</p><button class="btn" style="align-self:center" data-a="say-plain" data-v="' + esc(w.en) + "|" + (l ? l.lang : "en-US") + '">' + icon("speaker", 18) + "Écouter</button>" + (R.reveal ? '<p style="font-size:18px;font-weight:600;color:var(--blue-fg)">' + esc(w.fr || "—") + "</p>" : "") + "</section>";
      h += R.reveal ? '<div class="row"><button class="btn big grow" data-a="rev-mark" data-v="0">À revoir</button><button class="btn primary big grow" data-a="rev-mark" data-v="1">Je savais</button></div>' : '<button class="btn primary big" data-a="rev-reveal">Voir la traduction</button>';
    } else if (it.kind === "concept") {
      var def = C.CONCEPTS[it.key];
      h += '<section class="stack"><span class="pill org" style="align-self:flex-start">' + esc(def.label) + "</span>";
      if (def.retry) {
        h += '<h2 class="h2">Traduis de mémoire</h2><p class="card" style="font-size:18px">« ' + esc(def.retry.fr) + ' »</p><label class="field"><span>Ta réponse</span><input class="input" id="f-rev" data-f="rev" autocapitalize="sentences" value="' + esc(ui.f.rev || "") + '"' + (R.checked ? " disabled" : "") + "></label>";
        if (R.checked) h += '<p class="fb ' + (R.checked.ok ? "good" : "bad") + '">' + (R.checked.ok ? "Juste. Prochaine révision plus tard." : "Réponse attendue : " + esc(def.retry.show || E.pretty(def.retry.accept[0])) + ". Elle revient demain.") + "</p>";
        h += R.checked ? '<button class="btn primary big" data-a="rev-next">Suivant</button>' : '<button class="btn primary big" data-a="rev-check">Vérifier</button>';
      } else {
        h += '<h2 class="h2">Conseil à appliquer</h2><p class="card">' + esc(def.advice) + '</p><div class="row"><button class="btn big grow" data-a="rev-mark" data-v="0">Plus tard</button><button class="btn primary big grow" data-a="rev-mark" data-v="1">C’est fait</button></div>';
      }
      h += "</section>";
    } else if (it.kind === "plan") {
      h += '<section class="card card-lg stack"><span class="eyebrow">Plan du coach · ' + esc(it.item.when || "") + '</span><h2 class="h2">' + esc(it.item.title) + "</h2><p>" + esc(it.item.detail) + "</p>" + (/shadow|répète|oral|voix/i.test(it.item.title + it.item.detail) ? '<button class="btn" data-a="open-oral" data-v="' + (it.item.lesson || "") + ':shadow">' + icon("mic", 18, 2.2) + "Faire le shadowing</button>" : "") + '</section><div class="row"><button class="btn big grow" data-a="rev-mark" data-v="0">Demain</button><button class="btn primary big grow" data-a="rev-mark" data-v="1">C’est fait</button></div>';
    } else if (it.kind === "lesson") {
      var ll = E.lessonById(it.key);
      h += '<section class="card card-lg stack">' + tile(ll) + '<h2 class="h2">Revois « ' + esc(ll.title) + ' »</h2><p class="muted">Écoute le dialogue sans la traduction. Si tu comprends tout, c’est acquis.</p><button class="btn" data-a="open-lesson-hard" data-v="' + ll.id + '">' + icon("play", 18) + 'Revoir sans traduction</button></section><div class="row"><button class="btn big grow" data-a="rev-mark" data-v="0">Pas encore</button><button class="btn primary big grow" data-a="rev-mark" data-v="1">Tout compris</button></div>';
    }
    return h;
  };
  function startReview() {
    var q = E.dueItems(S, E.today()).slice(0, 15);
    ui.review = { queue: q, i: 0, reveal: false, checked: null, ok: 0, marks: [], t0: Date.now() };
    ui.f.rev = "";
    go("review");
  }
  function reviewMark(success) {
    var R = ui.review, it = R.queue[R.i], today = E.today();
    if (it.kind === "plan") { if (success) { it.item.done = true; it.item.doneAt = today; } else it.item.due = E.addDays(today, 1); }
    else E.review(it.item, success, today);
    R.marks[R.i] = success; if (success) R.ok++;
    R.i++; R.reveal = false; R.checked = null; ui.f.rev = "";
    if (R.i >= R.queue.length) E.logDay(S, today, "review", Math.max(1, (Date.now() - R.t0) / 60000));
    save(); render(); window.scrollTo(0, 0);
  }

  /* ---------- Rendu ---------- */
  function navHtml() {
    var r = ui.route === "words" ? "suivi" : ui.route === "watch" ? "library" : ui.route;
    var items = [["home", "home", "Accueil"], ["library", "grid", "Bibliothèque"], ["oral", "mic", "Oral"], ["suivi", "chart", "Suivi"]];
    return '<div class="in">' + items.map(function (x) { return '<button data-a="nav" data-v="' + x[0] + '"' + (r === x[0] ? ' aria-current="page"' : "") + ">" + icon(x[1], 24) + x[2] + "</button>"; }).join("") + "</div>";
  }
  function render() {
    if (YTM.alive()) { ytRefresh(); return; }
    var app = document.getElementById("app"), nav = document.getElementById("nav");
    var y = window.scrollY;
    var fn = SCREENS[ui.route] || SCREENS.home;
    if (ui.route === "player" && !ui.player) ui.route = "home";
    if (ui.route === "oral" && !ui.oral) ui.oral = oralState(C.LESSONS[0].id, "role");
    if ((ui.route === "ex" && !ui.ex) || (ui.route === "coach" && !ui.coach) || (ui.route === "review" && !ui.review)) ui.route = "home";
    fn = SCREENS[ui.route] || SCREENS.home;
    app.innerHTML = fn();
    var showNav = NAV_ROUTES.indexOf(ui.route) !== -1;
    nav.hidden = !showNav;
    app.className = showNav ? "" : "full";
    if (showNav) nav.innerHTML = navHtml();
    window.scrollTo(0, y);
  }

  /* ---------- Actions ---------- */
  var A = {
    nav: function (v) { if (v === "oral") openOral("", true); else go(v); },
    go: function (v) { go(v || "home"); },
    "back-home": function () { go("home"); },
    "back-player": function () { if (ui.player) go("player"); else go("home"); },
    "back-results": function () { go("results", { id: ui.coach.id }); },
    "set-f": function (v) { var p = v.split(":"); ui.f[p[0]] = p[1]; render(); },
    "save-profile": function () {
      var P = S.profile, f = ui.f;
      if (f.name != null) P.name = f.name.trim();
      if (f.level) P.level = f.level;
      if (f.goal) P.goal = f.goal;
      var end = f.pend || (P.period && P.period.end) || E.addDays(E.mondayOf(E.today()), 11);
      P.period = { type: f.ptype || (P.period && P.period.type) || "ecole", end: end };
      if (f.slot) P.slot = f.slot;
      var m = parseInt(f.min || P.minutes, 10);
      if (m >= 5 && m <= 60) P.minutes = m;
      var first = !P.onboarded;
      P.onboarded = true;
      if (!P.since) P.since = E.today();
      ui.watch.level = P.level;
      save();
      ui.f = {};
      toast(first ? "Profil créé. Voici ta leçon du jour." : "Réglages enregistrés");
      go("home");
    },
    "voice-pick": function (v) {
      S.profile.voice = v || ""; save();
      var nv = v.indexOf("neural:") === 0 ? v.slice(7) : (!v ? NV.pick("en-US") : null), vo = nv ? null : TTS.byURI(v);
      toast(nv ? "Voix choisie : " + (v ? NV.INFO[nv].name : "automatique") : vo ? "Voix choisie : " + vo.name : "Voix automatique");
      TTS.cancel(); TTS.speak("Hi! I would like a coffee, please.", nv ? { lang: "en-US", neural: nv } : { lang: vo ? vo.lang : "en-US", voice: vo });
      render();
    },
    "voice-test": function (v) {
      var text = "Hi! I would like a coffee, please. How much is it?";
      TTS.cancel();
      if (v.indexOf("neural:") === 0) { var nv = v.slice(7) === "auto" ? (NV.has() ? "af_heart" : null) : v.slice(7); TTS.speak(text, { lang: "en-US", neural: nv }); return; }
      var vo = TTS.byURI(v) || TTS.voice("en-US", true); TTS.speak(text, { lang: vo ? vo.lang : "en-US", voice: vo });
    },
    "ask-reset": function () { ui.confirm = "reset"; render(); },
    "cancel-confirm": function () { ui.confirm = null; render(); },
    "reset-yes": function () { var onb = S.profile; S = E.defaultState(); S.profile = onb; S.profile.onboarded = true; save(); ui.confirm = null; toast("Données effacées"); go("home"); },
    minutes: function (v) { S.profile.minutes = Number(v); save(); render(); },
    "open-lesson": function (v) { openLesson(v, false); },
    "open-lesson-hard": function (v) { openLesson(v, true); },
    harder: function (v) { openLesson(v, true); },
    "lib-level": function (v) { ui.lib.level = v; render(); },
    "lib-cat": function (v) { ui.lib.cat = ui.lib.cat === v ? "" : v; render(); },
    "watch-level": function (v) { ui.watch.level = v; render(); },
    "watch-theme": function (v) { ui.watch.theme = v; render(); },
    watched: function (v) { var t = E.today(); S.watched.push({ d: t, title: v, min: 10 }); E.logDay(S, t, "watch", 10); save(); toast("Noté : « " + v + " » dans ton suivi"); render(); },
    "add-vheard": function () { addHeard("vheard", ui.player.id, "video"); },
    "player-tab": function (v) {
      var P = ui.player;
      if (P.tab === v) return;
      if (v === "video") {
        if (P.playing) pausePlayer();
        TTS.cancel(); P.card = null; P.tab = "video"; P.ytErr = null;
        render(); window.scrollTo(0, 0);
        if (!IN_CLAUDE && navigator.onLine !== false) YTM.mount(P.id);
      } else { YTM.destroy(); P.tab = "lesson"; render(); window.scrollTo(0, 0); }
    },
    "yt-retry": function () { var P = ui.player; P.ytErr = null; delete vidInfo(E.lessonById(P.id).video.id).err; render(); if (!IN_CLAUDE) YTM.mount(P.id); },
    "yt-play": function () {
      var ys = ui.player.ysh;
      if (YTM.state === 1) { YTM.call("pauseVideo"); return; }
      if (ys.on && ys.phase === "turn") { A["ysh-next"](); return; }
      if (ys.on) { ys.start = YTM.cur; ys.end = YTM.cur + ys.len; ys.phase = "play"; }
      YTM.call("playVideo");
    },
    "yt-back": function () { var t = Math.max(0, YTM.cur - 5); YTM.call("seekTo", t, true); YTM.cur = t; var ys = ui.player.ysh; if (ys.on) { ys.start = t; ys.end = t + ys.len; ys.phase = "play"; } YTM.call("playVideo"); },
    "yt-fwd": function () { var t = Math.min(YTM.dur || Infinity, YTM.cur + 10); YTM.call("seekTo", t, true); YTM.cur = t; var ys = ui.player.ysh; if (ys.on) { ys.start = t; ys.end = t + ys.len; ys.phase = "play"; } },
    "yt-rate": function (v) { YTM.call("setPlaybackRate", Number(v)); YTM.rate = Number(v); ytRefresh(); },
    "ysh-toggle": function () { var ys = ui.player.ysh; ys.on = !ys.on; ys.start = YTM.cur; ys.end = YTM.cur + ys.len; ys.phase = "play"; ytRefresh(); },
    "ysh-len": function (v) { var ys = ui.player.ysh; ys.len = Number(v); ys.end = ys.start + ys.len; ytRefresh(); },
    "ysh-replay": function () { var ys = ui.player.ysh; YTM.call("seekTo", ys.start, true); YTM.cur = ys.start; ys.end = ys.start + ys.len; ys.phase = "play"; YTM.call("playVideo"); E.logDay(S, E.today(), "oral", 0); ytRefresh(); },
    "ysh-next": function () { var ys = ui.player.ysh; ys.start = ys.end; ys.end = ys.start + ys.len; ys.phase = "play"; YTM.call("playVideo"); E.logDay(S, E.today(), "oral", 0); ytRefresh(); },
    "v-watched": function () { YTM.lesson = ui.player.id; var v = YTM.lv(); v.done = true; v.pct = 100; E.logDay(S, E.today(), "watch", 0); save(); toast("Vidéo notée comme vue. Place aux exercices."); render(); },
    "sh-play": function () {
      var sh = ui.oral.sh;
      if (sh.phase === "listen" || sh.phase === "turn") { shStop(sh); sh.phase = "paused"; render(); }
      else shStep();
    },
    "sh-replay": function () { var sh = ui.oral.sh; shStop(sh); shStep(); },
    "sh-next": function () { var sh = ui.oral.sh, n = E.lessonById(ui.oral.id).lines.length; shStop(sh); sh.round = 0; sh.reveal = false; sh.i = Math.min(n, sh.i + 1); if (sh.i >= n) shFinish(); else shStep(); },
    "sh-text": function (v) { ui.oral.sh.text = v; render(); },
    "sh-speed": function (v) { ui.oral.sh.speed = Number(v); render(); },
    "sh-rounds": function (v) { ui.oral.sh.rounds = Number(v); render(); },
    "sh-mic": function () { ui.oral.sh.mic = !ui.oral.sh.mic; render(); },
    "sh-reveal": function () { ui.oral.sh.reveal = true; render(); },
    "sh-rate": function (v) { var sh = ui.oral.sh; sh.rating = v; if (v === "difficile") E.addConcept(S, "prononciation", ui.oral.id, E.today()); save(); render(); },
    "sh-restart": function (v) { var old = ui.oral.sh, sh = shState(); sh.text = v || old.text; sh.speed = old.speed; sh.rounds = old.rounds; sh.mic = old.mic; ui.oral.sh = sh; render(); window.scrollTo(0, 0); },
    "add-heard": async function () {
      var txt = (ui.f.heard || "").trim();
      if (!txt) { toast("Écris la réplique d’abord."); return; }
      var t = E.today(), en = txt, fr = "";
      if (AI.on) {
        ui.busyHeard = true; render();
        try {
          var r = await AI.json("Un élève francophone a noté une réplique entendue dans une série en anglais : « " + txt + " ». Corrige-la si besoin (orthographe, ponctuation) sans changer le sens, et traduis-la. Réponds uniquement avec un objet JSON : {\"en\": \"la réplique corrigée\", \"fr\": \"traduction naturelle\"}");
          if (r && r.en) { en = String(r.en); fr = String(r.fr || ""); }
        } catch (e) { }
        ui.busyHeard = false;
      }
      E.addWord(S, { en: en, fr: fr }, null, "watch", t);
      ui.f.heard = ""; save();
      toast("Ajouté à tes révisions"); render();
    },
    play: function () { if (ui.player.playing) { pausePlayer(); playerTick(); } else playPlayer(); },
    "seg-prev": function () { jumpTo(ui.player.idx - 1); },
    "seg-next": function () { jumpTo(ui.player.idx + 1); },
    "seg-replay": function () { jumpTo(ui.player.idx, true); },
    chapter: function (v) { var c = Number(v), i = ui.player.segs.map(function (s) { return s.chapter; }).indexOf(c); jumpTo(i); },
    "goto-line": function (v) { var i = ui.player.segs.map(function (s) { return s.chapter === 0 && s.line; }).indexOf(Number(v)); jumpTo(i === -1 ? 0 : i, true); },
    speed: function (v) { ui.player.speed = Number(v); ui.lastSpeed = Number(v); playerTick(); },
    "toggle-fr": function () { ui.player.fr = !ui.player.fr; playerTick(); },
    "toggle-en": function () { ui.player.en = !ui.player.en; playerTick(); },
    word: function (v) { var p = v.split(":"); var P = ui.player; P.card = P.card && P.card.key === p[1] && P.card.line === Number(p[0]) ? null : { line: Number(p[0]), key: p[1] }; playerTick(); },
    "close-card": function () { ui.player.card = null; playerTick(); },
    "say-word": function (v) { var l = E.lessonById(ui.player.id); var w = l.vocab.filter(function (x) { return x.key === v; })[0]; var o = { lang: l.lang, rate: 0.9 * ui.player.speed }, my = ++ui.sayTok; TTS.cancel(); TTS.speak(w.en, o).then(function () { if (w.ex && my === ui.sayTok) setTimeout(function () { if (my === ui.sayTok) TTS.speak(w.ex, o); }, 350); }); },
    "say-line": function (v) { var l = E.lessonById(ui.player.id); TTS.speak(l.lines[Number(v)].en, { lang: l.lang, rate: ui.player.speed }); },
    "save-word": function (v) {
      var l = E.lessonById(ui.player.id), w = l.vocab.filter(function (x) { return x.key === v; })[0], k = l.id + ":" + v;
      if (S.words[k]) { delete S.words[k]; toast("Retiré de tes mots"); } else { E.addWord(S, w, l.id, "saved", E.today()); toast("Ajouté à tes mots"); }
      save(); playerTick();
    },
    fav: function () { S.favs = S.favs || []; var id = ui.player.id, i = S.favs.indexOf(id); if (i === -1) { S.favs.push(id); toast("Leçon ajoutée aux favoris"); } else S.favs.splice(i, 1); save(); playerTick(); },
    say: function (v) { var l = E.lessonById(ui.oral.id); TTS.speak(v, { lang: l.lang, rate: 0.95 }); },
    "say-plain": function (v) { var p = v.split("|"); TTS.speak(p[0], { lang: p[1] || "en-US", rate: 0.9 }); },
    "open-oral": function (v) { openOral(v, false); },
    "oral-mode": function (v) { TTS.cancel(); STT.stop(); ui.oral = oralState(ui.oral.id, v); render(); },
    "oral-lesson": function (v) { TTS.cancel(); STT.stop(); ui.oral = oralState(v, ui.oral.mode); render(); },
    "rp-start": function () { var O = ui.oral; O.started = true; O.t0 = Date.now(); rpAdvance(); },
    "rp-restart": function () { var O = ui.oral; ui.oral = oralState(O.id, "role"); ui.oral.started = true; rpAdvance(); },
    "rp-help": function () { ui.oral.help = !ui.oral.help; render(); },
    "rp-send": function () { rpAnswer(ui.f.rp || "", false); },
    "rp-mic": function () {
      var O = ui.oral, l = E.lessonById(O.id);
      if (O.listening) { STT.stop(); return; }
      TTS.cancel(); O.listening = true; render();
      STT.listen(l.lang).then(function (alts) { O.listening = false; var ln = l.lines[O.pos]; var best = alts.slice().sort(function (a, b) { return E.scoreRoleplay(ln, b).pct - E.scoreRoleplay(ln, a).pct; })[0]; rpAnswer(best, true); })
        .catch(function (err) { O.listening = false; toast(micMessage(err)); render(); });
    },
    "rep-listen": function (v) { var O = ui.oral, l = E.lessonById(O.id); TTS.speak(O.targets[O.t].en, { lang: l.lang, rate: Number(v) }); },
    "rep-mic": function () {
      var O = ui.oral, l = E.lessonById(O.id);
      if (O.listening) { STT.stop(); return; }
      TTS.cancel(); O.listening = true; render();
      STT.listen(l.lang).then(function (alts) {
        O.listening = false;
        var target = O.targets[O.t].en;
        var best = null, heard = "";
        alts.forEach(function (a) { var r = E.scoreRepeat(target, a); if (!best || r.pct > best.pct) { best = r; heard = a; } });
        best.heard = heard;
        O.result = best; O.attempts.push(best.pct);
        E.logDay(S, E.today(), "oral", 0.5);
        if (best.pct < 70) E.addConcept(S, "prononciation", O.id, E.today());
        save(); render();
      }).catch(function (err) { O.listening = false; toast(micMessage(err)); render(); });
    },
    "rep-next": function () {
      var O = ui.oral;
      if (O.attempts.length) E.recordResult(S, O.id, "repeat", Math.max.apply(null, O.attempts), E.today());
      save();
      if (O.t < O.targets.length - 1) { O.t++; O.result = null; O.attempts = []; render(); window.scrollTo(0, 0); }
      else { toast("Répétition terminée"); go(ui.player && ui.player.id === O.id ? "player" : "home"); }
    },
    "start-ex": function (v) { startEx(v); },
    "close-ex": function () { if (ui.player && ui.player.id === ui.ex.id) go("player"); else go("home"); },
    "ex-pick": function (v) { var X = ui.ex, t = X.steps[X.i].type, p = v.split(":"); X.ans[t] = X.ans[t] || []; X.ans[t][Number(p[0])] = Number(p[1]); render(); },
    "ex-check": function () { exCheck(); },
    "ex-next": function () { exNext(); },
    "ex-say": function (v) { var l = E.lessonById(ui.ex.id); TTS.speak(l.exercises.dictation.en, { lang: l.lang, rate: Number(v) }); },
    "ex-say-oral": function () { var l = E.lessonById(ui.ex.id); TTS.speak(l.exercises.oral.en, { lang: l.lang, rate: 0.9 }); },
    "ex-skip": function () { var X = ui.ex; X.res[X.i] = { skipped: true, pct: 0 }; render(); },
    "ex-mic": function () {
      var X = ui.ex, l = E.lessonById(X.id);
      if (ui.dictating) { STT.stop(); return; }
      TTS.cancel(); ui.dictating = "oral"; render();
      STT.listen(l.lang).then(function (alts) {
        ui.dictating = null;
        var best = null, heard = "";
        alts.forEach(function (a) { var r = E.scoreRepeat(l.exercises.oral.en, a); if (!best || r.pct > best.pct) { best = r; heard = a; } });
        best.heard = heard;
        X.res[X.i] = best;
        E.recordResult(S, X.id, "oral", best.pct, E.today());
        E.logDay(S, E.today(), "oral", 0.5);
        if (best.pct < 70) noteConcept(X, "prononciation");
        save(); render();
      }).catch(function (err) { ui.dictating = null; toast(micMessage(err)); render(); });
    },
    dictate: function (v) {
      if (ui.dictating) { STT.stop(); return; }
      var lang = ui.ex ? E.lessonById(ui.ex.id).lang : "en-US";
      ui.dictating = v; render();
      STT.listen(lang).then(function (alts) { ui.dictating = null; ui.f[v] = alts[0]; render(); }).catch(function (err) { ui.dictating = null; toast(micMessage(err)); render(); });
    },
    "open-coach": function (v) { openCoach(v); },
    "coach-send": function () { coachSend(ui.f.coach || "", false); },
    "coach-quick": function (v) { coachQuick(v); },
    "coach-mic": function () {
      if (ui.dictating) { STT.stop(); return; }
      ui.dictating = "coach";
      toast("Parle en français ou en anglais");
      STT.listen("fr-FR").then(function (alts) { ui.dictating = null; coachSend(alts[0], true); }).catch(function (err) { ui.dictating = null; toast(micMessage(err)); });
    },
    "plan-add": function (v) {
      var K = ui.coach, m = K.msgs[Number(v)], today = E.today();
      m.plan.forEach(function (s, k) { S.plan.push({ id: "p" + Date.now() + k, due: whenToDate(s.when, today), when: s.when, title: s.title, detail: s.detail, minutes: s.minutes || 2, lesson: K.id, done: false }); });
      m.added = true; save(); toast("Plan ajouté à ton suivi"); render();
    },
    "coach-finish": function () { coachFinish(); },
    "open-bilan": function (v) {
      var b = S.bilans[Number(v)];
      if (!b) return;
      ui.coach = { id: b.lesson, msgs: b.msgs.map(function (m) { return { r: m.r, t: m.t, plan: m.plan }; }), readOnly: true, date: b.d, sent: 0 };
      go("coach");
    },
    "suivi-view": function (v) { ui.suivi = v; render(); },
    "start-review": function () { startReview(); },
    "rev-reveal": function () { ui.review.reveal = true; render(); },
    "rev-mark": function (v) { reviewMark(v === "1"); },
    "rev-check": function () {
      var R = ui.review, it = R.queue[R.i], def = C.CONCEPTS[it.key], ans = ui.f.rev || "";
      if (!ans.trim()) { toast("Écris ta réponse d’abord."); return; }
      var ok = E.matchesAccepted(ans, def.retry.accept) || E.keyGroups(ans, def.retry.keys).ratio === 1;
      R.checked = { ok: ok }; render();
    },
    "rev-next": function () { reviewMark(ui.review.checked && ui.review.checked.ok); },
    "ask-del": function (v) { ui.confirm = "del:" + v; render(); },
    "del-word": function (v) { delete S.words[v]; ui.confirm = null; save(); toast("Mot supprimé"); render(); }
  };

  /* ---------- Démarrage ---------- */
  function boot() {
    TTS.load();
    document.addEventListener("click", function (e) {
      NV.unlock();
      var t = e.target.closest("[data-a]");
      if (!t || t.disabled) return;
      var fn = A[t.getAttribute("data-a")];
      if (fn) { e.preventDefault(); fn(t.getAttribute("data-v"), t, e); }
    });
    document.addEventListener("input", function (e) {
      var t = e.target;
      if (t.getAttribute("data-f")) {
        ui.f[t.getAttribute("data-f")] = t.value;
        if (t.getAttribute("data-live") === "lib") { ui.lib.q = t.value; var box = document.getElementById("lib-list"); if (box) box.innerHTML = libList(); }
      }
      if (t.getAttribute("data-a-input") === "volume" && ui.player) ui.player.volume = Number(t.value) / 100;
      if (t.getAttribute("data-yt") === "seek") { YTM.drag = true; var tt = document.getElementById("yt-time"); if (tt) tt.textContent = mmss(Number(t.value)) + " / " + (YTM.dur ? mmss(YTM.dur) : "–"); }
      if (t.getAttribute("data-yt") === "vol" && ui.player) { ui.player.ytVol = Number(t.value); YTM.call("setVolume", Number(t.value)); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || e.shiftKey) return;
      var id = e.target && e.target.id;
      if (id === "f-coach") { e.preventDefault(); A["coach-send"](); }
      else if (id === "f-rp") { e.preventDefault(); A["rp-send"](); }
      else if (id === "f-heard") { e.preventDefault(); A["add-heard"](); }
      else if (id === "f-rev") { e.preventDefault(); if (ui.review && !ui.review.checked) A["rev-check"](); }
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { YTM.flush(); if (ui.oral && ui.oral.sh && (ui.oral.sh.phase === "listen" || ui.oral.sh.phase === "turn")) { shStop(ui.oral.sh); ui.oral.sh.phase = "paused"; } }
      if (document.hidden && ui.player && ui.player.playing) { pausePlayer(); playerTick(); }
    });
    document.addEventListener("change", function (e) {
      var t = e.target;
      if (t.getAttribute("data-yt") === "seek") {
        var v = Number(t.value); YTM.drag = false; YTM.call("seekTo", v, true); YTM.cur = v;
        var ys = ui.player && ui.player.ysh; if (ys) { ys.start = v; ys.end = v + ys.len; ys.phase = "play"; }
      }
    });
    window.addEventListener("online", function () { if (ui.route === "player" && ui.player && ui.player.tab === "video" && !YTM.player) { render(); if (!IN_CLAUDE) YTM.mount(ui.player.id); } });
    render();
    AI.init().then(function () { if (["coach", "home", "watch", "oral"].indexOf(ui.route) !== -1 && !document.activeElement.matches("input,textarea")) render(); });
    Cloud.init();
    if (!IN_CLAUDE && "serviceWorker" in navigator && location.protocol === "https:") {
      try { navigator.serviceWorker.register("sw.js").catch(function () { }); } catch (e) { }
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
