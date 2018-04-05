'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    return Product.find({
        active: true
    }, 'title price slug');
}

exports.getBySlug = (slug) => {
    return Product.findOne({
        slug: slug,
        active: true
    }, 'title price slug tags');
}

exports.getById = (id) => {
    return Product.findById(id);
}

exports.getByTag = (tag) => {
    return Product.find({
        tags: tag,
        active: true
    }, 'title description price slug tags');
}

exports.create = (body) => {
    let product = new Product(body);

    return product.save();
}

exports.update = (id, body) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: body.title,
            description: body.description,
            price: body.price,
            slug: body.slug
        }
    });
}

exports.delete = (id) => {
    return Product.findOneAndRemove(id);
}