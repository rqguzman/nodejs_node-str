'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const app = express();
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port); // SETANDO A PORTA P/ APLICAÇÃO

//CRIANDO UM SERVIDOR
const server = http.createServer(app); // SERVIDOR
const router = express.Router(); // ARQUIVO DE ROTAS

// ROTEAMENTO
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route);

server.listen(port);
console.log('API rodando na porta 3000...');

function normalizePort(valor) {

    const port = parseInt(valor, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >=0 ) {
        return port;
    }

    return false;
}

