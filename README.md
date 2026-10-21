# English Master

App iPhone pour apprendre l'anglais : leçons vidéo adaptées à ton niveau, oral avec le micro, exercices corrigés, bilan avec un coach à la fin de chaque module, suivi calé sur l'alternance, et séries ou films conseillés par niveau et par thème.

Premier module : **English Video Coach**.

## Où en est le projet

- [x] Maquettes des 9 écrans (thème noir)
- [x] Bibliothèque A1 validée : 6 leçons du quotidien (Hello!, At the café, My daily routine, Asking for directions, At the supermarket, Talking about the weather)
- [x] Lecteur avec voix, vitesse, réécoute d’une phrase et sous-titres interactifs EN / FR
- [x] Oral : jeu de rôle et répétition notée mot par mot
- [x] 7 exercices par leçon, corrections sauvegardées, erreurs passées réutilisées
- [x] Bilan avec le coach en fin de module et plan ajouté au suivi
- [x] Suivi par périodes école / entreprise, régularité, évolution, révisions espacées
- [x] Séries et films par niveau et par thème
- [x] Une vraie vidéo YouTube par leçon A1 (lecteur intégré, vitesse, réécoute, suivi du visionnage)
- [x] Shadowing : sur le dialogue des leçons (texte, vitesse, répétitions, voix notée) et sur les vidéos (pause automatique par passage)
- [x] Choix de la voix anglaise dans les réglages (écoute avant de choisir, voix Premium en premier)
- [ ] Leçons A2, B1, B2
- [ ] Catégories Pro, Maintenance, TOEIC

**Ouvrir l’app sur iPhone :** https://clevinngouala597-a11y.github.io/english-master/ (dans Safari, puis Partager → Sur l’écran d’accueil).

## Les écrans

1. **Accueil** : leçon du jour avec la raison du choix, conseil du coach, oral du jour, compétences.
2. **Bibliothèque** : leçons par niveau (A1 à B2) et par catégorie.
3. **Séries & films** : vrais titres classés par niveau et par thème, avec une méthode pour regarder.
4. **Lecteur** : voix, vitesse, réécoute d'une phrase, sous-titres cliquables, fiche mot.
5. **Oral** : jeu de rôle, répétition notée mot par mot et shadowing.
6. **Exercice** : compréhension, QCM, trous, traduction, dictée, oral, résumé.
7. **Résultats** : score détaillé, erreurs retenues, effet sur les recommandations.
8. **Bilan avec le coach** : conversation de fin de module et plan concret.
9. **Suivi** : périodes école / entreprise, objectifs, régularité, révisions planifiées.

## La méthode

- **Juste au-dessus du niveau** : on comprend l'essentiel, on apprend le reste.
- **Parler, pas seulement lire** : shadowing (répéter juste après la voix) et jeu de rôle.
- **Rappel actif et révisions espacées** : chaque notion revient au jour 1, 3, 7 puis 14.
- **Maîtrise = résultats** : une leçon est maîtrisée à 80 % aux exercices, pas parce qu'elle a été regardée.
- **Bilan obligatoire** : chaque module se termine par un échange avec le coach.
- **Séries en VO** : sous-titres en anglais, passages courts revus deux fois.

## Deux versions

| | Version claude.ai | Version GitHub Pages |
|---|---|---|
| Coach et corrections libres | Claude | Conseils préparés, corrections automatiques |
| Oral au micro | Non (le micro est bloqué dans claude.ai) : réponses écrites | Oui, avec la reconnaissance vocale de Safari |
| Voix des leçons | Oui | Oui |
| Vidéos YouTube | Lien vers YouTube | Lecteur intégré + shadowing vidéo |
| Sauvegarde | Compte Claude + appareil | Navigateur de l’appareil |
| Hors ligne | Non | Oui, après une première ouverture |

## Règles de contenu

- Aucune vidéo ni aucun lien inventé. Une ressource indisponible est signalée clairement.
- Les leçons sont écrites pour l'app et lues par la voix de synthèse de l'iPhone.
- Les séries et films sont de vrais titres. L'app ne les diffuse pas : elle indique où les trouver.
- Aucun sous-titre récupéré sur une plateforme qui l'interdit.

## Technique

- Page web sans serveur : HTML, CSS, JavaScript.
- Voix : `speechSynthesis` (Web Speech API). Micro : reconnaissance vocale de Safari.
- Données : `localStorage` sur l’appareil, et base du compte dans la version claude.ai.
- Sources dans `src/` : `content.js` (leçons), `engine.js` (logique : scores, maîtrise, révisions, périodes, recommandations), `app.js` (écrans), `styles.css`.

## Construire et tester

```bash
node build.mjs              # génère index.html (GitHub Pages) et dist/artifact.html (claude.ai)
node test/engine.test.mjs   # tests de la logique
python3 test/e2e.py URL     # parcours complet dans un navigateur (Playwright)
```

## Documents

- [Cahier des charges](docs/cahier-des-charges.md)
- [Design](docs/design.md)
