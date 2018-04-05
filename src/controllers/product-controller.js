'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
    Product.find({
        active: true
    }, 'title price slug').then(data => {
        res
            .status(200)
            .send(data);
    }).catch(error => {
        res
            .status(400)
            .send(error);
    });
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title price slug tags').then(data => {
        res
            .status(200)
            .send(data);
    }).catch(error => {
        res
            .status(400)
            .send(error);
    });
}

exports.getById = (req, res, next) => {
    Product
        .findById({id: req.params.id})
        .then(data => {
            res
                .status(200)
                .send(data);
        })
        .catch(error => {
            res
                .status(400)
                .send(error);
        });
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags').then(data => {
        res
            .status(200)
            .send(data);
    }).catch(error => {
        res
            .status(400)
            .send(error);
    });
}

exports.post = (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter pelo menos 5 caracteres.');
    contract.hasMinLen(req.body.slug, 6, 'O slug deve conter pelo menos 6 caracteres.');

    // Se dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    var product = new Product(req.body);
    
    product
        .save()
        .then(x => {
            res
                .status(201)
                .send({message: 'Produto cadastrado com sucesso!'});
        })
        .catch(error => {
            res
                .status(400)
                .send({message: 'Falha ao cadastrar o produto.', data: error});
        });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    })
        .then(x => {
            res
                .status(200)
                .send({message: 'Produto alterado com sucesso!'});
        })
        .catch(error => {
            res
                .status(400)
                .send({message: 'Falha ao alterar o produto.', data: error});
        });
};

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id)
        .then(x => {
            res
                .status(200)
                .send({message: 'Produto removido com sucesso!'});
        })
        .catch(error => {
            res
                .status(400)
                .send({message: 'Falha ao remover o produto.', data: error});
        });
};