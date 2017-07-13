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

router.get('/activities/:sportID', function(req, res){
  Activities.findOne({'_id': req.params.sportID})
  .then(function(sport){
    res.json({sport: sport})
  })
})

router.put('/activities/:sportID', function( req, res){
  Activities.findOne({'_id': req.params.sportID})
  .then(function(sport){
    const oldActivity = sport.activity
    sport.activity = req.body.activity
    sport.save()
    .then(function(sport){
      Profile.findOne({'_id': sport.userID})
      .then(function(user){
        for (var i = 0; i < user.activities.length; i++) {
          if(user.activities[i].activity === oldActivity){
            console.log('in the in statment');
            user.activities[i].activity = req.body.activity
          }
        }
        user.save()
        .then(function(user){
          res.json({user: user})
        })
      })
    })
  })
})

router.delete('/activities/:sportID', function(req, res){
  Activities.findOne({'_id': req.params.sportID})
  .then(function(sport){
    const oldActivityID = sport._id
    const userID = sport.userID
    sport.remove({'_id': sport._id})
    .then(function(sport){
      Profile.update(
        {'_id': sport.userID},
        {$pull: {activities: {id: sport._id}}},
        {multi:true}
      )
      .then(function(user){
        console.log(user);
        res.json({user: user})
      })
    })
  })
})

router.post('/activities/:sportID/stats', function(req, res){
  Activities.findOne({'_id': req.params.sportID})
  .then(function(sport){
    for (var i = 0; i < sport.stats.length; i++) {
      if(sport.stats[i].date === req.body.date){
        sport.stats.howMany = req.body.howMany
      }
    }
    sport.stats.push({
      date: req.body.date,
      howMany: req.body.howMany
    })
    sport.save().then(function(sport){
      res.json({sport: sport})
    })
  })
})

router.delete('/stats/:sportID', function(req, res){
  Activities.update(
    {'_id': req.params.sportID},
    {$pull: {stats: {date: req.body.date}}},
    {multi:true}
  ).then(function(sport){
    res.json({sport: sport})
  })
})

module.exports = router;
