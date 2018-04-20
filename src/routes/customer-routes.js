'use strict';

const express = require('express');
const router = express.Router(); // ARQUIVO DE ROTAS
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

//ROTAS
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);
router.get('/', controller.get);
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;
