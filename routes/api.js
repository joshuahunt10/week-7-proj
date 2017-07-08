const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

router.get('/', function(req, res){
  Profile.find( {'username': 'Josh'})
  .then(function(person){
    console.log(person);
    res.json({person})
  })
  .catch(function(error){
    console.log(error);
  })
})

module.exports = router;
