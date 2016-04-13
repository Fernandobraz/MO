var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    gameMoment: String,
    hasStarted: Boolean
});

module.exports = mongoose.model('game', gameSchema);