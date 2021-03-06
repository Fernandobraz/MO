var User     = require('../models/user');
var mongoose = require('mongoose');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    // app.get('/', function(req, res) {
    //     res.render('index.ejs'); // load the index.ejs file
    // });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('users/login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
   app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/register', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('users/register.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/register', passport.authenticate('local-register', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('users/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
     // =====================================
    // PROFILE EDIT =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile-edit', isLoggedIn, function(req, res) {
        res.render('users/profile-edit.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
    app.post("/profile-update", isLoggedIn, function(req, res){
       var id = req.body.id;
       var firstname = req.body.firstname; 
       var lastname = req.body.lastname; 
       var email = req.body.email;
       var gender = req.body.gender;
       
       User.findById(id, function(err, user){
           user.update({
               firstname: firstname,
               lastname: lastname,
               email: email,
               gender: gender
           }, function(err, userId){
               if(err){
                res.send("There was a problem updating the information to the database: " + err);                   
               }else{
                res.redirect("/profile");
               }
           });
       });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}