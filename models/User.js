const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    email: {type: String, required: true, minlength: 3, maxlength: 100},
    password: {type: String, required: true, minlength: 6, maxlength: 200},
    perfil: {type: String, required: true, minlength: 2, maxlength: 10},
    created_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('User', userSchema);