// const express = require("express");
// const mustache = require("mustache-express");
// const bodyParser = require("body-parser");
// const app = express();
// const mongoose = require('mongoose');
// const Profile = require("./models/profile");
// const apiRoutes = require("./routes/apiRoutes");

const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const app = express();

const apiRoutes = require("./routes/api");
const mongoose = require('mongoose');

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/activityDB');

// var person = new Profile()
// person.username = "Josh"
// person.activities.push({activity: 'stairs', date: 07092017, howMany: 15});
// person.save();


  // Profile.find( {'username': 'Josh', 'activities.activity': 'stairs'})

// app.get('/', function(req, res){
//   Profile.find( {'username': 'Josh'})
//   .then(function(person){
//     console.log(person);
//     res.json({person})
//   })
//   .catch(function(error){
//     console.log(error);
//   })
// })

app.use(apiRoutes);

app.listen(3000, function(){
  console.log('Making a shitty Endomondo');
})
