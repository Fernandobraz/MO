var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameUsersSchema = new Schema({
    userId: String,
    gameId: String,
    position: String
});

module.exports = mongoose.model('gameUsers', gameUsersSchema);