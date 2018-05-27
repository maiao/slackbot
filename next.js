'use strict';
let Bot = require('./Bot');

const bot = new Bot(
{
	token: 'xoxb-350804903105-363248128663-OVSKPjvAQgwdTFNghF1ngV5C',
	autoReconnect: true,
	autoMark: true
});

var tab = new Array();
var compteur = 0;

bot.respondTo('add ', (message, channel, user) =>
{
	message.text = message.text.replace('add ', '');
	bot.send(`fonction qui ajoutera une branche au point principal et l'appelera ${message.text}`, channel)
	var tmp = new Array(compteur, "null", message.text);
	compteur++;
	for(var i = 0; i < tab.length; i++)
	{
		var tmp2 = tmp;
		tmp = tab[i];
		tab[i] = tmp2;
	}
	tab.push(tmp);
	if(tab.length > 1)
		tab[1][1] = tab[0][0];
	for(var i = 0; i < tab.length; i++) bot.send(tab[i][0] + ' ; ' + tab[i][1] + ' ; ' + tab[i][2], channel);
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
	while(i < tab.length && tab[i][2] != name)
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
		i++
		var tmp = tab[i];
		tab[i] = new Array(compteur, tab[i-1][0], message.text);
		compteur++;
		for (i; i < tab.length; i++)
		{
			var tmp2 = tmp;
			tmp = tab[i];
			tab[i] = tmp2;
		}
		tab.push(tmp);
	}
	else
	{
		tmp = new Array(compteur, tab[i][0], message.text);
		compteur++;
		tab.push(tmp);
	}
	
	for(var i = 0; i < tab.length; i++) bot.send(tab[i][0] + ' ; ' + tab[i][1] + ' ; ' + tab[i][2], channel);
	
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
