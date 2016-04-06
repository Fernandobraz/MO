var express = require('express');
var passport = require('passport');
var Account = require('../models/user');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { title: "Munchkin Online", user : req.user });
});

module.exports = router;