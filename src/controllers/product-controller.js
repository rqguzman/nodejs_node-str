'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res
            .status(200)
            .send(data);
    } catch (error) {
        res
            .status(500)
            .send({message: 'Falha ao processar sua requisiçao'});
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res
            .status(200)
            .send(data);
    } catch (error) {
        res
            .status(500)
            .send({message: 'Falha ao processar sua requisiçao'});
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res
            .status(200)
            .send(data);
    } catch (error) {
        res
            .status(500)
            .send({message: 'Falha ao processar sua requisiçao'});
    }
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res
            .status(200)
            .send(data);
    } catch (error) {
        res
            .status(500)
            .send({message: 'Falha ao processar sua requisiçao'});
    }
}

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter pelo menos 5 caracteres.');
    contract.hasMinLen(req.body.slug, 6, 'O slug deve conter pelo menos 6 caracteres.');

    // Se dados forem inválidos
    if (!contract.isValid()) {
        res
            .status(400)
            .send(contract.errors())
            .end();
        return;
    }

    try {
        await repository.create(req.body);
        res
            .status(201)
            .send({message: 'Produto cadastrado com sucesso!'});
    } catch (error) {
        res
            .status(400)
            .send({message: 'Falha ao cadastrar o produto.', data: error});
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res
            .status(200)
            .send({message: 'Produto alterado com sucesso!'});
    } catch (error) {
        res
            .status(400)
            .send({message: 'Falha ao alterar o produto.', data: error});
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete({_id: req.body.id});
        res
            .status(200)
            .send({message: 'Produto removido com sucesso!'});

    } catch (error) {
        res
            .status(400)
            .send({message: 'Falha ao remover o produto.', data: error});
    }
};