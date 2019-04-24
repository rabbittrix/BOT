/*var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Você disse: %s", session.message.text);
});*/
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Crie um chat conector para se comunicar com o Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "",
    appPassword: ""
});

// Endpoint que irá monitorar as mensagens do usuário
server.post('/api/messages', connector.listen());

// Recebe as mensagens do usuário e responde repetindo cada mensagem (prefixado com 'Você disse:')
/*var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Você disse: %s", session.message.text);
}); */

//var server = restify.createServer();

const bot = new builder.UniversalBot(connector);

// Bloco de Dialogs: 
bot.dialog("/", [session => {
   builder.Prompts.text(session, "Oi! Como você se chama?");
}, (session, results) => {
   let nome = results.response;
   session.send(`Oi! ${nome}`);
   session.beginDialog("/perguntarPratoPredileto");
}]);

bot.dialog("/perguntarPratoPredileto", [session => {
   builder.Prompts.text(session, "Qual é o seu prato predileto?");
}, (session, results) => {
   let pratoPredileto = results.response;
   session.endDialog(`Puxa que legal! Então você gosta de comer **${pratoPredileto}**!`);
   session.beginDialog("/perguntarLugarPreferido");
}]);

bot.dialog("/perguntarLugarPreferido", [session => {
   builder.Prompts.text(session, "Qual é o seu lugar preferido?");
}, (session, results) => {
   let lugar = results.response;
   session.endDialog(`Amamos **${lugar}**! É simplesmente um lugar muito bonito!`);
   session.beginDialog("/perguntarTimePredileto");
}]);

bot.dialog("/perguntarTimePredileto", [session => {
    builder.Prompts.text(session, "Qual é a sua seleção?");
 }, (session, results) => {
    let timePredileto = results.response;
    session.endDialog(`Puxa que legal! Então você torce para **${timePredileto}**!`);
    session.beginDialog("/perguntarQuemVoceAcha");
 }]);

 bot.dialog("/perguntarQuemVoceAcha", [session => {
    builder.Prompts.text(session, "Quem você acha que ganha a Copa do Mundo de 2018?");
 }, (session) => {
    
    session.endDialog(`Puxa que pena! você esta inludido`);
    session.beginDialog("/perguntarVaiGanhar");
 }]);

 bot.dialog("/perguntarVaiGanhar", [session => {
    builder.Prompts.text(session, "Sabe que eu acho que ganha?");
 }, (session) => {
    
    session.endDialog(`Claro que não é este time! não chore`);
    session.beginDialog("/perguntarBrasil");
 }]);

 bot.dialog("/perguntarBrasil", [session => {
    builder.Prompts.text(session, "Vou te falar?");
 }, (session) => {
    
    session.endDialog(`Claro que é foi a França!`);
 }]);