'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id criado automaticamente
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: [true, 'o email é obrigatório']        
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Customer', schema);

