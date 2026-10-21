"""Parcours complet d'English Master dans un navigateur (taille iPhone).
Voix et micro simulés pour pouvoir tester sans haut-parleur ni micro.
Usage : python3 test/e2e.py [url] [dossier_captures]"""
import json, sys, os
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8765/index.html"
OUT = sys.argv[2] if len(sys.argv) > 2 else "/tmp/em-shots"
os.makedirs(OUT, exist_ok=True)

FAKE = """
window.__say = 'I would like a coffee please';
try {
  const ss = window.speechSynthesis;
  ss.speak = function (u) { setTimeout(function () { u.onend && u.onend(); }, 20); };
  ss.cancel = function () {};
} catch (e) {}
class FakeRec { start() { var self = this; setTimeout(function () { self.onresult && self.onresult({ results: [[{ transcript: window.__say }]] }); self.onend && self.onend(); }, 30); } stop() {} }
window.SpeechRecognition = FakeRec; window.webkitSpeechRecognition = FakeRec;
// Faux lecteur YouTube (le réseau de test n'atteint pas YouTube) : même API que YT.Player.
window.__ytErr = null;
window.YT = { Player: function (id, opts) {
  var el = document.getElementById(id), f = document.createElement("iframe"); f.id = id; el.replaceWith(f);
  var t = 0, st = -1, rate = 1, timer = null, self = this;
  function set(s) { st = s; opts.events.onStateChange && opts.events.onStateChange({ data: s }); }
  this.getAvailablePlaybackRates = function () { return [0.25, 0.5, 0.75, 1, 1.5, 2]; };
  this.getDuration = function () { return 60; };
  this.getCurrentTime = function () { return t; };
  this.playVideo = function () { clearInterval(timer); set(1); timer = setInterval(function () { t = Math.min(60, t + 2 * rate); if (t >= 60) { clearInterval(timer); set(0); } }, 100); };
  this.pauseVideo = function () { clearInterval(timer); set(2); };
  this.seekTo = function (x) { t = x; };
  this.setPlaybackRate = function (r) { rate = r; opts.events.onPlaybackRateChange && opts.events.onPlaybackRateChange({ data: r }); };
  this.setVolume = function () {};
  this.destroy = function () { clearInterval(timer); f.remove(); };
  setTimeout(function () { if (window.__ytErr) opts.events.onError({ data: window.__ytErr }); else opts.events.onReady({}); }, 50);
} };
"""

errors = []
def shot(page, name):
    page.screenshot(path=f"{OUT}/{name}.png", full_page=True)

