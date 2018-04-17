'use strict';

const express = require('express');
const router = express.Router(); // ARQUIVO DE ROTAS
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

//ROTAS
router.get('/', controller.get);
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);
router.post('/authenticate', controller.authenticate);

module.exports = router;
