const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {type: String, required: true},
  activities: [{
    activity: {type: String, required: true},
    date: {type: Number},
    howMany: {type:Number}
  }]
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
