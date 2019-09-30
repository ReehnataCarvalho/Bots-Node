/*
* Arquivo: olaMundoBot.js
* Data: 30/09/2019
* Descrição: Desenvolvimento de um Bot via Console.
* Autor: Renata Carvalho
*/

const builder = require('botbuilder');

//aqui estou criando m conector para usar o Bot via console
const connector = new builder.ConsoleConnector().listen();
const bot = new builder.UniversalBot(connector);

//Aqui nos vamos criar o nosso dialogo para o bot
bot.dialog('/', [

    function(session){
        session.send('Olá Renata!!!')
    }
]);