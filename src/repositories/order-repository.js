'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async() => {
    let res = await Order.find({}, 'number status customer items')
        .populate('customer', 'name')
        .populate('items.product', 'title');
    return res;
}

exports.create = async(data) => {
    let order = new Order(data);
    await order.save();
}

exports.update = async(id, body) => {
    await Order
        .findByIdAndUpdate(id, {
            $set: {
                status: body.status,
                quantity: body.itens.quantity
            }
        });
}

exports.delete = async(id) => {
    await Order
        .findOneAndRemove(id);
}
