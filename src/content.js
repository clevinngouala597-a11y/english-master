/* English Master — contenu pédagogique.
   Leçons originales écrites pour l'app (niveau A1, anglais du quotidien).
   Aucune vidéo externe : chaque leçon est lue par la voix de synthèse de l'appareil. */
(function (root) {
  "use strict";

  var VALIDATED = "2026-10-20";

  var LESSONS = [
    {
      id: "hello",
      title: "Hello! Meeting someone",
      fr: "Se présenter, dire d’où on vient",
      description: "Deux personnes se rencontrent : prénom, ville, études.",
      level: "A1",
      categories: ["quotidien", "conversations"],
      themes: ["Quotidien"],
      accent: "UK",
      lang: "en-GB",
      icon: "chat",
      partner: "Sam",
      skillFocus: ["oral", "comprehension"],
      objectives: ["Te présenter en 3 phrases", "Demander à quelqu’un d’où il vient", "Dire ce que tu fais dans la vie"],
      lines: [
        { sp: "Sam", en: "Hi! I'm Sam. What's your name?", fr: "Salut ! Je suis Sam. Comment tu t’appelles ?", w: ["whats-your-name"] },
        { sp: "Toi", en: "Hello, Sam. My name is Alex.", fr: "Salut, Sam. Je m’appelle Alex.", w: [], keys: [["my name is", "i am", "im"]] },
        { sp: "Sam", en: "Nice to meet you. Where are you from?", fr: "Enchanté. Tu viens d’où ?", w: ["nice-to-meet-you", "where-are-you-from"] },
        { sp: "Toi", en: "Nice to meet you too. I'm from France. I live in Lyon.", fr: "Enchanté aussi. Je viens de France. J’habite à Lyon.", w: ["i-live-in"], keys: [["from"], ["live"]] },
        { sp: "Sam", en: "Cool! What do you do?", fr: "Cool ! Tu fais quoi dans la vie ?", w: ["what-do-you-do"] },
        { sp: "Toi", en: "I'm a student. I study maintenance.", fr: "Je suis étudiant. J’étudie la maintenance.", w: ["student"], keys: [["student", "study", "work"]] },
        { sp: "Sam", en: "Great. See you later!", fr: "Super. À plus tard !", w: ["see-you-later"] },
        { sp: "Toi", en: "Bye, see you!", fr: "Salut, à plus !", w: [], keys: [["bye", "see you"]] }
      ],
      vocab: [
        { key: "whats-your-name", en: "What's your name?", fr: "Comment tu t’appelles ?", ipa: "/wɒts jɔː neɪm/", ex: "Hi! What's your name?", exFr: "Salut ! Comment tu t’appelles ?" },
        { key: "nice-to-meet-you", en: "Nice to meet you", fr: "Enchanté", ipa: "/naɪs tə miːt juː/", ex: "Nice to meet you, Sam.", exFr: "Enchanté, Sam." },
        { key: "where-are-you-from", en: "Where are you from?", fr: "Tu viens d’où ?", ipa: "/weər ɑː juː frɒm/", ex: "Where are you from? I'm from France.", exFr: "Tu viens d’où ? Je viens de France." },
        { key: "i-live-in", en: "I live in…", fr: "J’habite à…", ipa: "/aɪ lɪv ɪn/", ex: "I live in Lyon.", exFr: "J’habite à Lyon." },
        { key: "what-do-you-do", en: "What do you do?", fr: "Tu fais quoi dans la vie ?", ipa: "/wɒt də juː duː/", ex: "What do you do? I'm a student.", exFr: "Tu fais quoi dans la vie ? Je suis étudiant." },
        { key: "student", en: "a student", fr: "un étudiant, une étudiante", ipa: "/ˈstjuːdnt/", ex: "I'm a student in Lyon.", exFr: "Je suis étudiant à Lyon." },
        { key: "see-you-later", en: "See you later", fr: "À plus tard", ipa: "/siː juː ˈleɪtə/", ex: "Bye! See you later!", exFr: "Salut ! À plus tard !" }
      ],
      exercises: {
        comprehension: [
          { q: "Où habite la personne qui répond à Sam ?", options: ["À Londres", "À Lyon", "À Paris"], answer: 1 },
          { q: "Que dit Sam à la fin ?", options: ["Bonne nuit", "À plus tard", "Merci beaucoup"], answer: 1 }
        ],
        vocab: [
          { q: "« Nice to meet you » veut dire…", options: ["Enchanté", "Bonne journée", "À bientôt"], answer: 0, word: "nice-to-meet-you" },
          { q: "« Where are you from? » veut dire…", options: ["Où vas-tu ?", "Tu viens d’où ?", "Où habites-tu ?"], answer: 1, word: "where-are-you-from" },
          { q: "« I live in Lyon » veut dire…", options: ["J’aime Lyon", "Je pars à Lyon", "J’habite à Lyon"], answer: 2, word: "i-live-in" }
        ],
        gaps: [
          { text: "Hi! I'm Sam. What's your ___?", accept: ["name"] },
          { text: "Nice to ___ you.", accept: ["meet"] },
          { text: "I'm ___ France.", accept: ["from"] }
        ],
        translation: { fr: "Je viens de France et j’habite à Lyon.", show: "I'm from France and I live in Lyon.", accept: ["i am from france and i live in lyon", "i come from france and i live in lyon"], keys: [["from france"], ["live in lyon"]], concept: "se-presenter" },
        dictation: { en: "Nice to meet you. Where are you from?" },
        oral: { en: "Nice to meet you too." },
        summary: { prompt: "En une ou deux phrases en anglais : qui sont les deux personnes ?", keys: [["sam"], ["france", "lyon"], ["student"]], model: "Sam meets a student from France. The student lives in Lyon." }
      }
    },
    {
      id: "cafe",
      title: "At the café",
      fr: "Commander une boisson, demander le prix",
      description: "Au comptoir : commander poliment, choisir la taille, payer.",
      level: "A1",
      categories: ["quotidien", "conversations"],
      themes: ["Quotidien", "Café"],
      accent: "US",
      lang: "en-US",
      icon: "cup",
      partner: "Barista",
      skillFocus: ["oral", "vocabulaire"],
      objectives: ["Commander poliment avec « I would like »", "Demander un prix", "Comprendre un prix annoncé"],
      lines: [
        { sp: "Barista", en: "Hi! What can I get you?", fr: "Bonjour ! Qu’est-ce que je vous sers ?", w: ["can-i-get"] },
        { sp: "Toi", en: "Hello. I would like a coffee, please.", fr: "Bonjour. Je voudrais un café, s’il vous plaît.", w: ["would-like", "please"], keys: [["would like", "can i have", "can i get"], ["coffee", "tea", "latte"]] },
        { sp: "Barista", en: "Small or large?", fr: "Petit ou grand ?", w: ["small-large"] },
        { sp: "Toi", en: "Small, please. How much is it?", fr: "Petit, s’il vous plaît. C’est combien ?", w: ["how-much"], keys: [["small", "large"], ["how much"]] },
        { sp: "Barista", en: "That's two fifty.", fr: "Ça fait 2,50 (deux cinquante).", w: ["two-fifty"] },
        { sp: "Toi", en: "Here you are. Thank you!", fr: "Voilà. Merci !", w: ["here-you-are"], keys: [["here you are", "thank"]] },
        { sp: "Barista", en: "Have a nice day!", fr: "Bonne journée !", w: ["nice-day"] },
        { sp: "Toi", en: "You too!", fr: "Vous aussi !", w: [], keys: [["you too", "thanks", "thank"]] }
      ],
      vocab: [
        { key: "can-i-get", en: "What can I get you?", fr: "Qu’est-ce que je vous sers ?", ipa: "/wɒt kən aɪ ɡet juː/", ex: "Hi! What can I get you?", exFr: "Bonjour ! Qu’est-ce que je vous sers ?" },
        { key: "would-like", en: "would like", fr: "voudrais (poli)", ipa: "/wʊd laɪk/", note: "Version polie de « want ». Le « l » de would ne se prononce pas.", ex: "I would like a tea, please.", exFr: "Je voudrais un thé, s’il vous plaît." },
        { key: "please", en: "please", fr: "s’il vous plaît", ipa: "/pliːz/", ex: "A coffee, please.", exFr: "Un café, s’il vous plaît." },
        { key: "small-large", en: "small / large", fr: "petit / grand", ipa: "/smɔːl/ /lɑːrdʒ/", ex: "A large coffee, please.", exFr: "Un grand café, s’il vous plaît." },
        { key: "how-much", en: "How much is it?", fr: "C’est combien ?", ipa: "/haʊ mʌtʃ ɪz ɪt/", ex: "How much is the coffee?", exFr: "Combien coûte le café ?" },
        { key: "two-fifty", en: "two fifty", fr: "2,50", note: "Pour un prix, on lit souvent les deux nombres : two fifty = 2,50.", ex: "That's two fifty.", exFr: "Ça fait 2,50." },
        { key: "here-you-are", en: "Here you are", fr: "Voilà (en tendant quelque chose)", ipa: "/hɪər juː ɑː/", ex: "Here you are. Thank you!", exFr: "Voilà. Merci !" },
        { key: "nice-day", en: "Have a nice day!", fr: "Bonne journée !", ex: "Thanks, have a nice day!", exFr: "Merci, bonne journée !" }
      ],
      exercises: {
        comprehension: [
          { q: "Quelle taille de café le client choisit-il ?", options: ["Petit", "Grand", "Moyen"], answer: 0 },
          { q: "Combien coûte le café ?", options: ["2,15", "2,50", "5,20"], answer: 1 }
        ],
        vocab: [
          { q: "« I would like » veut dire…", options: ["Je voudrais", "J’aimais", "Je vais aimer"], answer: 0, word: "would-like" },
          { q: "« How much is it? » veut dire…", options: ["C’est combien ?", "Il y en a combien ?", "Il est quelle heure ?"], answer: 0, word: "how-much" },
          { q: "« Here you are » veut dire…", options: ["Tu es là", "Voilà", "Viens ici"], answer: 1, word: "here-you-are" }
        ],
        gaps: [
          { text: "Hello. I would ___ a coffee, please.", accept: ["like"] },
          { text: "Small or ___?", accept: ["large"] },
          { text: "How ___ is it?", accept: ["much"] }
        ],
        translation: { fr: "Je voudrais un thé, s’il vous plaît.", show: "I would like a tea, please.", accept: ["i would like a tea please", "i would like some tea please", "i would like a cup of tea please"], keys: [["would like"], ["tea"], ["please"]], concept: "would-like" },
        dictation: { en: "Small, please. How much is it?" },
        oral: { en: "I would like a coffee, please." },
        summary: { prompt: "En une ou deux phrases en anglais : que fait le client ?", keys: [["coffee"], ["small"], ["two fifty", "2 50", "pays", "pay"]], model: "The customer orders a small coffee and pays two fifty." }
      }
    },
    {
      id: "routine",
      title: "My daily routine",
      fr: "Raconter sa journée, les heures",
      description: "Lever, transport, travail, soirée : la journée en phrases simples.",
      level: "A1",
      categories: ["quotidien", "conversations"],
      themes: ["Quotidien"],
      accent: "US",
      lang: "en-US",
      icon: "clock",
      partner: "Mia",
      skillFocus: ["ecriture", "vocabulaire"],
      objectives: ["Raconter ta journée au présent simple", "Dire une heure (half past four)", "Parler de tes activités du soir"],
      lines: [
        { sp: "Mia", en: "What time do you get up?", fr: "Tu te lèves à quelle heure ?", w: ["get-up"] },
        { sp: "Toi", en: "I get up at seven.", fr: "Je me lève à sept heures.", w: [], keys: [["get up", "wake up"], ["seven", "six", "eight"]] },
        { sp: "Mia", en: "And then?", fr: "Et ensuite ?", w: [] },
        { sp: "Toi", en: "I have breakfast and I take the bus.", fr: "Je prends mon petit-déjeuner et je prends le bus.", w: ["have-breakfast", "take-the-bus"], keys: [["breakfast"], ["bus", "car", "train"]] },
        { sp: "Mia", en: "When do you start work?", fr: "Tu commences le travail quand ?", w: ["start-finish"] },
        { sp: "Toi", en: "I start at eight and I finish at half past four.", fr: "Je commence à huit heures et je finis à seize heures trente.", w: ["half-past"], keys: [["start"], ["finish"]] },
        { sp: "Mia", en: "What do you do in the evening?", fr: "Tu fais quoi le soir ?", w: ["in-the-evening"] },
        { sp: "Toi", en: "I go to the gym and I watch a series.", fr: "Je vais à la salle et je regarde une série.", w: ["go-to-the-gym"], keys: [["gym", "series", "watch", "play"]] }
      ],
      vocab: [
        { key: "get-up", en: "get up", fr: "se lever", ipa: "/ɡet ʌp/", ex: "I get up at seven.", exFr: "Je me lève à sept heures." },
        { key: "have-breakfast", en: "have breakfast", fr: "prendre le petit-déjeuner", ipa: "/hæv ˈbrekfəst/", ex: "I have breakfast at home.", exFr: "Je prends le petit-déjeuner à la maison." },
        { key: "take-the-bus", en: "take the bus", fr: "prendre le bus", ex: "I take the bus to work.", exFr: "Je prends le bus pour aller au travail." },
        { key: "start-finish", en: "start / finish", fr: "commencer / finir", ex: "I start at eight.", exFr: "Je commence à huit heures." },
        { key: "half-past", en: "half past four", fr: "quatre heures et demie (16 h 30)", note: "half past = et demie. On dit l’heure qui vient de passer.", ex: "I finish at half past four.", exFr: "Je finis à 16 h 30." },
        { key: "in-the-evening", en: "in the evening", fr: "le soir", ex: "I study in the evening.", exFr: "J’étudie le soir." },
        { key: "go-to-the-gym", en: "go to the gym", fr: "aller à la salle de sport", ex: "I go to the gym on Monday.", exFr: "Je vais à la salle le lundi." }
      ],
      exercises: {
        comprehension: [
          { q: "À quelle heure la personne se lève-t-elle ?", options: ["6 h", "7 h", "8 h"], answer: 1 },
          { q: "Que fait-elle le soir ?", options: ["Elle cuisine", "Elle va à la salle et regarde une série", "Elle lit un livre"], answer: 1 }
        ],
        vocab: [
          { q: "« I get up » veut dire…", options: ["Je me lève", "Je monte", "Je me couche"], answer: 0, word: "get-up" },
          { q: "« half past four » veut dire…", options: ["4 h 15", "4 h 30", "4 h 45"], answer: 1, word: "half-past" },
          { q: "« in the evening » veut dire…", options: ["le matin", "l’après-midi", "le soir"], answer: 2, word: "in-the-evening" }
        ],
        gaps: [
          { text: "I get ___ at seven.", accept: ["up"] },
          { text: "I have breakfast and I ___ the bus.", accept: ["take"] },
          { text: "I start at eight and I ___ at half past four.", accept: ["finish"] }
        ],
        translation: { fr: "Je me lève à sept heures.", show: "I get up at seven.", accept: ["i get up at seven", "i get up at seven o clock", "i wake up at seven", "i wake up at seven o clock"], keys: [["get up", "wake up"], ["seven"]], concept: "present-simple" },
        dictation: { en: "I go to the gym and I watch a series." },
        oral: { en: "I get up at seven." },
        summary: { prompt: "En une ou deux phrases en anglais : raconte la journée de la personne.", keys: [["get up", "gets up", "wakes up", "wake up"], ["bus"], ["gym", "series", "evening"]], model: "The person gets up at seven, takes the bus and goes to the gym in the evening." }
      }
    },
    {
      id: "directions",
      title: "Asking for directions",
      fr: "Demander et comprendre un chemin",
      description: "Dans la rue : trouver la gare, comprendre gauche, droite, en face.",
      level: "A1",
      categories: ["quotidien", "conversations"],
      themes: ["Quotidien"],
      accent: "UK",
      lang: "en-GB",
      icon: "sign",
      partner: "Passante",
      skillFocus: ["comprehension", "vocabulaire"],
      objectives: ["Demander où se trouve un lieu", "Comprendre tout droit, à gauche, en face", "Remercier et répondre à un merci"],
      lines: [
        { sp: "Toi", en: "Excuse me, where is the station, please?", fr: "Excusez-moi, où est la gare, s’il vous plaît ?", w: ["excuse-me"], keys: [["where"], ["station"]] },
        { sp: "Passante", en: "Go straight on, then turn left.", fr: "Allez tout droit, puis tournez à gauche.", w: ["straight-on", "turn-left"] },
        { sp: "Toi", en: "Is it far?", fr: "C’est loin ?", w: ["far"], keys: [["far"]] },
        { sp: "Passante", en: "No, it's about five minutes on foot.", fr: "Non, c’est à environ cinq minutes à pied.", w: ["on-foot"] },
        { sp: "Toi", en: "Is it next to the bank?", fr: "C’est à côté de la banque ?", w: ["next-to"], keys: [["next to", "near"], ["bank"]] },
        { sp: "Passante", en: "Yes, it's opposite the bank.", fr: "Oui, c’est en face de la banque.", w: ["opposite"] },
        { sp: "Toi", en: "Thank you very much.", fr: "Merci beaucoup.", w: [], keys: [["thank"]] },
        { sp: "Passante", en: "You're welcome.", fr: "De rien.", w: ["youre-welcome"] }
      ],
      vocab: [
        { key: "excuse-me", en: "Excuse me", fr: "Excusez-moi (pour aborder quelqu’un)", ipa: "/ɪkˈskjuːz miː/", ex: "Excuse me, where is the bank?", exFr: "Excusez-moi, où est la banque ?" },
        { key: "straight-on", en: "go straight on", fr: "aller tout droit", ex: "Go straight on for two minutes.", exFr: "Allez tout droit pendant deux minutes." },
        { key: "turn-left", en: "turn left / turn right", fr: "tourner à gauche / à droite", ex: "Turn right at the bank.", exFr: "Tournez à droite à la banque." },
        { key: "far", en: "far", fr: "loin", ex: "Is the station far?", exFr: "La gare est loin ?" },
        { key: "on-foot", en: "on foot", fr: "à pied", ex: "It's ten minutes on foot.", exFr: "C’est à dix minutes à pied." },
        { key: "next-to", en: "next to", fr: "à côté de", ex: "The café is next to the bank.", exFr: "Le café est à côté de la banque." },
        { key: "opposite", en: "opposite", fr: "en face de", ipa: "/ˈɒpəzɪt/", ex: "It's opposite the station.", exFr: "C’est en face de la gare." },
        { key: "youre-welcome", en: "You're welcome", fr: "De rien", ex: "Thanks! — You're welcome.", exFr: "Merci ! — De rien." }
      ],
      exercises: {
        comprehension: [
          { q: "Où veut aller la personne ?", options: ["À la banque", "À la gare", "Au parc"], answer: 1 },
          { q: "La gare est…", options: ["à côté de la banque", "en face de la banque", "derrière la banque"], answer: 1 }
        ],
        vocab: [
          { q: "« Go straight on » veut dire…", options: ["Allez tout droit", "Tournez à droite", "Arrêtez-vous"], answer: 0, word: "straight-on" },
          { q: "« far » veut dire…", options: ["près", "loin", "rapide"], answer: 1, word: "far" },
          { q: "« opposite » veut dire…", options: ["à côté de", "en face de", "entre"], answer: 1, word: "opposite" }
        ],
        gaps: [
          { text: "Go straight on, then turn ___.", accept: ["left"] },
          { text: "It's about five minutes on ___.", accept: ["foot"] },
          { text: "You're ___.", accept: ["welcome"] }
        ],
        translation: { fr: "Tournez à gauche, puis allez tout droit.", show: "Turn left, then go straight on.", accept: ["turn left then go straight on", "turn left and then go straight on", "turn left then go straight", "turn left and go straight on", "turn left then go straight ahead", "turn left and then go straight ahead"], keys: [["turn left"], ["straight"]], concept: "directions" },
        dictation: { en: "Excuse me, where is the station, please?" },
        oral: { en: "Is it far?" },
        summary: { prompt: "En une ou deux phrases en anglais : explique où est la gare.", keys: [["station"], ["opposite", "next to"], ["bank"], ["five minutes", "on foot", "walk"]], model: "The station is opposite the bank, about five minutes on foot." }
      }
    },
    {
      id: "supermarket",
      title: "At the supermarket",
      fr: "Prix, quantités, nombres",
      description: "Trouver un rayon, demander un prix, payer à la caisse.",
      level: "A1",
      categories: ["quotidien"],
      themes: ["Quotidien"],
      accent: "US",
      lang: "en-US",
      icon: "basket",
      partner: "Employé",
      skillFocus: ["comprehension", "ecriture"],
      objectives: ["Demander où sont des produits (where are)", "Comprendre un prix au kilo", "Payer : cash or card"],
      lines: [
        { sp: "Toi", en: "Excuse me, where are the eggs?", fr: "Excusez-moi, où sont les œufs ?", w: ["where-are"], keys: [["where are", "where is"], ["eggs"]] },
        { sp: "Employé", en: "They're in aisle three, next to the milk.", fr: "Ils sont au rayon trois, à côté du lait.", w: ["aisle"] },
        { sp: "Toi", en: "Thanks. How much are the apples?", fr: "Merci. Combien coûtent les pommes ?", w: ["how-much-are"], keys: [["how much"], ["apples"]] },
        { sp: "Employé", en: "They're one ninety-nine a kilo.", fr: "Elles sont à 1,99 le kilo.", w: ["a-kilo"] },
        { sp: "Toi", en: "OK, I'll take two kilos.", fr: "D’accord, j’en prends deux kilos.", w: ["ill-take"], keys: [["take", "two kilos", "2 kilos"]] },
        { sp: "Caissière", en: "That's six twenty, please. Cash or card?", fr: "Ça fait 6,20, s’il vous plaît. Espèces ou carte ?", w: ["cash-or-card"] },
        { sp: "Toi", en: "Card, please.", fr: "Carte, s’il vous plaît.", w: [], keys: [["card", "cash"]] },
        { sp: "Caissière", en: "Do you need a bag?", fr: "Vous voulez un sac ?", w: ["a-bag"] },
        { sp: "Toi", en: "No, thanks.", fr: "Non, merci.", w: [], keys: [["no", "yes"]] }
      ],
      vocab: [
        { key: "where-are", en: "Where are…?", fr: "Où sont… ?", note: "Pluriel : where are the eggs, mais where is the milk.", ex: "Where are the apples?", exFr: "Où sont les pommes ?" },
        { key: "aisle", en: "aisle", fr: "rayon, allée", ipa: "/aɪl/", note: "Le « s » ne se prononce pas.", ex: "It's in aisle five.", exFr: "C’est au rayon cinq." },
        { key: "how-much-are", en: "How much are…?", fr: "Combien coûtent… ?", ex: "How much are the eggs?", exFr: "Combien coûtent les œufs ?" },
        { key: "a-kilo", en: "a kilo", fr: "le kilo", ex: "Two dollars a kilo.", exFr: "Deux dollars le kilo." },
        { key: "ill-take", en: "I'll take…", fr: "Je prends… (j’en prends)", ex: "I'll take this one.", exFr: "Je prends celui-ci." },
        { key: "cash-or-card", en: "Cash or card?", fr: "Espèces ou carte ?", ex: "Cash or card? — Card, please.", exFr: "Espèces ou carte ? — Carte, s’il vous plaît." },
        { key: "a-bag", en: "a bag", fr: "un sac", ex: "Do you need a bag?", exFr: "Vous voulez un sac ?" }
      ],
      exercises: {
        comprehension: [
          { q: "Où sont les œufs ?", options: ["Rayon 2, à côté du pain", "Rayon 3, à côté du lait", "Rayon 3, en face des pommes"], answer: 1 },
          { q: "Comment la personne paie-t-elle ?", options: ["En espèces", "Par carte", "Par chèque"], answer: 1 }
        ],
        vocab: [
          { q: "« How much are the apples? » veut dire…", options: ["Combien de pommes ?", "Combien coûtent les pommes ?", "Où sont les pommes ?"], answer: 1, word: "how-much-are" },
          { q: "« Cash or card? » veut dire…", options: ["Espèces ou carte ?", "Sac ou carton ?", "Ici ou à emporter ?"], answer: 0, word: "cash-or-card" },
          { q: "« I’ll take two kilos » veut dire…", options: ["J’en prends deux kilos", "Il en reste deux kilos", "J’ai deux kilos"], answer: 0, word: "ill-take" }
        ],
        gaps: [
          { text: "Excuse me, where ___ the eggs?", accept: ["are"] },
          { text: "They're one ninety-nine a ___.", accept: ["kilo"] },
          { text: "Cash or ___?", accept: ["card"] }
        ],
        translation: { fr: "Où sont les œufs, s’il vous plaît ?", show: "Where are the eggs, please?", accept: ["where are the eggs please", "excuse me where are the eggs please"], keys: [["where are"], ["eggs"]], concept: "pluriel-are" },
        dictation: { en: "How much are the apples?" },
        oral: { en: "Card, please." },
        summary: { prompt: "En une ou deux phrases en anglais : qu’est-ce que la personne achète ?", keys: [["eggs"], ["apples"], ["card"]], model: "The customer buys eggs and two kilos of apples and pays by card." }
      }
    },
    {
      id: "weather",
      title: "Talking about the weather",
      fr: "Parler de la météo, small talk",
      description: "Lancer une conversation avec le temps qu’il fait.",
      level: "A1",
      categories: ["quotidien", "conversations"],
      themes: ["Quotidien"],
      accent: "UK",
      lang: "en-GB",
      icon: "cloud",
      partner: "Ben",
      skillFocus: ["oral", "ecriture"],
      objectives: ["Décrire le temps (sunny, cold, rainy)", "Comparer hier et aujourd’hui", "Parler de demain avec « going to »"],
      lines: [
        { sp: "Ben", en: "Lovely day, isn't it?", fr: "Belle journée, n’est-ce pas ?", w: ["lovely"] },
        { sp: "Toi", en: "Yes, it's sunny and warm.", fr: "Oui, il fait beau et chaud.", w: ["sunny-warm"], keys: [["sunny", "warm", "nice", "hot"]] },
        { sp: "Ben", en: "It was cold and rainy yesterday.", fr: "Il faisait froid et il pleuvait hier.", w: ["cold-rainy", "yesterday"] },
        { sp: "Toi", en: "Yes, I hate the rain.", fr: "Oui, je déteste la pluie.", w: [], keys: [["rain"]] },
        { sp: "Ben", en: "What's the weather like tomorrow?", fr: "Quel temps fera-t-il demain ?", w: ["weather-like"] },
        { sp: "Toi", en: "It's going to be cloudy.", fr: "Il va faire nuageux.", w: ["going-to-be"], keys: [["going to", "will"], ["cloudy", "sunny", "rainy", "cold"]] },
        { sp: "Ben", en: "Oh no! Take an umbrella, then.", fr: "Oh non ! Prends un parapluie, alors.", w: ["umbrella"] },
        { sp: "Toi", en: "Good idea!", fr: "Bonne idée !", w: [], keys: [["good idea", "ok", "yes", "thanks"]] }
      ],
      vocab: [
        { key: "lovely", en: "lovely", fr: "très beau, agréable", ex: "What a lovely day!", exFr: "Quelle belle journée !" },
        { key: "sunny-warm", en: "sunny / warm", fr: "ensoleillé / doux, chaud", ex: "It's sunny and warm today.", exFr: "Il fait beau et doux aujourd’hui." },
        { key: "cold-rainy", en: "cold / rainy", fr: "froid / pluvieux", ex: "It's cold and rainy.", exFr: "Il fait froid et il pleut." },
        { key: "yesterday", en: "yesterday", fr: "hier", ex: "It was cold yesterday.", exFr: "Il faisait froid hier." },
        { key: "weather-like", en: "What's the weather like?", fr: "Quel temps fait-il ?", ex: "What's the weather like in Lyon?", exFr: "Quel temps fait-il à Lyon ?" },
        { key: "going-to-be", en: "It's going to be…", fr: "Il va faire…", ex: "It's going to be cold tomorrow.", exFr: "Il va faire froid demain." },
        { key: "umbrella", en: "an umbrella", fr: "un parapluie", ipa: "/ʌmˈbrelə/", ex: "Take an umbrella.", exFr: "Prends un parapluie." }
      ],
      exercises: {
        comprehension: [
          { q: "Quel temps fait-il aujourd’hui ?", options: ["Il pleut", "Il fait beau et chaud", "Il neige"], answer: 1 },
          { q: "Quel temps fera-t-il demain ?", options: ["Nuageux", "Ensoleillé", "Venteux"], answer: 0 }
        ],
        vocab: [
          { q: "« sunny » veut dire…", options: ["ensoleillé", "pluvieux", "nuageux"], answer: 0, word: "sunny-warm" },
          { q: "« yesterday » veut dire…", options: ["demain", "hier", "aujourd’hui"], answer: 1, word: "yesterday" },
          { q: "« an umbrella » veut dire…", options: ["un manteau", "un parapluie", "un chapeau"], answer: 1, word: "umbrella" }
        ],
        gaps: [
          { text: "Yes, it's sunny and ___.", accept: ["warm"] },
          { text: "It was cold and ___ yesterday.", accept: ["rainy"] },
          { text: "What's the weather ___ tomorrow?", accept: ["like"] }
        ],
        translation: { fr: "Il fait froid et il pleut.", show: "It's cold and rainy.", accept: ["it is cold and rainy", "it is cold and it is raining", "it is cold and raining", "it is cold and it is rainy"], keys: [["cold"], ["rain", "rainy", "raining"]], concept: "meteo" },
        dictation: { en: "Take an umbrella, then." },
        oral: { en: "It's going to be cloudy." },
        summary: { prompt: "En une ou deux phrases en anglais : compare le temps d’hier et d’aujourd’hui.", keys: [["sunny", "warm"], ["cold", "rainy", "rain"], ["yesterday"]], model: "Today it is sunny and warm, but yesterday it was cold and rainy." }
      }
    }
  ];

  /* Vraies vidéos YouTube, une par leçon. Pages vérifiées le 20/10/2026 ; l'intégration
     est contrôlée par le lecteur YouTube à chaque lecture (vidéo bloquée = message + lien). */
  var CHECKED = "2026-10-20";
  var VIDEOS = {
    hello: { id: "qk292kwyiXU", title: "Introducing yourself in English / A1 for beginners.", channel: "Learn English Online", level: "A1", accent: null, duration: null, subtitles: null, about: "Joao et Katerina se rencontrent dans l’ascenseur d’une école d’anglais, se présentent et parlent de leur pays." },
    cafe: { id: "ybDCTCJzx9w", title: "Ordering Coffee at a Café - BEGINNER - A1 A2 - English Conversation", channel: "Learn English with Relaxing Stories", level: "A1-A2", accent: null, duration: null, subtitles: null, about: "Un dialogue pour commander un café et une viennoiserie : taille, chaud ou froid, petite conversation polie." },
    routine: { id: "t0_x13V786g", title: "BEGINNER ENGLISH STORY ⏰ Jonny's Daily Routine ⏰ A1 / A2 / Level 1 | BRITISH ENGLISH WITH SUBTITLES", channel: "Lovely English Stories", level: "A1-A2", accent: "britannique", duration: null, subtitles: "Sous-titres anglais dans la vidéo", about: "Une histoire racontée lentement : la journée de Jonny, du réveil au soir." },
    directions: { id: "wpGQBanTAgc", title: "Asking for directions in London | English listening | Beginner | A1", channel: "Angličtina online - Chcem sa učiť", level: "A1", accent: null, duration: null, subtitles: null, about: "Une écoute A1 : demander son chemin dans les rues de Londres." },
    supermarket: { id: "1xHABEfV53g", title: "At the Supermarket | Supermarket Vocabulary & Dialogues | Beginner English for ESL Learners (A1)", channel: "English MD", level: "A1", accent: null, duration: 242, subtitles: null, about: "Vocabulaire du supermarché, quantités, rayons, demander de l’aide et payer à la caisse." },
    weather: { id: "40PRWD1-HWA", title: "Talking about WEATHER — Slow Beginner English (A1-A2)", channel: "Learn English with Camille", level: "A1-A2", accent: null, duration: null, subtitles: null, about: "Camille et Calvin parlent de la météo en anglais simple et lent." }
  };
  Object.keys(VIDEOS).forEach(function (k) {
    var v = VIDEOS[k];
    v.lang = "en";
    v.url = "https://www.youtube.com/watch?v=" + v.id;
    v.source = "YouTube";
    v.validation = { status: "page vérifiée", date: CHECKED };
  });

  LESSONS.forEach(function (l) {
    l.video = VIDEOS[l.id] || null;
    l.source = { type: "original", name: "English Master", note: "Leçon originale lue par la voix de synthèse de l’appareil" };
    l.subtitles = ["EN", "FR"];
    l.validation = { status: "validée", date: VALIDATED };
  });

  /* Notions fragiles : libellé, conseil du coach et question de reprise. */
  var CONCEPTS = {
    "would-like": {
      label: "would like (politesse)",
      advice: "Dis 5 fois « I would like a coffee, please » juste après la voix, sans lire. Demain, commande 3 choses de mémoire.",
      retry: { fr: "Je voudrais un thé, s’il vous plaît.", show: "I would like a tea, please.", accept: ["i would like a tea please", "i would like some tea please", "i would like a cup of tea please"], keys: [["would like"], ["tea"], ["please"]] }
    },
    "how-much": {
      label: "demander un prix (How much…?)",
      advice: "Entraîne-toi à demander le prix de 5 objets autour de toi : « How much is it? », « How much are they? ».",
      retry: { fr: "C’est combien ?", show: "How much is it?", accept: ["how much is it", "how much is this", "how much does it cost"], keys: [["how much"]] }
    },
    "prix": {
      label: "dire un prix",
      advice: "Lis à voix haute 5 prix sur un ticket de caisse à la façon anglaise : 2,50 = two fifty.",
      retry: { fr: "Ça fait trois cinquante.", show: "That's three fifty.", accept: ["that is three fifty", "it is three fifty", "three fifty"], keys: [["three fifty"]] }
    },
    "ponctuation": {
      label: "ponctuation (virgule avant please)",
      advice: "À l’écrit, mets une virgule avant « please » en fin de phrase : « A coffee, please. »",
      retry: null
    },
    "se-presenter": {
      label: "se présenter (I'm from, I live in)",
      advice: "Enregistre-toi en train de te présenter en 3 phrases, puis réécoute : nom, ville, ce que tu fais.",
      retry: { fr: "Je viens de France.", show: "I'm from France.", accept: ["i am from france", "i come from france"], keys: [["from france"]] }
    },
    "present-simple": {
      label: "présent simple (I get up, I take…)",
      advice: "Ce soir, raconte ta journée en 5 phrases au présent simple, à voix haute : I get up, I take, I start, I finish, I go.",
      retry: { fr: "Je me lève à sept heures.", show: "I get up at seven.", accept: ["i get up at seven", "i wake up at seven", "i get up at seven o clock"], keys: [["get up", "wake up"], ["seven"]] }
    },
    "heure": {
      label: "dire l’heure (half past)",
      advice: "Regarde l’heure 3 fois aujourd’hui et dis-la en anglais : half past four, quarter to six…",
      retry: { fr: "Je finis à seize heures trente.", show: "I finish at half past four.", accept: ["i finish at half past four", "i finish at four thirty"], keys: [["finish"], ["half past four", "four thirty"]] }
    },
    "directions": {
      label: "indiquer un chemin",
      advice: "Sur ton trajet, dis chaque virage en anglais : turn left, turn right, go straight on.",
      retry: { fr: "Tournez à gauche.", show: "Turn left.", accept: ["turn left"], keys: [["turn left"]] }
    },
    "prepositions-lieu": {
      label: "next to / opposite",
      advice: "Décris où sont 3 objets de ta chambre : next to the bed, opposite the door.",
      retry: { fr: "C’est en face de la banque.", show: "It's opposite the bank.", accept: ["it is opposite the bank"], keys: [["opposite"], ["bank"]] }
    },
    "pluriel-are": {
      label: "where are / how much are (pluriel)",
      advice: "Pluriel = are : where are the eggs, how much are the apples. Fais 5 phrases avec des objets au pluriel.",
      retry: { fr: "Où sont les œufs ?", show: "Where are the eggs?", accept: ["where are the eggs"], keys: [["where are"], ["eggs"]] }
    },
    "meteo": {
      label: "parler de la météo",
      advice: "Chaque matin, dis le temps qu’il fait en une phrase : It’s cold and cloudy today.",
      retry: { fr: "Il fait froid et il pleut.", show: "It's cold and rainy.", accept: ["it is cold and rainy", "it is cold and it is raining", "it is cold and raining"], keys: [["cold"], ["rain", "rainy", "raining"]] }
    },
    "prononciation": {
      label: "prononciation",
      advice: "Réécoute la phrase à 0,75×, puis répète-la juste après la voix en exagérant l’articulation.",
      retry: null
    },
    "vocabulaire": {
      label: "vocabulaire de la leçon",
      advice: "Revois les mots clés de la leçon avec la fiche mot : écoute, répète, puis cache la traduction.",
      retry: null
    },
    "comprehension": {
      label: "compréhension orale",
      advice: "Réécoute le dialogue sans la traduction, puis une fois avec. Arrête-toi sur chaque phrase que tu n’as pas comprise.",
      retry: null
    }
  };

  /* Conseils de prononciation par mot (utilisés à l'oral). */
  var PRONUNCIATION = {
    would: "« would » se dit /wʊd/ : une syllabe courte, le « l » est muet.",
    could: "« could » se dit /kʊd/ : le « l » est muet.",
    should: "« should » se dit /ʃʊd/ : le « l » est muet.",
    the: "« the » : langue entre les dents, comme un « z » soufflé.",
    this: "« this » : langue entre les dents pour le « th ».",
    that: "« that » : langue entre les dents pour le « th ».",
    thank: "« thank » : langue entre les dents, souffle sans voix.",
    thanks: "« thanks » : langue entre les dents, souffle sans voix.",
    three: "« three » : langue entre les dents, puis « ri ».",
    hello: "« hello » : le « h » se souffle, comme de la buée sur une vitre.",
    how: "« how » : le « h » se souffle.",
    here: "« here » : le « h » se souffle.",
    half: "« half » : le « h » se souffle et le « l » est muet : /hɑːf/.",
    hate: "« hate » : le « h » se souffle.",
    have: "« have » : le « h » se souffle.",
    walk: "« walk » : le « l » est muet : /wɔːk/.",
    aisle: "« aisle » se dit /aɪl/, comme « I’ll ».",
    far: "« far » : un « a » long et ouvert, le « r » à peine prononcé en anglais britannique.",
    card: "« card » : un « a » long, /kɑːd/.",
    coffee: "« coffee » : l’accent est sur la première syllabe : CO-ffee.",
    cloudy: "« cloudy » : « aou » comme dans « how », puis « di ».",
    going: "« going » : deux syllabes, GO-ing.",
    please: "« please » : un « i » long et un « z » à la fin.",
    meet: "« meet » : un « i » long.",
    up: "« up » : un « a » court, presque « eup ».",
    seven: "« seven » : accent sur la première syllabe, SE-ven.",
    station: "« station » : /ˈsteɪʃn/, « stéi-cheun ».",
    umbrella: "« umbrella » : accent au milieu, um-BRE-lla."
  };

  /* Séries et films : vrais titres, jamais diffusés par l'app. */
  var WATCH = [
    { title: "Peppa Pig", kind: "Série animée", meta: "≈ 5 min · accent britannique", level: "A1", themes: ["Quotidien"], note: "Phrases très courtes, l’image aide à tout comprendre.", how: "Un épisode par soir, sous-titres anglais, puis répète 2 répliques.", tile: "orange" },
    { title: "Extr@ English", kind: "Sitcom pour apprenants", meta: "≈ 25 min · accent britannique", level: "A1", themes: ["Quotidien"], note: "Créée pour apprendre : on parle lentement et on répète.", how: "Un épisode en deux fois, sous-titres anglais.", tile: "blue" },
    { title: "Bluey", kind: "Série animée", meta: "≈ 7 min · accent australien", level: "A2", themes: ["Quotidien"], note: "Vie de famille, phrases du quotidien, épisodes courts.", how: "Regarde un épisode deux fois de suite.", tile: "sky" },
    { title: "Paddington", kind: "Film · 2014", meta: "1 h 35 · accent britannique", level: "A2", themes: ["Quotidien", "Café"], note: "Formules polies partout : please, thank you, would you like…", how: "Les 10 premières minutes, sous-titres anglais, deux fois de suite.", tile: "blue", lesson: "cafe" },
    { title: "Friends", kind: "Série · 1994–2004", meta: "≈ 22 min · accent US", level: "B1", themes: ["Quotidien", "Café"], note: "Commandes et small talk au café Central Perk.", how: "Prends un épisode déjà vu en français, sous-titres anglais, pause et répète 3 répliques.", tile: "yellow", lesson: "cafe" },
    { title: "Modern Family", kind: "Série", meta: "≈ 22 min · accent US", level: "B1", themes: ["Quotidien"], note: "Famille, maison, conversations rapides mais claires.", how: "Une scène de 5 minutes, deux fois, sous-titres anglais.", tile: "lime" },
    { title: "How It’s Made", kind: "Documentaire", meta: "≈ 5 min par sujet", level: "B1", themes: ["Industrie"], note: "Machines, chaînes de production, vocabulaire technique.", how: "Un sujet par jour, note 3 mots techniques.", tile: "white" },
    { title: "The Office (US)", kind: "Série", meta: "≈ 22 min · accent US", level: "B2", themes: ["Travail"], note: "Vie de bureau, réunions, humour pince-sans-rire.", how: "Sous-titres anglais, et note les phrases de réunion.", tile: "orange" }
  ];

  var GOALS = [
    { key: "quotidien", label: "Anglais du quotidien" },
    { key: "pro", label: "Anglais professionnel" },
    { key: "maintenance", label: "Anglais technique (maintenance)" },
    { key: "toeic", label: "Préparation au TOEIC" }
  ];

  var CATEGORIES = [
    { key: "quotidien", label: "Quotidien" },
    { key: "conversations", label: "Conversations" },
    { key: "grammaire", label: "Grammaire" },
    { key: "prononciation", label: "Prononciation" },
    { key: "comprehension", label: "Compréhension" },
    { key: "pro", label: "Pro" },
    { key: "maintenance", label: "Maintenance" },
    { key: "toeic", label: "TOEIC" }
  ];

  var CONTENT = { LESSONS: LESSONS, CONCEPTS: CONCEPTS, PRONUNCIATION: PRONUNCIATION, WATCH: WATCH, GOALS: GOALS, CATEGORIES: CATEGORIES, LEVELS: ["A1", "A2", "B1", "B2"] };
  if (typeof module !== "undefined" && module.exports) module.exports = CONTENT;
  root.EM_CONTENT = CONTENT;
})(typeof window !== "undefined" ? window : globalThis);
