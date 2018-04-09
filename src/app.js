'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router(); // ARQUIVO DE ROTAS

// Conectando ao DB
const strgConnection = 'mongodb://rqguzman:10312556Hq@ds231589.mlab.com:31589/ndstr_guz';
mongoose.connect(strgConnection);

// Carregando os Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carregando as rotas
const indexRoutes = require('./routes/index-routes');
const productRoutes = require('./routes/product-routes');
const customerRoutes = require('./routes/customer-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// URLs
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);

module.exports = app;