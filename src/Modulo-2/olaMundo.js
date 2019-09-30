/*
* Arquivo: olaMundo.js
* Data: 30/09/2019
* Descrição: Desenvolvimento de um Bot via Emulator.
* Autor: Renata Carvalho
*/


const restify = require('restify');
const builder = require('botbuilder');

// Configuração do Server via REstify;

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s Aplicação está executando na porta %s', server.name, server.url)
});

// Criação do chat connect para comunicar com o serviço do bot Framework
const connector = new builder.ChatConnector({
    appId:'',
    appPassword:''
});

//Endpoint para executar as mensagens para os usuarios vis Bot Emulator
server.post('/api/messages',connector.listen());

// Aqui entra os nossos dialogos
const bot = new builder.UniversalBot(connector, function(session){
    session.send('Você disse: %s',session.message.text);
});