var express = require('express');
var passport = require('passport');
var Game = require('../models/game');
var GameUsers = require('../models/gameUsers');
var btnFunctions    = require('../lib/btn-functions');
var gameFunctions   = require('../lib/game-functions');

// var router = express.Router();
module.exports = function(app, http){
    var io = require("socket.io")(http);
    app.get('/game', function (req, res) {
        if(typeof(req.user) === "undefined"){
            res.redirect("/login");
        }else{
            res.render('game/index.ejs', { title: "Connection test", user : req.user });  
        }
    });
    
    var connectedPlayers = []; //{username, id, gender, firstRoll }
    var votedList = [];
    var playersOrder = [];
    var currentGame = {id: "", hasStarted: false, gameMoment: ""}; //fix the problem of first connection
    var getGame = function(game){
        currentGame.id = game._id;
        currentGame.hasStarted = game.hasStarted;
        currentGame.gameMoment = game.gameMoment;
    }
    io.on('connection', function(socket){
        var player;
        gameFunctions.checkNewGame(getGame);
        console.log(currentGame);
        io.emit("joinGame", currentGame);
        socket.on("sendUser", function(user){
            player = user;
            var shouldItAdd = true;
            if(connectedPlayers.length > 0){
                connectedPlayers.forEach(function(u){
                    if(user.username === u.username){
                        shouldItAdd = false;
                    }
                });
                if(shouldItAdd)
                    connectedPlayers.push(user);
            }else{
                connectedPlayers.push(user);
            }
                if(shouldItAdd){
                    io.emit("addedPlayersList", connectedPlayers);
                    io.emit("log", player.username + " connected...");
                }
        });
        socket.on('disconnect', function(){
            var i = 0, playerIndex = -1, dcPlayer;
            connectedPlayers.forEach(function(p){
                if(p.id === player.id){
                    playerIndex = i;
                    dcPlayer = p.username;
                }
                i++;
            });
            if(playerIndex !== -1){
                connectedPlayers.splice(playerIndex, 1);
            }
            io.emit("removedPlayersList", dcPlayer);
            io.emit("log", player.username + " desconnected...");
        });
        socket.on("logFromClient", function(msg){
            io.emit("log", msg);
        });
        
        socket.on("voteToStart", function(user){
            var shouldStart = btnFunctions.voteStart(user, connectedPlayers, votedList);
            io.emit("successVote", {shouldStart: shouldStart, username: user});
        });
        socket.on("gameStarted", function(){
            gameFunctions.registerUsers(connectedPlayers, currentGame.id);
        
        });
        socket.on("firstRoll", function(username){
            var allRolled = btnFunctions.firstRoll(username, playersOrder, connectedPlayers.length);
            io.emit("successRoll", {allRolled: allRolled, playersOrder: playersOrder})
        });
        
        socket.on("testButton", function(){

        });
    });
}
// module.exports = router;
