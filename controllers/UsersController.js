const paths = global.PATHS;
const models = require(paths.models);
const services = require(paths.services);
const errorHandler = services.get("errorHandler");
const success = services.get("successHandler");
const User = models.get("User");
const bcrypt = require("bcrypt");
const moment = require("moment");



module.exports.store = async (req, res, next) => {
  const { username, email, firstName, lastName, password, role } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHashed = await bcrypt.hash(password, salt);
  const userCreator = {
    username,
    firstName,
    lastName,
    role,
    email,
    password: passwordHashed,
    created: moment().toDate(),
  };
  User.create(userCreator)
    .then((created) => {
      success(req, res, "/secure/pages/users", "Successfully added user.");
      // res.redirect('/secure/pages/users');
    })
    .catch((e) => {
      errorHandler(req, res, "/secure/pages/users/add", e);
    });
};




module.exports.resetPassword = async (req, res, next) => {
  let { password } = req.body;
  if (!password) {
    res.status(400).json({ msg: "Password is required." });
  } else if (password.length < 6) {
    res.status(400).json({ msg: "Password should be atleast 6 chars." });
  } else {
    const id = req.user.id;
    User.findById(id)
      .then(async (user) => {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        user.password = password;
        user.save().then((updated) => {
          res.status(200).json({ msg: "Succesfully updated" });
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};
