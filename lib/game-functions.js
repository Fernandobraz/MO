var Game = require('../models/game');
var GameUsers = require('../models/gameUsers');
module.exports = {
    checkNewGame: function(){
        Game.count(function(e, count){
            if(count <= 0){
                var newGame = Game({
                    gameMoment: "0",
                    hasStarted: false
                });
                newGame.save(function(err, game){
                    if(err) throw err;
                    
                    return game._id;
                });
            }else{
                Game.findOne({}, function(err, game){
                    return game._id;
                });
            }
        });
    },
    registerUsers: function(connectedPlayers, currentGameId){
        GameUsers.count(function(e, count){
            if(count <= 0){
                connectedPlayers.forEach(function(player){
                    newGameUsers = GameUsers({
                        userId: player.id,
                        gameId: currentGameId
                    });
                    newGameUsers.save(function(err, gameUser){
                        if(err) throw err;
                    });
                });
            }
        });
    }
}