
/*
*
* Arquivo: promptsChoice.js
* Data: 01/10/2019
* Descrição: Desenvolvimento de um Bot onde será utilizado o recurso do Prompts.choicem
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
    session =>{
        builder.Prompts.text(session, 'Olá! Qual é o seu nome?');
    },

    (session, results) =>{
        session.userData.nome = results.response;
        builder.Prompts.number(session, `Oi ${session.userData.nome}, quanto tempo que você trabalha com rpogramação?`)
    },
    
    (session, results) => {
        session.userData.anosExperienciaProgramacao = results.response;
        builder.Prompts.choice(session, 'Qual é a sua linguagem de programação predileta?', 
            'TypeScript | JavaScript | C# | Node.js | Java | Python | Ruby', 
            { listStyle: builder.ListStyle.button }
        );
    },
    (session, results) => {
        session.userData.linguagem = results.response.entity;
        session.endConversation('Ah... Beleza! '
            + session.userData.nome + ' vocÊ tem trabalhado com programação por '
            + session.userData.anosExperienciaProgramacao + ' anos e curte programar com '
            + session.userData.linguagem
        );
    }
]);
