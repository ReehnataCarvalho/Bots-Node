/*
*
* Arquivo: saudacaoUserData.js
* Data: 01/10/2019
* Descrição: Desenvolvimento de um Bot que solicita nome de usuário com uma mensagem de saudação! (Conceitos de Armazenamento de dados: 'userData')
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

const bot = new builder.UniversalBot(connector, (session) =>{
    session.beginDialog('main')
});

//Bloco de Dialogs:
bot.dialog('main',[
    (session, results, next) =>{
        if(!session.userData.nome){
            builder.Prompts.text(session, 'Olá! tudo bem? Qual é o seu nome?')
        }else{
            next();
        }
    },
    (session, results) =>{
        if (results.response){
            let msg = results.response;
            session.userData.nome = msg;
        }

        session.send(`Olá! ${session.userData.nome}!`)
    }
])