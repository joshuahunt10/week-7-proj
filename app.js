const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/activityDB');

app.get('/', function(req, res){
  res.render('index', {
    title: 'mustache!'
  })
})

app.listen(3000, function(){
  console.log('Making a shitty Endomondo');
})
