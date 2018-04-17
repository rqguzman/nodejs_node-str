'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {
    const res = await Customer.find({}, 'name email');
    return res;
}

exports.create = async(data) => {
    let customer = new Customer(data);
    await customer.save();
}

exports.update = async(id, body) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            email: body.email,
            password: body.password
        }
    });
}

exports.delete = async(id) => {
    await Customer.findOneAndRemove(id);
}

exports.authenticate = async(data) => {
    let res = await Customer.findOne({
        email: data.email, 
        password: data.password
    });
    return res;
}