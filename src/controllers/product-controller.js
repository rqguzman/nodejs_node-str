'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

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

exports.post = ('/', (req, res, next) => {
    var product = new Product(req.body);
    // product.title = req.body.title; product.slug = req.body.slug;
    // product.description = req.body.description; product.price = req.body.price;
    // product.active = req.body.active; product.tags = req.body.tags;
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