var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var Game = require('../models/game');
var GameUsers = require('../models/gameUsers');
var router = express.Router();

var currentGame;
Game.findOne({}, function(err, game){
    currentGame = game;
});

router.get('/', function (req, res) {
    var gameAccessDenied = true;
    if(typeof(req.user) !== "undefined"){
        if(currentGame.hasStarted){
            GameUsers.find({userId: req.user._id, gameId: currentGame._id}, function(err, gu){
               if(gu.length > 0){
                   gameAccessDenied = false
               }
               res.render('index', { title: "Munchkin Online", user : req.user, gameAccessDenied: gameAccessDenied });
            });
        }        
    }else{
        res.render('index', { title: "Munchkin Online", user : req.user, gameAccessDenied: gameAccessDenied });
    }
});

module.exports = router;