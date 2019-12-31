var express = require('express');
//var breadcrumbs = require('express-breadcrumb');
var router = express.Router();
var item_db = require('./../utility/ItemDB')
var UserDB = require('../utility/userDB')
var validator=require('express-validator');
router.use(validator());

var UserItemDB = require('../utility/userItemDB')

var UserItemModel = require('./../model/UserItem')
var UserItem = UserItemModel.UserItem;
var UserItemSchema = UserItemModel.UserItemSchema;

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//router.get('/login', function (req, res) {
  //var userPromise = UserDB.getUser(1);
  //userPromise.then(function(user) {
    //req.session.theUser = user;
    //userItemPromise = UserItemDB.getUserItems(user._userId)
    //userItemPromise.then(function(userItems) {
      //req.session.theUser.userItems = userItems;
      //res.redirect('/myitems');
    //})
  //})
//});

router.get('/login', function (req, res) {
  if(req.session.theUser){
    res.redirect("/myitems")
  }else{
    var data = {
      pageTitle: "Login"
    }
    res.render("login", {data: data});
  }
});

router.post('/login', urlencodedParser, function (req, res) {
  req.check('username','Invalid Email Format').isEmail().normalizeEmail();
  req.check('password','Invalid Password').isAlphanumeric();
  var errors=req.validationErrors();
  var data = {
    pageTitle: "Login"
  }
  if (errors){
    res.render('login', {errors: errors, data: data});
  }else{
    var username = req.body.username;
    var password = req.body.password;
    var userPromise = UserDB.getUser(username, password);
    userPromise.then(function(user) {
      if(user){
        req.session.theUser = user;
        userItemPromise = UserItemDB.getUserItems(user._userId)
        userItemPromise.then(function(userItems) {
          req.session.theUser.userItems = userItems;
          req.session.theUser.successMsg = true;
          res.redirect('/myitems');
        })
      }
    }).catch(function(error){
      var errors = [];
      var error = {};
      error.msg = "Username or Password is wrong. Please try again.";
      errors.push(error);
      res.render('login', {errors: errors, data: data});
    });
  }
});


router.get('/signout', function (req, res) {
  req.session.theUser = undefined;
  res.redirect('/');
});

router.post('/:id/rating',urlencodedParser, function (req, res) {
  if(req.session.theUser === undefined){
    res.redirect('/');
  }else{
    req.check('rating','Invalid rating').isNumeric();
    req.check('readit','Invalid readIt').isBoolean();
    var errors=req.validationErrors();

    if (errors){
      res.redirect("/feedback/"+req.params.id);
    }else{
      var id = req.params.id;
      var user_id = req.session.theUser._userId;
      var rating = req.body.rating;
      var readit = req.body.readit;

      console.log("aaaan",user_id);
      console.log("aaab",rating);
      console.log("aac",readit);
      var userItemPromise = UserItemDB.updateUserItem(user_id, id, rating, readit);
      userItemPromise.then(function(userItems){
        delete req.session.theUser.message
        req.session.theUser.userItems = userItems;
        console.log("bbbbbb",userItems);
        res.redirect('/myitems');
      });
    }
  }
});
router.post('/:id/save', function (req, res) {
  if(req.session.theUser === undefined){
    res.redirect('/');
  }else{
    var itemCode = req.params.id;
    var userItemPromise = UserItemDB.addUserItem(req.session.theUser._userId, itemCode, 0, false);
    userItemPromise.then(function(userItems){
      delete req.session.theUser.message
      req.session.theUser.userItems = userItems;
      res.redirect('/myitems');
    },(function(userItems){
      req.session.theUser.message = "Item already present";
      req.session.theUser.userItems = userItems;
      res.redirect('/myitems');
    })
    )
  }
});


router.post('/:id/delete', function (req, res) {
  if(req.session.theUser === undefined){
    res.redirect('/');
  }else{
    var itemCode = req.params.id;
    var userItemPromise = UserItemDB.deleteUserItem(req.session.theUser._userId, itemCode);
    userItemPromise.then(function(userItems){
      delete req.session.theUser.message
      req.session.theUser.userItems = userItems;
      res.redirect('/myitems');
    })
  }
});


module.exports = router;
