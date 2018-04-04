'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.post = ('/', (req, res, next) => {
    var product = new Product(req.body);
    // product.title = req.body.title; 
    // product.slug = req.body.slug;
    // product.description = req.body.description;
    // product.price = req.body.price;
    // product.active = req.body.active;
    // product.tags = req.body.tags;
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
});

exports.put = ('/', (req, res, next) => {
    const id = req.params.id;
    res
        .status(200)
        .send({id: id, item: req.body});
});

exports.delete = ('/', (req, res, next) => {
    res
        .status(200)
        .send(req.body);
});
