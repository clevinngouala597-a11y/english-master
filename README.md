# English Master

App iPhone pour apprendre l'anglais : leçons vidéo adaptées à ton niveau, oral avec le micro, exercices corrigés, bilan avec un coach à la fin de chaque module, suivi calé sur l'alternance, et séries ou films conseillés par niveau et par thème.

Premier module : **English Video Coach**.

## Où en est le projet

- [x] Maquettes des 9 écrans (thème noir)
- [ ] Bibliothèque A1 validée : 6 leçons du quotidien
- [ ] Lecteur avec sous-titres interactifs EN / FR
- [ ] Oral : jeu de rôle et répétition de phrases
- [ ] Exercices et corrections sauvegardées
- [ ] Bilan avec le coach en fin de module
- [ ] Suivi par périodes et révisions espacées
- [ ] Séries et films par niveau et par thème
- [ ] Mise en ligne sur GitHub Pages

## Les écrans

1. **Accueil** : leçon du jour avec la raison du choix, conseil du coach, oral du jour, compétences.
2. **Bibliothèque** : leçons par niveau (A1 à B2) et par catégorie.
3. **Séries & films** : vrais titres classés par niveau et par thème, avec une méthode pour regarder.
4. **Lecteur** : voix, vitesse, réécoute d'une phrase, sous-titres cliquables, fiche mot.
5. **Oral** : jeu de rôle (tu réponds à voix haute) et répétition avec score mot par mot.
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

| | Version Claude | Version GitHub Pages |
|---|---|---|
| Coach et corrections libres | Claude | Conseils préparés, corrections automatiques |
| Sauvegarde | Liée au compte | Sur l'iPhone (navigateur) |
| Voix et micro | Oui | Oui |
| Accès | Lien claude.ai | Lien github.io, hors ligne possible |

## Règles de contenu

- Aucune vidéo ni aucun lien inventé. Une ressource indisponible est signalée clairement.
- Les leçons sont écrites pour l'app et lues par la voix de synthèse de l'iPhone.
- Les séries et films sont de vrais titres. L'app ne les diffuse pas : elle indique où les trouver.
- Aucun sous-titre récupéré sur une plateforme qui l'interdit.

## Technique

- Page web sans serveur : HTML, CSS, JavaScript.
- Voix : `speechSynthesis` (Web Speech API). Micro : reconnaissance vocale de Safari.
- Données : `localStorage` / IndexedDB sur l'appareil.

## Documents

- [Cahier des charges](docs/cahier-des-charges.md)
- [Design](docs/design.md)
