var express = require('express');
var router = express.Router();
var breadcrumbs = require('express-breadcrumb');
var appUtil = require('../utility/appUtil');
var itemDb = require('../utility/ItemDB');
var UserDB = require('../utility/userDB');
var UserItemDB = require('../utility/userItemDB');

router.get('/', breadcrumbs.Middleware(), function(req, res, next) {
    var data= {
        title:'Home',
        path: req.url,
        user: req.session.theUser
    }
    console.log(data.user);
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
  res.render('index', { data:data, breadcrumbs: req.breadcrumbs });
});
router.get('/categories', breadcrumbs.Middleware(), function (req, res, next) {
  var ItemPromise = itemDb.getItems();
  ItemPromise.then(function(items){
    var categories = getCategories(items);
    var data = {
      pageTitle: "Categories",
      path: req.url,
      categories: categories,
      items: items,
      user: req.session.theUser
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    res.render('categories', { data: data , breadcrumbs: req.breadcrumbs});

  });
});
router.get('/categories/item', breadcrumbs.Middleware(), function(req, res, next){
  var ItemPromise = itemDb.getItems();
  ItemPromise.then(function(items){
    var categories = getCategories(items);
    var data = {
      pageTitle: "Categories",
      categories: categories,
      path: req.url,
      item: items,
      user: req.session.theUser
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
  //  console.log("req.breadcrumbs:"+JSON.stringify(req.breadcrumbs))
    res.render('categories', { data: data , breadcrumbs: req.breadcrumbs});
  });
});

router.get('/contact', breadcrumbs.Middleware(), function(req, res, next) {
    var data= {
        title:'Contact Us',
        path: req.url,
        user: req.session.theUser
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    res.render('contact', {data: data, breadcrumbs: req.breadcrumbs});
});
router.get('/about',breadcrumbs.Middleware(), function(req, res, next) {
    var data= {
        title:'About Us',
        path: req.url,
        user: req.session.theUser
    }
    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    res.render('about', {data: data, breadcrumbs: req.breadcrumbs});
});

router.get('/categories/item/:item_code', breadcrumbs.Middleware(), function (req, res,next) {
  var ItemPromise = itemDb.getItem(req.params.item_code);
  console.log(req.params.item_code);
  ItemPromise.then(function(item){
    if(item){
      var data = {
        item: item,
        path: req.url,
        user: req.session.theUser
      }
      console.log(data.item);
      req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
      res.render('Item', { data: data, breadcrumbs: req.breadcrumbs});

    }else{
      res.redirect('/categories');
    }
  });
});



router.get('/myItems', breadcrumbs.Middleware(), function(req, res, next) {
  if(req.session.theUser === undefined){
    console.log("myyyyyy");
    res.redirect('/');
  }else{
    var data = {
      pageTitle: "My Items",
      user: req.session.theUser

    };
    console.log("nnnnnnn");
    //console.log(req.session.useritems);
    console.log(data.user);
    //console.log(data.userProfile);
    ///console.log(req.session.theUser.userItems);

    req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    res.render('myItems', {data: data, breadcrumbs: req.breadcrumbs});
  }
});
//router.get('/feedback', breadcrumbs.Middleware(), function(req, res, next) {
  //  var page= {
    //    title:'feedback',
      //  path: req.url
    //}
  //  req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
  //  res.render('feedback', {data: data, breadcrumbs: req.breadcrumbs});
//});



router.get('/feedback/:id',breadcrumbs.Middleware(), function (req, res,next) {
  var id = req.params.id;
  var userID = req.session.theUser._userId;
  userItemPromise = UserItemDB.getUserItem(userID, id)
  userItemPromise.then(function(userItem) {
  var data = {
    title: "feedback",
    item: userItem,
    user: req.session.theUser
  };
  console.log("insie feedback while pressing confirm rating",data.user);
  console.log("insie feedback while pressing confirm rating (item)",data.item);
  req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
  res.render('feedback', {data: data, breadcrumbs: req.breadcrumbs});
})
});

//router.get('/*', breadcrumbs.Middleware(), function(req, res, next) {
  //  var data= {
    //    title:'404',
      //  path: req.url,
        //user: req.session.theUser
    //}
    //req.breadcrumbs = appUtil.cleanUrl(req.breadcrumbs);
    //res.render('error', {data: data, breadcrumbs: req.breadcrumbs});
//});
var getCategories = function(data) {
    var categories = [];
    data.forEach(function (item) {
        if(!categories.includes(item.catalogCategory)){
            categories.push(item.catalogCategory);
        }
    });
    return categories;
};


module.exports = router;
