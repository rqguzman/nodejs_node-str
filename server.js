'use strict'

// console.log('Testando...');

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = 3000; //ARBITRANDO UMA PORTA
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

