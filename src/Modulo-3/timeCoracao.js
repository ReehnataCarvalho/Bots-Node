/*
*
* Arquivo: timeCoracao.js
* Data: 01/10/2019
* Descrição: Desenvolvimento de um Bot que pergunta ao usuário o time do coração.Usando os conceitos do método: beginDialog.
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

// const bot = new builder.UniversalBot(connector);

// //Bloco de Dialogs:
// bot.dialog('/',[
//     session =>{
//         builder.Prompts.text(session,'Qual é o seu nome ?');
//     },
//     (session,results) =>{
//         let nome = results.response;
//         session.send(`Oi! ${nome}`);

//         session.beginDialog('perguntarTimeCoracao')
//     }
// ]);

// este codigo acima faz a mesma coisa do que o de baixo!

const bot = new builder.UniversalBot(connector, (session) =>{
    session.beginDialog('main')
});

//Bloco de Dialogs:
bot.dialog('main',[
    session =>{
        builder.Prompts.text(session,'Qual é o seu nome ?');
    },
    (session,results) =>{
        let nome = results.response;
        session.send(`Oi! ${nome}`);

        session.beginDialog('perguntarTimeCoracao')
    }
]);

bot.dialog('perguntarTimeCoracao',[
    session =>{
        builder.Prompts.text(session, `Qual é o seu time de Futebol do Coração?`);
    },
    (session, results) =>{
        let timeCoracao = results.response;

   
            session.endDialog(`Vamos torcer no Campeonato Brasileiro para o time do **${timeCoracao}** em 2019`)
            
            session.beginDialog('perguntarLugarPreferido');
     
    }

]);

bot.dialog('perguntarLugarPreferido', [
    session => {
        builder.Prompts.text(session, 'E qual é o seu lugar preferido?');
    },

    (session, results) => {
        let lugar = results.response;
        session.endDialog(`Amamos **${lugar}**! É simplismente uma cidade incrível!`);
    }
]);
