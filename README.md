# slackbot

### A quoi sert le bot

Le bot sert à synthétiser une conversation entre plusieurs personnes sous forme d'un arbre dont les noeuds reprennent les grandes idées.

### Utilisation du bot
Il est nécessaire d'installer Node.js pour l'utilisation du bot ainsi que différentes librairies nécessaire à son fonctionnement.

Pour faire fonctionner le bot il est aussi nécessaire de changer le token de celui ci, il est donc nécessaire de créer un nouveau token pour un slack bot.

Pour lancer le bot : se déplacer dans le répèrtoire courant des fichiers du bot et taper "node next.js"


## comment lancer le bot
node next.js

## fonctions présentes
add : ajoute une racine et change la racine comme étant sa branche
#### add [nom de branche]
addCurrent : ajoute une branche à la branche dont le nom est donné
#### addCurrent [nom de la branche existante]^ [nouveau nom de branche]
afficher : affiche toutes les branches sous la forme "id, idParent (nom du parent), nom"
#### afficher
