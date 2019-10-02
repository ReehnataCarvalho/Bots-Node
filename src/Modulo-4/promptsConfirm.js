/*
*
* Arquivo: promptsConfirm.js
* Data: 01/10/2019
* Descrição: Desenvolvimento de um Bot onde será utilizado o recurso do Prompts.confirm
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
        builder.Prompts.text(session, 'Olá.. qual é o seu nome?')
    },
    (session, results) =>{
        let nome = results.response;
        session. send(`Oi! ${nome}. SEja Bem-Vindo(a) a Lanchonete XYZ`);

        session.beginDialog('pedido');
    }
]);

bot.dialog('pedido',[
    session => {
        builder.Prompts.text(session, 'Qual é o seu pedido?');
    },

    (session, results) => {
        let pedido = results.response;
        session.send(`Okay! Você pediu: ${pedido}!`)

        builder.Prompts.confirm(session, 'Gostaria de finalizar o seu pedido?', {
            listStyle: builder.ListStyle.button
        })
    },
    session => {
        session.endDialog('Okay! Estaremos entregando o seu pedido em breve');
    }
]);
