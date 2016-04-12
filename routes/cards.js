var express = require('express');
var mongoose = require('mongoose');
var Monster = require('../models/doorMonsterCards');
var Door = require('../models/doorCards');
var Item = require('../models/treasureItemCards');
var Treasure = require('../models/treasureCards');
var router = express.Router();

// var Monster = mongoose.model('doorMonster');
var monsterList, doorList, itemList, treasureList; 


router.get('/', function (req, res) {
    Monster.find({}, function(err, monsters){
        monsterList = monsters;
    });
    Door.find({}, function(err, doors){
        doorList = doors;
    });
    Item.find({}, function(err, items){
        itemList = items;
    });
    Treasure.find({}, function(err, treasure){
        treasureList = treasure;
    });
    res.render('cards/index.ejs', { title: "List of cards", user : req.user, monsters: monsterList, doors: doorList, items: itemList, treasures: treasureList  });
});

// Monster cards
router.get('/monster/new', function(req, res){
    res.render('cards/monster/new.ejs', { title: "New Monster", user : req.user });
});

router.post('/monster/post', function(req, res){
    var name = req.body.name;
    var level = req.body.level;
    var description = req.body.description;
    var badstuff = req.body.badstuff;
    var levelprize = req.body.levelprize;
    var treasureprize = req.body.treasureprize;
    var isundead = req.body.isundead;
    var message;
    
    if(name === "" || level === "" || description === "" || badstuff === ""){
        message = "You forgot to fill up some important stuff! Try again.";
        res.render('cards/monster/new.ejs', { title: "New Monster", user : req.user, message: message });
    }
    if(levelprize === ""){
        levelprize = "1";
    }
    if(treasureprize === ""){
        treasureprize = "1";
    }
    
    if(req.body.id){
            Monster.findByIdAndUpdate(req.body.id, {
                name : name,
                level : level,
                description : description,
                badstuff : badstuff,
                levelprize : levelprize,
                treasureprize: treasureprize,
                isundead: isundead 
            }, function(err, monster){
                if(err) throw err;
                
               res.render('cards/monster/view.ejs', { title: monster.name, user : req.user, monster: monster });
            });
        }
        else{
            var newMonster = Monster({
                name : name,
                level : level,
                description : description,
                badstuff : badstuff,
                levelprize : levelprize,
                treasureprize: treasureprize,
                isundead: isundead
            });
            newMonster.save(function(err){
                if(err) throw err;
                res.location("cards");
                res.redirect("/cards");
            });
        }
});
router.get("/monster/view/:id", function(req, res){
    Monster.findById({ _id: req.params.id }, function(err, monster){
        if(err) throw err;

        res.render('cards/monster/view.ejs', { title: monster.name, user : req.user, monster: monster });
    }); 
});
router.get("/monster/edit/:id", function(req, res){
    Monster.findById({ _id: req.params.id }, function(err, monster){
        if(err) throw err;

        res.render('cards/monster/edit.ejs', { title: "Edit " + monster.name, user : req.user, monster: monster });
    }); 
});
 router.delete('/monster/delete/:id', function(re, res){
    Monster.findByIdAndRemove(req.body.id, function(err){
        if(err) throw err;
        
        res.render('cards/index.ejs', { title: "List of cards", user : req.user, monsters: monsterList, doors: doorList, items: itemList });
    });
});
// Monster cards end
// Door Cards
router.get('/door/new', function(req, res){
    res.render('cards/door/new.ejs', { title: "New Door", user : req.user });
});

router.post('/door/post', function(req, res){
    var name = req.body.name;
    var type = req.body.type;
    var description = req.body.description;
    var occurrence = req.body.occurrence;
    var message;
    
    if(name === "" || type === "" || description === ""){
        message = "You forgot to fill up some important stuff! Try again.";
        res.render('cards/door/new.ejs', { title: "New Door", user : req.user, message: message });
    }
    if(occurrence === ""){
        occurrence = "1";
    }
    
    if(req.body.id){
            Door.findByIdAndUpdate(req.body.id, {
                name : name,
                type : type,
                description : description,
                occurrence: occurrence 
            }, function(err, door){
                if(err) throw err;
                
               res.render('cards/door/view.ejs', { title: door.name, user : req.user, door: door });
            });
        }
        else{
            var newDoor = Door({
                name : name,
                type : type,
                description : description,
                occurrence: occurrence
            });
            newDoor.save(function(err){
                if(err) throw err;
                res.location("cards");
                res.redirect("/cards");
            });
        }
});
router.get("/door/view/:id", function(req, res){
    Door.findById({ _id: req.params.id }, function(err, door){
        if(err) throw err;

        res.render('cards/door/view.ejs', { title: door.name, user : req.user, door: door });
    }); 
});
router.get("/door/edit/:id", function(req, res){
    Door.findById({ _id: req.params.id }, function(err, door){
        if(err) throw err;

        res.render('cards/door/edit.ejs', { title: "Edit " + door.name, user : req.user, door: door });
    }); 
});
router.delete('/door/delete/:id', function(re, res){
    Door.findByIdAndRemove(req.body.id, function(err){
        if(err) throw err;
        
        res.render('cards/index.ejs', { title: "List of cards", user : req.user, monsters: monsterList, doors: doorList, items: itemList });
    });
});
// Door Cards ends
// Item Cards
router.get('/item/new', function(req, res){
    res.render('cards/item/new.ejs', { title: "New Item", user : req.user });
});

