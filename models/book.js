var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genre: {type: String, required: true},
    edition: {type: String, required: true},
    about: {type: String, required: true},
    price: {type: Number, required: true},
    studentOwner: {type: String, required: true}
},{strict: true} );

module.exports = mongoose.model('Book', Schema);
