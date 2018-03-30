'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router(); // ARQUIVO DE ROTAS

// Carregando as rotas
const indexRoutes = require('./routes/index-routes');
const productRoutes = require('./routes/product-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// URLs
app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;