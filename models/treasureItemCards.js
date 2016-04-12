var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var treasureItemSchema = new Schema({
    name: String,
    bonus: String,
    description: String,
    restriction: String,
    bodypart: String,
    isbig: Boolean
});

module.exports = mongoose.model('treasureItem', treasureItemSchema);