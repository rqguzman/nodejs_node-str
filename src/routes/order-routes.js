'use strict';

const express = require('express');
const router = express.Router(); // ARQUIVO DE ROTAS
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

//ROTAS
router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);
// router.put('/:id', controller.put);
// router.delete('/', controller.delete);

module.exports = router;