def click(page, sel):
    page.locator(sel).first.click()
    page.wait_for_timeout(120)

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    ctx.add_init_script(FAKE)
    page = ctx.new_page()
    page.on("console", lambda m: errors.append("console: " + m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append("pageerror: " + str(e)))
    page.goto(URL)
    page.evaluate("localStorage.clear()")
    page.reload()
    page.wait_for_timeout(300)

    # 1. Premier lancement
    assert page.locator("text=Ton coach d’anglais").count() == 1, "onboarding absent"
    page.fill("#f-name", "Clevin")
    click(page, "[data-v='ptype:ecole']")
    page.fill("#f-pend", "2026-10-30")
    click(page, "[data-a='save-profile']")
    assert page.locator("text=Salut Clevin").count() == 1, "accueil absent"
    assert page.locator("text=Hello! Meeting someone").count() >= 1
    shot(page, "01-accueil")

    # 2. Bibliothèque, filtres, recherche
    click(page, "[data-a='nav'][data-v='library']")
    assert page.locator(".lesson-card").count() == 6
    click(page, "[data-a='lib-level'][data-v='B1']")
    assert page.locator("text=B1 : en préparation").count() == 1
    click(page, "[data-a='lib-level'][data-v='A1']")
    page.fill("#f-libq", "umbrella")
    page.wait_for_timeout(100)
    assert page.locator(".lesson-card").count() == 1, "recherche"
    page.fill("#f-libq", "")
    page.dispatch_event("#f-libq", "input")
    click(page, "[data-a='lib-cat'][data-v='maintenance']")
    assert page.locator("text=Aucune leçon validée").count() == 1
    click(page, "[data-a='lib-cat'][data-v='maintenance']")

    # 3. Séries et films
    click(page, "[data-a='go'][data-v='watch']")
    click(page, "[data-a='watch-level'][data-v='B1']")
    assert page.locator("text=How It’s Made").count() >= 1
    click(page, "[data-a='watch-theme'][data-v='Travail']")
    assert page.locator("text=Pas encore de titre vérifié").count() == 1
    click(page, "[data-a='watched']")
    page.fill("#f-heard", "Can I get a coffee to go?")
    click(page, "[data-a='add-heard']")
    shot(page, "02-series")

    # 4. Lecteur : lecture, mots, fiche, favoris
    click(page, "[data-a='nav'][data-v='home']")
    click(page, "[data-a='open-lesson']")
    assert page.locator(".stage").count() == 1
    click(page, "[data-a='play']")
    page.wait_for_timeout(9000)
    click(page, "[data-a='word']")
    assert page.locator(".wordcard").count() == 1
    click(page, "[data-a='save-word']")
    click(page, "[data-a='toggle-fr']")
    click(page, "[data-a='speed'][data-v='0.75']")
    click(page, "[data-a='goto-line'][data-v='3']")
    page.wait_for_timeout(300)
    shot(page, "03-lecteur")
    watched = page.evaluate("JSON.parse(localStorage.getItem('em.state.v1')).lessons.hello.watched")
    print("vue en entier :", watched)

    # 5. Exercices
    click(page, "[data-a='start-ex']")
    lesson = "hello"
    # compréhension : bonnes réponses 1,1
    click(page, "[data-a='ex-pick'][data-v='0:1']"); click(page, "[data-a='ex-pick'][data-v='1:1']")
    click(page, "[data-a='ex-check']"); assert page.locator("text=100 %").count() >= 1
    click(page, "[data-a='ex-next']")
    # QCM vocabulaire : 0, 1, 0 (dernière fausse)
    click(page, "[data-a='ex-pick'][data-v='0:0']"); click(page, "[data-a='ex-pick'][data-v='1:1']"); click(page, "[data-a='ex-pick'][data-v='2:0']")
    click(page, "[data-a='ex-check']"); assert page.locator("text=67 %").count() >= 1
    click(page, "[data-a='ex-next']")
    # trous
    page.fill("#f-gap0", "name"); page.fill("#f-gap1", "meat"); page.fill("#f-gap2", "from")
    click(page, "[data-a='ex-check']"); assert page.locator("text=Réponse : ").count() == 1
    click(page, "[data-a='ex-next']")
    # traduction
    page.fill("#f-tr", "I am from France and I live at Lyon")
    click(page, "[data-a='ex-check']")
    page.wait_for_timeout(200)
    assert page.locator("text=Réponse attendue").count() == 1
    shot(page, "04-traduction")
    click(page, "[data-a='ex-next']")
    # dictée
    click(page, "[data-a='ex-say'][data-v='1']")
    page.fill("#f-dic", "nice to meet you where are you from")
    click(page, "[data-a='ex-check']"); assert page.locator("text=100 %").count() >= 1
    click(page, "[data-a='ex-next']")
    # oral (micro simulé)
    page.evaluate("window.__say = 'nice to meet you to'")
    click(page, "[data-a='ex-mic']")
    page.wait_for_timeout(300)
    assert page.locator("text=Entendu").count() == 1
    click(page, "[data-a='ex-next']")
    # résumé
    page.fill("#f-sum", "Sam meets a student from France.")
    click(page, "[data-a='ex-check']")
    page.wait_for_timeout(200)
    click(page, "[data-a='ex-next']")
    # 6. Résultats
    assert page.locator("text=Détail des exercices").count() == 1
    shot(page, "05-resultats")
    st = json.loads(page.evaluate("localStorage.getItem('em.state.v1')"))
    print("scores :", st["lessons"]["hello"]["scores"])
    print("notions :", list(st["concepts"].keys()))

    # 7. Bilan avec le coach (conseils préparés hors claude.ai)
    click(page, "[data-a='open-coach']")
    assert page.locator("[data-a='coach-finish'][disabled]").count() == 1, "terminer doit être bloqué avant d'écrire"
    page.fill("#f-coach", "Je confonds meet et meat, et je traduis mot à mot.")
    click(page, "[data-a='coach-send']")
    page.wait_for_timeout(300)
    assert page.locator("h2:has-text('Ton plan')").count() == 1
    click(page, "[data-a='plan-add']")
    click(page, "[data-a='coach-quick'][data-v='20h']")
    shot(page, "06-coach")
    click(page, "[data-a='coach-finish']")

    # 8. Suivi
    assert page.locator("text=Tes périodes").count() == 1
    click(page, "[data-a='suivi-view'][data-v='mois']")
    shot(page, "07-suivi")
    st = json.loads(page.evaluate("localStorage.getItem('em.state.v1')"))
    print("créneau :", st["profile"]["slot"], "| bilans :", len(st["bilans"]), "| plan :", len(st["plan"]), "| jours :", st["days"])

    # 9. Révisions : on avance la date de révision à aujourd'hui
    page.evaluate("""() => { const s = JSON.parse(localStorage.getItem('em.state.v1')); const t = new Date(); const d = t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
      Object.values(s.concepts).forEach(c => c.next = d); Object.values(s.words).forEach(w => w.next = d); s.updatedAt = Date.now() + 1000; localStorage.setItem('em.state.v1', JSON.stringify(s)); }""")
    page.reload(); page.wait_for_timeout(300)
    click(page, "[data-a='start-review']")
    n = 0
    while n < 20 and page.locator("text=Révisions terminées").count() == 0:
        n += 1
        if page.locator("[data-a='rev-reveal']").count(): click(page, "[data-a='rev-reveal']"); click(page, "[data-a='rev-mark'][data-v='1']")
        elif page.locator("#f-rev").count(): page.fill("#f-rev", "I am from France"); click(page, "[data-a='rev-check']"); click(page, "[data-a='rev-next']")
        elif page.locator("[data-a='rev-mark'][data-v='1']").count(): click(page, "[data-a='rev-mark'][data-v='1']")
        else: break
    assert page.locator("text=Révisions terminées").count() == 1, "révisions"
    print("révisions faites :", n)

    # 10. Oral : jeu de rôle avec réponses écrites et au micro simulé
    click(page, "[data-a='go'][data-v='home']")
    click(page, "[data-a='nav'][data-v='oral']")
    click(page, "[data-a='oral-lesson'][data-v='cafe']")
    click(page, "[data-a='rp-start']")
    page.wait_for_timeout(400)
    turns = 0
    while turns < 6 and page.locator("text=Dialogue terminé").count() == 0:
        turns += 1
        if page.locator("#f-rp").count():
            if turns == 1:
                page.evaluate("window.__say = 'hello I want a coffee please'"); click(page, "[data-a='rp-mic']")
            else:
                page.fill("#f-rp", ["Small please, how much is it?", "Here you are, thanks", "You too"][min(turns - 2, 2)]); click(page, "[data-a='rp-send']")
        page.wait_for_timeout(500)
    assert page.locator("text=Dialogue terminé").count() == 1, "jeu de rôle"
    shot(page, "08-oral")
    click(page, "[data-a='oral-mode'][data-v='repeat']")
    page.evaluate("window.__say = 'hello I what like a coffee please'")
    click(page, "[data-a='rep-mic']"); page.wait_for_timeout(200)
    assert page.locator("text=86 %").count() >= 1, "répétition 86 %"
    assert page.locator("text=would ✗").count() == 1

    # 12. Vidéo YouTube : lecteur, contrôles, shadowing vidéo, suivi
    click(page, "[data-a='nav'][data-v='library']")
    assert page.locator("text=▶ YouTube").count() == 6, "pastilles YouTube"
    click(page, "[data-a='open-lesson'][data-v='supermarket']")
    click(page, "[data-a='player-tab'][data-v='video']")
    page.wait_for_timeout(400)
    assert page.locator("#yt-region iframe").count() == 1, "lecteur YouTube"
    page.evaluate("window.__ifr = document.querySelector('#yt-region iframe')")
    assert page.locator("text=English MD").count() >= 1
    click(page, "[data-a='yt-rate'][data-v='0.75']")
    click(page, "[data-a='ysh-toggle']")
    click(page, "[data-a='ysh-len'][data-v='4']")
    click(page, "[data-a='yt-play']")
    page.wait_for_timeout(1200)
    assert page.locator("text=À toi : répète le passage").count() == 1, "pause shadowing vidéo"
    assert page.evaluate("window.__ifr === document.querySelector('#yt-region iframe') && document.contains(window.__ifr)"), "l'iframe ne doit pas être rechargée"
    click(page, "[data-a='ysh-replay']"); page.wait_for_timeout(900)
    click(page, "[data-a='ysh-toggle']")
    click(page, "[data-a='yt-play']"); page.wait_for_timeout(5000)
    shot(page, "10-video")
    assert page.locator("#yt-pct:has-text('Vue en entier')").count() == 1, "vidéo vue en entier"
    page.fill("#f-vheard", "Can I have a bag, please?")
    click(page, "[data-a='add-vheard']")
    st = json.loads(page.evaluate("localStorage.getItem('em.state.v1')"))
    print("vidéo :", st["lessons"]["supermarket"]["video"], "| mots vidéo :", [w["en"] for w in st["words"].values() if w.get("source") == "video"])
    assert page.evaluate("window.__ifr === document.querySelector('#yt-region iframe')"), "iframe conservée après ajout"
    # vidéo bloquée par la chaîne
    click(page, "[data-a='player-tab'][data-v='lesson']")
    page.evaluate("window.__ytErr = 150")
    click(page, "[data-a='player-tab'][data-v='video']"); page.wait_for_timeout(400)
    assert page.locator("text=La chaîne n’autorise pas la lecture en dehors de YouTube.").count() == 1, "erreur 150"
    click(page, "[data-a='player-tab'][data-v='lesson']")
    page.evaluate("window.__ytErr = null")
    assert page.locator(".stage").count() == 1
    click(page, "[data-a='back-home']")
    assert page.locator("text=Récemment").count() == 1

    # 13. Shadowing sur une leçon, avec la voix notée
    click(page, "[data-a='nav'][data-v='oral']")
    click(page, "[data-a='oral-mode'][data-v='shadow']")
    click(page, "[data-a='oral-lesson'][data-v='weather']")
    click(page, "[data-a='oral-mode'][data-v='shadow']")
    click(page, "[data-a='sh-rounds'][data-v='1']")
    click(page, "[data-a='sh-mic']")
    page.evaluate("window.__say = 'lovely day isnt it'")
    click(page, "[data-a='sh-play']")
    page.wait_for_timeout(300)
    assert page.locator("text=À toi : répète !").count() == 1 or page.locator(".pill.blue").count() >= 1, "tour de parole"
    page.wait_for_timeout(1500)
    shot(page, "11-shadowing")
    for _ in range(10):
        if page.locator("text=Shadowing terminé").count(): break
        click(page, "[data-a='sh-next']")
    assert page.locator("text=Shadowing terminé").count() == 1, "fin du shadowing"
    click(page, "[data-a='sh-rate'][data-v='difficile']")
    st = json.loads(page.evaluate("localStorage.getItem('em.state.v1')"))
    print("shadowing :", [r for r in st["results"] if r["t"] == "shadow"], "| prononciation à revoir :", "prononciation" in st["concepts"])

    # 11. Réglages et accueil final
    click(page, "[data-a='nav'][data-v='home']")
    click(page, "[data-a='go'][data-v='settings']")
    click(page, "[data-a='set-f'][data-v='ptype:entreprise']")
    click(page, "[data-a='save-profile']")
    assert page.locator("text=Période entreprise").count() == 1
    shot(page, "09-accueil-fin")
    b.close()

print("\nErreurs navigateur :", errors if errors else "aucune")
print("PARCOURS OK")