router.post('/item/post', function(req, res){
    var name = req.body.name;
    var bonus = req.body.bonus;
    var description = req.body.description;
    var restriction = req.body.restriction;
    var bodypart = req.body.bodypart;
    var isbig = req.body.isbig;
    var message;
    
    if(name === "" || bonus === "" || description === ""){
        message = "You forgot to fill up some important stuff! Try again.";
        res.render('cards/item/new.ejs', { title: "New Item", user : req.user, message: message });
    }
    
    if(req.body.id){
           Item.findByIdAndUpdate(req.body.id, {
                name : name,
                bonus : bonus,
                description : description,
                restriction: restriction,
                bodypart: bodypart,
                isbig: isbig
            }, function(err, item){
                if(err) throw err;
               
               res.redirect("/cards/item/view/" + item._id); 
            //    res.render('cards/item/view.ejs', { title: item.name, user : req.user, item: item, id: item._id });
            });
        }
        else{
            var newItem = Item({
                name : name,
                bonus : bonus,
                description : description,
                restriction: restriction,
                bodypart: bodypart,
                isbig: isbig
            });
            newItem.save(function(err){
                if(err) throw err;
                // res.location("cards");
                res.redirect("/cards");
            });
        }
});
router.get("/item/view/:id", function(req, res){
    Item.findById({ _id: req.params.id }, function(err, item){
        if(err) throw err;

        res.render('cards/item/view.ejs', { title: item.name, user : req.user, item: item });
    }); 
});
router.get("/item/edit/:id", function(req, res){
    Item.findById({ _id: req.params.id }, function(err, item){
        if(err) throw err;

        res.render('cards/item/edit.ejs', { title: "Edit " + item.name, user : req.user, item: item });
    }); 
});
router.delete('/item/delete/:id', function(re, res){
    Item.findByIdAndRemove(req.body.id, function(err){
        if(err) throw err;
        
        res.render('cards/index.ejs', { title: "List of cards", user : req.user, monsters: monsterList, doors: doorList, items: itemList });
    });
});
// Item Cards ends
// Treasure Cards
router.get('/treasure/new', function(req, res){
    res.render('cards/treasure/new.ejs', { title: "New Treasure", user : req.user });
});

router.post('/treasure/post', function(req, res){
    var name = req.body.name;
    var type = req.body.type;
    var description = req.body.description;
    var goldvalue = req.body.goldvalue;
    var message;
    
    if(name === "" || type === "" || description === ""){
        message = "You forgot to fill up some important stuff! Try again.";
        res.render('cards/treasure/new.ejs', { title: "New Treasure", user : req.user, message: message });
    }
    
    if(req.body.id){
           Treasure.findByIdAndUpdate(req.body.id, {
                name : name,
                type : type,
                description : description,
                goldvalue: goldvalue
            }, function(err, treasure){
                if(err) throw err;
                
               res.render('cards/treasure/view.ejs', { title: treasure.name, user : req.user, treasure: treasure });
            });
        }
        else{
            var newTreasure = Treasure({
                name : name,
                type : type,
                description : description,
                goldvalue: goldvalue
            });
            newTreasure.save(function(err){
                if(err) throw err;
                res.location("cards");
                res.redirect("/cards");
            });
        }
});
router.get("/treasure/view/:id", function(req, res){
    Treasure.findById({ _id: req.params.id }, function(err, treasure){
        if(err) throw err;

        res.render('cards/treasure/view.ejs', { title: treasure.name, user : req.user, treasure: treasure });
    }); 
});
router.get("/treasure/edit/:id", function(req, res){
    Treasure.findById({ _id: req.params.id }, function(err, treasure){
        if(err) throw err;

        res.render('cards/treasure/edit.ejs', { title: "Edit " + treasure.name, user : req.user, treasure: treasure });
    }); 
});
router.delete('/treasure/delete/:id', function(re, res){
    Treasure.findByIdAndRemove(req.body.id, function(err){
        if(err) throw err;
        
        res.render('cards/index.ejs', { title: "List of cards", user : req.user, monsters: monsterList, doors: doorList, items: itemList });
    });
});
// Treasure Cards ends
module.exports = router;