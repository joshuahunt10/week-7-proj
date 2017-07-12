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

// Make a new person.
// var person = new Profile()
// person.username = "josh"
// person.password = "123"
// person.activities.push({activity: 'stairs', date: Date.now(), howMany: 15, units: 'cases'});
// person.save();

// // Add a new activity
// var sport = new Activities()
// sport.userID = '59669a716fed644454683015'
// sport.activity = 'walking'
// sport.units = 'steps'
// sport.stats.push({
//   date: Date.now(),
//   howMany: 5000
// })
// sport.save().then(function(sport){
//   Profile.findOne({'_id': '59669a716fed644454683015'})
//   .then(function(person){
//     person.activities.push({
//       activity: sport.activity,
//       id: sport._id
//     })
//     person.save()
//   })
// })




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
