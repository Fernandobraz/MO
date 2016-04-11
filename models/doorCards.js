var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doorCardsSchema = new Schema({
    name: String,
    type: String,
    description: String,
    occurrence: String
});

module.exports = mongoose.model('doorCards', doorCardsSchema);