var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var treasureCardsSchema = new Schema({
    name: String,
    type: String,
    description: String,
    goldvalue: String
});

module.exports = mongoose.model('treasureCards', treasureCardsSchema);