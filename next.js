'use strict';
let Bot = require('./bot.js');

const bot = new Bot(
{
	token: 'xoxb-350804903105-363248128663-OVSKPjvAQgwdTFNghF1ngV5C',
	autoReconnect: true,
	autoMark: true
});

var tab = new Array();

bot.respondTo('add ', (message, channel, user) =>
{
	message.text = message.text.replace('add ', '');
	bot.send(`fonction qui ajoutera une branche au point principal et l'appelera ${message.text}`, channel)
	var tmp;
	if (tab.length > 0)
	{
		tmp = new Array("null", message.text, 1, tab[0][3]+1);
		tab[0][0] = -1;
		for(var i = 0; i < tab.length; i++)
		{
			var tmp2 = tmp;
			tmp = tab[i];
			tmp[0] = tmp[0] + 1;
			tab[i] = tmp2;
		}
	}
	else
	{
		tmp = new Array("null", message.text, 0, 0);
	}
	tab.push(tmp);
	for(var i = 0; i < tab.length; i++) bot.send(tab[i][0] + ' ; ' + tab[i][1] + ' ; ' + tab[i][2] + " ; " + tab[i][3], channel);
}, true);

bot.respondTo('addCurrent ', (message, channel, user) =>
{
	message.text = message.text.replace('addCurrent ', '');
	bot.send(`fonction qui ajoutera une branche au point donné et l'appelera ${message.text}`, channel)
	var nameBranche = message.text.indexOf("^");
	if (nameBranche == -1)
	{
		bot.send(`veuillez entrer le caractère ^ à la fin du nom de la branche recherchée sans espaces`, channel)
		return;
	}
	var name = message.text.substring(0, nameBranche);
	bot.send(`valeur recherchée : ${name}`, channel)
	var i = 0;
	while(i < tab.length && tab[i][1] != name)
		i++;
	if(i == tab.length)
	{
		bot.send(`impossible de trouver la branche recherchée`, channel)
		return;
	}
	
	message.text = message.text.replace(name, '');
	message.text = message.text.replace('^ ', '');
	message.text = message.text.replace('^', '');
	bot.send(`insertion de ${message.text}`, channel)
	if (i < tab.length-1) //pas le dernier élément
	{
		tab[i][2]++; //enfantsDirects +1
		tab[i][3]++; //enfantsTotaux +1
		var parent = tab[i][0];
		while(parent != "null" && parent > -1 && parent < tab.length) // +1 aux enfants totaux de tous les parents de cette branche
		{
			tab[parent][3] = tab[parent][3] + 1;
			parent = tab[parent][0];
		}
		//i++;
		var tmp = tab[i];
		tab[i] = new Array(i, message.text, 0, 0); //nouvelle entrée
		var position = i;
		for (i; i < tab.length; i++)
		{
			if(tmp[0] > position)
				tmp[0] = tmp[0] + 1;
			var tmp2 = tmp;
			tmp = tab[i];
			tab[i] = tmp2;
		}
		if(tmp[0] > position)
			tmp[0] = tmp[0] + 1;
		tab.push(tmp);
	}
	else
	{
		tmp = new Array(i, message.text, 0, 0);
		tab.push(tmp);
		tab[i][2]++; //enfantsDirects +1
		tab[i][3]++; //enfantsTotaux +1
		var parent = tab[i][0];
		while(parent != "null" && parent > -1 && parent < tab.length) // +1 aux enfants totaux de tous les parents de cette branche
		{
			tab[parent][3] = tab[parent][3] + 1;
			parent = tab[parent][0];
		}
	}
	
	for(var i = 0; i < tab.length; i++) bot.send(tab[i][0] + ' ; ' + tab[i][1] + ' ; ' + tab[i][2] + " ; " + tab[i][3], channel); //pour le test
	
	/*// get the arguments from the message body
	let args = getArgs(message.text);
	// Roll two random numbers between 0 and 100
	let firstRoll = Math.round(Math.random() * 100);
	let secondRoll = Math.round(Math.random() * 100);
	let challenger = user.name;
	let opponent = args[0];
	// reroll in the unlikely event that it's a tie
	while (firstRoll === secondRoll)
	{
		secondRoll = Math.round(Math.random() * 100);
	}
	let winner = firstRoll > secondRoll ? challenger : opponent;
	// Using new line characters (\n) to format our response
	bot.send(
	`${challenger} fancies their chances against ${opponent}!\n
	${challenger} rolls: ${firstRoll}\n
	${opponent} rolls: ${secondRoll}\n\n
	*${winner} is the winner!*`
	, channel);*/
}, true);

