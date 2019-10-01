/*
* Arquivo: conversacaoBot.js
* Data: 30/09/2019
* Descrição: Desenvolvimento de um Bot via Console.
* Autor: Renata Carvalho
*/

const builder = require('botbuilder');

const connector = new builder.ConsoleConnector().listen();
const bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    (session) => {
        builder.Prompts.text(session, 'Oi! Tudo Bem ?');
    },
    (session) => {
        builder.Prompts.text(session, 'Qual é o seu nome?')
    },

    (session, results) => {
        let msg = results.response;
        session.send(`Oi ${msg}! Em que posso ajudar?`)
    }
]);