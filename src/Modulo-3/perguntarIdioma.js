/*
*
* Arquivo: perguntarIdioma.js
* Data: 01/10/2019
* Descrição: Desenvolvimento de um Bot que solicita nome de usuário com uma mensagem de saudação! (Conceitos de Armazenamento de dados: 'dataDialog')
* Autor: Renata Carvalho
*
*/

const restify = require('restify');
const builder = require('botbuilder');

// Configuração do Server via Restify:
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s Aplicação executando na porta %s', server.name, server.url);
});

// Criação do chat connect para comunicar com o serviço do bot Framework;
const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''

});

//Endpoint para executar as mensagens para os usuarios vis Bot Emulator
server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector, (session) => {
    session.beginDialog('main')
});

//Bloco de Dialogs:
bot.dialog('main', [
    session => {
        builder.Prompts.text(session,'Oi! tudo bom, qual é o seu nome');
    },
    (session, results) =>{

        session.userData.nome = results.response ;
        session.send(`Olá! ${session.userData.nome}`);

        session.beginDialog('perguntarIdioma')
    },

]);

bot.dialog('perguntarIdioma', [
    session =>{
        builder.Prompts.text(session, 'Qual é o idioma que você sabe falar?')
    },
    (session, results) =>{
        session.dialogData.idioma = results.response;

        session.endDialog(`Ótimo **${session.userData.nome}**, Voce sabe falar **${session.dialogData.idioma}**`)
    }
])