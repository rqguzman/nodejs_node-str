'use strict';

const express = require('express');
const router = express.Router(); // ARQUIVO DE ROTAS
const controller = require('../controllers/product-controller');

//ROTAS
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;