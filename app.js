const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();

const apiRoutes = require("./routes/api");
const mongoose = require('mongoose');
const Profile = require('./models/profile')
const Activities = require('./models/activities')

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/activityDB');

passport.use(new BasicStrategy(
  function(username, password, done) {

    Profile.findOne({username: username, password: password})
    .then( function(account){
      if(account){
        done(null, account)
      } else {
        done(null, false)
      }
    })
  }
));

app.use(passport.authenticate('basic', {session: false}))
app.use(apiRoutes);

app.listen(3000, function(){
  console.log('Making a shitty Endomondo');
})
