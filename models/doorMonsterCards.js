var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doorMonsterSchema = new Schema({
    name: String,
    level: String,
    description: String,
    badstuff: String,
    levelprize: String,
    treasureprize: String,
    isundead: Boolean
});

module.exports = mongoose.model('doorMonster', doorMonsterSchema);