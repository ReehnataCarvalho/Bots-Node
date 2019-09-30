/*
* Arquivo: conversacaoBot.js
* Data: 30/09/2019
* Descrição: Desenvolvimento de um Bot via Emulator.
* Autor: Renata Carvalho
*/

const restify = require('restify');
const builder = require('botbuilder');

//COnfiguração do Server via restify:
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s Aplicação executando na porta %s', server.name, server.url)
});

const connector = new builder.ChatConnector({
    appId:'',
    appPassword:''
});

const bot = new builder.UniversalBot(connector, [
    (session) =>{
        builder.Prompts.text(session, 'Olá! Tudo bom?')
    },
    (session)=>{
        builder.Prompts.text(session, 'Como você se chama?')
    },
    (session, results)=>{
        let msg = results.response;
        session.send(`Oi ${msg}! Em que posso ajudar?`)
    }
]);

//Endpoint para executar as mensagens para o usuario
server.post('api/messages', connector.listen());