bot.respondTo('afficher', (message, channel, user) =>
{
	var j = 0;
	for(var i = 0; i < tab.length; i++) bot.send
		(
			'id : '
			+ tab[i][0]
			+ '; parent id : '
			+ tab[i][1]
			+ ' ('
			+ getName(tab[i][1])
			+ ')'
			+ '; nom : '
			+ tab[i][2], channel
		);
	if(tab.length < 1)
		bot.send('rien à afficher', channel);
}, true);

bot.respondTo('algo', (message, channel, user) => //le tableau devrait être dans l'ordre et ne pas avoir
{
	algo(message, channel, 0, 0)
	/*var tailleEspacement = 0;
	var coté = 0;
	if(tab[i][2] > tab[i][3]) // donner une taille sur le nombre d'enfants directs au noeud
	{
		tailleEspacement = tab[i][2]*100;
	}
	else // enfants indirects s'ils y en a plus
	{
		tailleEspacement = tab[i][3]*100;
	}
	coté = (tailleEspacement/2) - (tailleEspacement/2)%100; //cas impair le milieu sera à 0
	
	for(var j = i+1; j < tab.length; j++) // rechercher tous les enfants du noeud pour les traiter, ils ne seront pas traité d'une autre manière
	{
		if(tab[j][0] == i)
		{
			algo(message, channel, coté, j);
			coté -=100;
		}
	}*/
	
	//for(var j = i; j < tab.length; j++) //ne sera pas fait à la fin car on utilisera une fonction recursive, c'est plus facile à comprendre comme ça et je ne sais pas faire de fonction en javascript
	
	//bot.send('noeud : ' + tab[i][1] + 'largeur de la ligne : ' + tailleEspacement, channel);
}, true);

function algo(message/*optionel, c'est pour l'affichage*/, channel/*pour l'affichage aussi*/, coté, i)
{// positionner ce noeud, appeler ses enfants
	if(i >= tab.length)
		return;
	var tailleEspacement = 0;
	
	if(tab[i][2] >= (tab[i][3] - tab[i][2]) || tab[i][2] == 1) // donner une taille sur le nombre d'enfants directs au noeud
	{
		tailleEspacement = tab[i][2]*100;
	}
	else // enfants indirects s'ils y en a plus
	{
		tailleEspacement = (tab[i][3]-tab[i][2])*100;
	}
	
	if(tab[i][0] != 'null')
		bot.send('noeud : ' + tab[i][1] + '; positionné par rapport au noeud précédent : ' + coté + '; (parent ' + tab[tab[i][0]][1] + ')', channel);
	else
		bot.send('noeud : ' + tab[i][1] + '; positionné par rapport au noeud précédent : ' + coté + '; (parent null)', channel);
	
	coté = (tailleEspacement/2) - (tailleEspacement/2)%100; //cas impair le milieu sera à 0
	
	var test = 0;
	for(var j = i+1; j < tab.length; j++) // rechercher tous les enfants du noeud pour les traiter, ils ne seront pas traité d'une autre manière
	{
		if(tab[j][0] == i)
		{
			if (test != 0)
			{
				coté -=100*(tab[j][3] + 1);
				algo(message, channel, coté, j);
			}
			else
			{
				algo(message, channel, coté, j);
				coté -=100*(tab[j][3] + 1);
			}
			if (coté == 0 && tailleEspacement%200 == 0) // cas pair on ne doit rien mettre au milieu
				coté -= 100;
		}
		test++;
	}
}

function getName(id)
{
	var j = 0;
	while(j < tab.length && tab[j][0] != id)
		j++;
	if(j == tab.length)
		return 'erreur';
	return tab[j][2];
}


// Take the message text and return the arguments
function getArgs(msg)
{
	return msg.split(' ').slice(1);
}
