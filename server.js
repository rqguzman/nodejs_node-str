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
server.on('error', onError);
server.on('listen', onListening);
console.log('API rodando na porta ' + port);

// FUNCTIONS
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

function onerror(error) {

    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
    
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE' :
                console.error(bind + ' is already in use');
                process.exit(1);                
                break;
        
            default:
                throw error;
        }
    
}

function onListening( ) {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    
}
