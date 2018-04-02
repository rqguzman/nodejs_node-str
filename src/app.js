'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router(); // ARQUIVO DE ROTAS

// Conectando ao DB
const strgConnection = 'mongodb://rqguzman:10312556@Hq@ds231589.mlab.com:31589/ndstr_guz';
mongoose.connect(strgConnection);

// Carregando as rotas
const indexRoutes = require('./routes/index-routes');
const productRoutes = require('./routes/product-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// URLs
app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;