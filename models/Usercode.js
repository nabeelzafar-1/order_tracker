const mongoose = require("mongoose");

const userCodeSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  code: {
    type: String,
  },
  expiry: {
    type: Date,
  },
  created: {
    type: Date,
  },
});

const Usercode = mongoose.model("Usercode", userCodeSchema);
module.exports = Usercode;
