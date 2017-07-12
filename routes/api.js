const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");
const Activities = require("../models/activities")

router.get('/activities', function(req, res){
  Profile.findOne( {'_id': req.user._id})
  .then(function(person){
    res.json({person: person})
  })
  .catch(function(error){
    console.log(error);
  })
})

router.get('/activities/:sportID', function(req, res){
  Activities.findOne({'_id': req.params.sportID})
  .then(function(sport){
    res.json({sport: sport})
  })

})

router.post('/activities', function(req, res){
  var sport = new Activities()
  sport.userID = req.user._id
  sport.activity = req.body.activity
  sport.units = req.body.units
  sport.save().then(function(sport){
    Profile.findOne({'_id': req.user._id})
    .then(function(person){
      person.activities.push({
        activity: sport.activity,
        id: sport._id
      })
      person.save().then(function(person){
        res.json({person: person})
      })
    })
  })
})


module.exports = router;
