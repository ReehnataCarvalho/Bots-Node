/*
*
* Arquivo: saudacao.js
* Data: 01/10/2019
* Descrição: Desenvolvimento de um Bot que solicita nome de usuário com uma mensagem de saudação! Usando os conceitos do método: beginDialog.
* Autor: Renata Carvalho
*
*/

const restify = require('restify');
const builder = require('botbuilder');

// Configuração do Server via Restify:
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978,() =>{
    console.log('%s Aplicação executando na porta %s', server.name, server.url);
});

// Criação do chat connect para comunicar com o serviço do bot Framework;
const connector = new builder.ChatConnector({
    appId:'',
    appPassword:''

});

//Endpoint para executar as mensagens para os usuarios vis Bot Emulator
server.post('/api/messages',connector.listen());

const bot = new builder.UniversalBot(connector);

//Bloco de Dialogs:
bot.dialog('/',[
    session =>{
        session.beginDialog('/saudacao')
    }
])

bot.dialog('/saudacao',[
    session =>{
        builder.Prompts.text(session, 'Oi! Qual é o seu nome:')
    },
    (session, results) =>{
        let msg = results.response;
        session.endDialog(`Oi! ${msg}!`)
    }
])