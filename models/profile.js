const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {type: String, required: true},
  activities: [{
    steps:{
      date: {type: Number},
      howMany: {type:Number}
    },
    running:{
      date: {type:Number},
      howMany: {type:Number}
    }
  }]
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
