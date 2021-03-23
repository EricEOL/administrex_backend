const mongoose = require('mongoose');

const requisitionSchema = mongoose.Schema({
    number: {type: String, required: true, minlength: 1, maxlength: 4},
    section: {type: String, required: true, minlength: 2, maxlength: 15},
    type: {type: String, required: true, minlength: 2, maxlength: 15},
    responsible: {type: String, required: true, minlength: 2, maxlength: 25},
    object: {type: String, required: true, minlength: 2, maxlength: 300},
    value: {type: Number, required: true, minlength: 1, maxlength: 30},
    status: {type: String, minlength: 1, maxlength: 15, default: "Aguardando"},
    noempenho: {type: String, minlength: 1, maxlength: 15, default: "-"},
    internalplane: {type: String, minlength: 1, maxlength: 25, default: "-"},
    nd: {type: String, minlength: 1, maxlength: 25, default: "00"},
    supdoc: {type: String, minlength: 1, maxlength: 5, default: "Não"},
    noliquid: {type: String, minlength: 1, maxlength: 15, default: "-"},
    nopayment: {type: String, minlength: 1, maxlength: 15, default: "-"},
    locale: {type: String, minlength: 1, maxlength: 20, default: "Fisc"},
    created_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Requisition', requisitionSchema);