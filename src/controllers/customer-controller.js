
'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

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

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'Email inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres.');

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
            .send({message: 'Cliente cadastrado com sucesso!'});
    } catch (error) {
        res
            .status(400)
            .send({message: 'Falha ao cadastrar o cliente.'});
    }
};

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res
            .status(200)
            .send({message: 'Cliente alterado com sucesso!'});
    } catch (error) {
        res
            .status(400)
            .send({message: 'Falha ao alterar o cliente.', data: error});
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete({_id: req.body.id});
        res
            .status(200)
            .send({message: 'cliente removido com sucesso!'});

    } catch (error) {
        res
            .status(400)
            .send({message: 'Falha ao remover o cliente.', data: error});
    }
};
