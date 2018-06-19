var request = require('ajax-request');
'use strict';
let Bot = require('./Bot');
//import {Xhttp} from 'xhttp'

const sendApp = "https://slack.com/api/files.upload";

const bot = new Bot(
{
	token: 'xoxb-350804903105-363248128663-OVSKPjvAQgwdTFNghF1ngV5C',
	autoReconnect: true,
	autoMark: true
});

var tab = new Array();


bot.respondTo('send', (message, channel, user) =>
{
	request.post
	({
		url: 'https://slack.com/api/files.upload&token=xoxb-350804903105-363248128663-OVSKPjvAQgwdTFNghF1ngV5C&channels=projet7test-bots&content=test',
		data: {},
		headers: {"Content-type", "application/x-www-form-urlencoded"}
	},
	function(err, res, body)
	{
		bot.send("erreur " + err, channel);
		console.log(body);
		//console.log(body);
	});
	/*xhttp.open("POST", "https://slack.com/api/files.upload", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("token=xoxb-350804903105-363248128663-OVSKPjvAQgwdTFNghF1ngV5C&channels=projet7test-bots&file=test.txt");*/
	
}, true);
