
/*
*
* Arquivo: entrevistaPrompts.js
* Data: 01/10/2019
* Descrição: Desenvolvimento de um Bot onde será utilizado o diferentes tipos de Prompts
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
    (session, results, next) =>{
        session.userData.city = 'Campinas'
        builder.Prompts.text(session, 'Qual é o seu nome? ');
    },

    (session, results) => {
        session.dialogData.nome = results.response;
        builder.Prompts.text(session, `Oi ${session.dialogData.nome}. de ${session.userData.city} Qual é a sua profissão?`)
    },

    (session, results) => {
        session.dialogData.profissao = results.response;
        builder.Prompts.number(session, `${ session.dialogData.profissao} , a quantos anos? `)
    },

    (session, results, ) => {
        session.dialogData.tempoProfissão = results.response;
        builder.Prompts.number(session, `e qual é a sua idade?`)
    },

    (session, results) =>{
        session.dialogData.idade = results.response;
        builder.Prompts.time(session, `Você pode informar que horas são agora?`)
    },

    (session, results)=>{
        session.dialogData.horaAtual = builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.confirm(session, `Você deseja ver o seu questionário?`, { listStyle: builder.ListStyle.button });
    },

    (session, results) => {
        if(results.response) {
            session.endDialog(`Os detalhes do seu questionário foi:
            <br />Nome: **${session.dialogData.nome}**
            <br />Profissão: **${session.dialogData.profissao}**
            <br />Tempo Profissão: **${session.dialogData.tempoProfissão}**
            <br />Idade: **${session.dialogData.idade}**
            <br />Hora Atual: **${session.dialogData.horaAtual}**`);
        }else {
            session.endDialog('Ok! Até a próxima.. Xauu ')
        }
    }
]);
