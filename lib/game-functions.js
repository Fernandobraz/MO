var Game = require('../models/game');
var GameUsers = require('../models/gameUsers');
module.exports = {
    checkNewGame: function(callback){
        Game.count(function(e, count){
            if(count <= 0){
                var newGame = Game({
                    gameMoment: "0",
                    hasStarted: false
                });
                newGame.save(function(err, game){
                    if(err) throw err;
                    
                    callback(game);
                });
            }else{
                Game.findOne({}, function(err, game){
                    callback(game);
                });
            }
        });
    },
    registerUsers: function(connectedPlayers, currentGameId){
        GameUsers.find({}, function(err, registeredUsers){
            connectedPlayers.forEach(function(player){
                var shouldAdd = true;
                registeredUsers.forEach(function(user){
                    if(player.id === user.userId){
                        shouldAdd = false;
                    } 
                });
                if(shouldAdd){
                    var newGameUser = GameUsers({
                        userId: player.id,
                        gameId: currentGameId,
                        position: "0"
                    });
                    newGameUser.save(function(err){
                        if(err) throw err;
                    });
                }
            });
        });
    },
    startGame: function(gameId){
        console.log(gameId);
        Game.findByIdAndUpdate(gameId, {
            gameMoment: "1",
            hasStarted: true
        },function(err){
            if(err) throw err;
        });
    }
}

// checar o db por todos os players no currentGameId
    // adicionar essa lista em um array registeredUsers
// correr por todos os connectedPlayers
    //correr por todos registeredUsers
        //se o id de um dos connectedPlayers