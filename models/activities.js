const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userID: {type: String, required: true},
  activity: {type: String, required: true},
  units: {type: String, required: true},
  stats:[{
    date: {type: String},
    howMany: {type:Number},
  }]
})

const Activities = mongoose.model('Activities', activitySchema);

module.exports = Activities;
