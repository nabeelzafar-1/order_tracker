const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const moment = require("moment");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: [true, "This email is already in use."],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  firstName: {
    type: String,
    required: [true, "Please enter a First Name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter a Last Name."],
  },

  username: {
    type: String,
    required: [true, "Please enter a Username."],
    unique: [true, "This Username is already in use."],
    minlength: [3, "The password should be at least 3 chars."],
  },
  password: {
    type: String,
    // required: [true, 'Please enter a password.'],
    minlength: [6, "The password should be at least 6 chars."],
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "SUPER_ADMIN"],
    default: "USER",
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ENABLED", "DISABLED", "PANIC"],
    default: "ENABLED",
  },
  credits: {
    type: String,
    default: "0",
  },
  lastlogin: {
    type: Date,
  },
  created: {
    type: Date,
    default: moment().format(),
    required: true,
  },
});
// userSchema.pre('save', async function(next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log(salt);
//     console.log(this.password);
//     next();
// });
// userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({ email: email });
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if (auth) return user;
//         else throw Error('Invalid');
//     } else throw Error('Not found');
// };

const User = mongoose.model("user", userSchema);
module.exports = User;
