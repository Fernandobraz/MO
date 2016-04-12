var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', function (req, res) {
    if(typeof(req.user) === "undefined"){
        res.redirect("/login");
    }else{
        res.render('game/index', { title: "Connection test", user : req.user });  
    }
});
module.exports = router;
