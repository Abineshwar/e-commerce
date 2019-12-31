var express=require('express');
 var app=express();
 const bodyParser = require('body-parser');
 var session = require('express-session');
 var urlencodedParser = bodyParser.urlencoded({ extended: false });

 app.use(session({secret : 'nbaad'}));


 app.set('view engine','ejs');
 app.use('/assets', express.static('resources'));

 var route=require('./controller/catalogController.js');
var profile = require('./controller/profilecontroller.js');
app.use('/',route);
//app.use('/categories',route);
//app.use('/categories/:categoryName',route);
//app.use('/categories/item',route);
//app.use('/categories/item/:itemCode',route);
//app.use('/about',route);
//app.use('/contact',route);
//app.use('/myItems',route);
//app.use('/feedback',route);
app.use('/profile',profile);
//SSapp.use('/*',route);
app.listen(8080);
