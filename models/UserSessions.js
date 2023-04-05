const mongoose = require("mongoose");
const User = require("./User");
const moment = require("moment");

const UserSessionsSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  start: {
    type: Date,
    default: moment().format(),
  },
  end: {
    type: Date,
  },
});

const UserSessions = mongoose.model("UserSessions", UserSessionsSchema);
module.exports = UserSessions;
