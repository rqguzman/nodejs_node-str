'use strict'

// console.log('Testando...');

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
//ARBITRANDO UMA PORTA -> migrou para a Fç normalizeport()
// const port = 3000;
// RECEBENDO A PORTA DO SERVIDOR
/** A porta já deve vir informada pelo servidor (Azure, Heroku Etc).
 * O que está sendo passado como parâmetro para a Fç normalizePort()
 * é a porta que consta em environment(env)
 * Caso não venha, arbitrams a porta 3000
 */
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port); // SETANDO A PORTA P/ APLICAÇÃO

//CRIANDO UM SERVIDOR
const server = http.createServer(app); // SERVIDOR
const router = express.Router(); // ARQUIVO DE ROTAS

/**
 * Configuração de uma rota
 * usando o arquivo de rotas criado (router)
 * Métodos disponíveis 'get', 'post', 'update', 'delete'
 * URL padrão: '/'
 * Parâmetros; request(req), response(res), e next
 * Retorna um status 200-OK
 */
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route);

server.listen(port);
console.log('API rodando na porta 3000...');

// Função retirada do gerador de código do Express
function normalizePort(valor) {
    const port = parseInt(valor, 10);

    // Se não for um número, retorna um número(10, no caso)
    if (isNaN(port)) {
        return val;
    }

    // Se for maior ou igual a zero, retorna a porta
    if (port >=0 ) {
        return port;
    }

    // Caso contrário, não retornamos nada()
    return false;
}

