/**
 * Arquivo: pizzaria/pizzariaItaliana.js
 * Data: 02/10/2019
 * Descrição: Desenvolvimento de um ChatBot de pedido de pizzas integrado com o luis.ai
 * Author: Renata Carvalho
 */

require('dotenv-extended').load({
    path: "./.env"

});

 const restify = require('restify'); // subir o server
 const builder = require('botbuilder'); // criar o chatbot
 const moment = require('moment'); // modificar time


const server = restify.createServer();

//configuração do ChatBot: 
const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

const bot = new builder.UniversalBot(connector)

//configuração do LUIS:
const recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
console.log(process.env.LUIS_MODEL_URL)
const intents = new builder.IntentDialog({ recognizers: [recognizer] });

//configuração dos 'Intents' (intenções):

// Endpoint - Saudar
intents.matches('Saudar', (session, results) => {
    session.send('Oi! Tudo bem?! Em que posso ajudar?');
});

//Endpoint - Pedir
intents.matches('Pedir',[
    (session, args, next) => {
        var pizzas = [
            'Quatro Queijos',
            'Calabresa',
            'Frango Catupiri',
            'Portuguesa',
            'Mussarela',
            'Moda da Casa',
            'Baiana'        
        ];
        const entityPizza = builder.EntityRecognizer.findEntity(args.entities, 'Pizza')
        
        //fazer um match da escolha da pizza que o usuario fez:
        if(entityPizza){
            var match = builder. EntityRecognizer.findBestMatch(pizzas, entityPizza);
        }
        if(!match){
            builder.Prompts.choice(session, 'No momento nao temos este sabor! Escolha uma pizza de nossa lista', pizzas)
        }else{
            next({ response: match })
        }
    },
    (session, results) => {
        //Aqui é para indicar em quanto tempo chegará o pedido do usuario
        if (results.response){
            var time = moment().add(30,'m');

            session.dialogData.time = time.format('HH:mm');
            console.log('para o luis',session.dialogData.time)

            session.send('Perfeito! Sua pizza de **%s** chegará às **%s**', results.response.entity, session.dialogData.time)
        }else{
            session.send('Sem problema! Se não gostarem, podem pedir numa proxima vez')
        }
    }
]);

//Endpoint - Cancelar:
intents.matches('Cancelar', (session, results) => {
    session.send('Pedido cancelado com sucesso! Muito obrigada(o)');
});

//Endpoint - Verificar:
intents.matches('Verificar', (session, results) => {
    session.send('Sua pizza chegará às **%s**', session.dialogData.time);
});

//Endpoint - Default:
const teste = intents.onDefault(
    builder.DialogAction.send('Desculpe! Mas, não entedni o que você quis dizer/pedir')
);

bot.dialog('/', intents)

server.post('/api/messages', connector.listen());

server.listen(process.env.port || process.env.PORT || 3978 , () => {
    console.log('Aplicação está sendo executada na porta %s', server.name, server.url)
});

