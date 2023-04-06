const paths = global.PATHS;
const models = require(paths.models);
const services = require(paths.services);
const errorHandler = services.get("errorHandler");
const success = services.get("successHandler");
const User = models.get("User");
const bcrypt = require("bcrypt");
const moment = require("moment");

module.exports.resetUsername = async (req, res, next) => {
  let { username } = req.body;
  if (!username) {
    res.status(400).json({ msg: "Username is required." });
  } else if (username.length < 3) {
    res.status(400).json({ msg: "Username should be atleast 3 chars." });
  } else if (username == req.user.username) {
    res
      .status(400)
      .json({ msg: "Username can't be similer to older Username." });
  } else {
    const id = req.user.id;
    User.findById(id)
      .then(async (user) => {
        // const salt = await bcrypt.genSalt();
        // username = await bcrypt.hash(username, salt);
        user.username = username;
        user.save().then((updated) => {
          res.status(200).json({ msg: "Succesfully updated" });
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};

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
module.exports.edit = async (req, res, next) => {
  const { firstName, lastName, password, role, id, status } = req.body;
  if (!id) {
    res.redirect(req.uri);
  } else {
    let passwordHashed = "";

    User.findOne({ _id: id })
      .then(async (record) => {
        if (password) {
          const salt = await bcrypt.genSalt();
          passwordHashed = await bcrypt.hash(password, salt);
        } else {
          passwordHashed = record.password;
        }
        record.firstName = firstName;
        record.lastName = lastName;
        record.password = passwordHashed;
        record.role = role;
        record.status = status;
        record
          .save()
          .then((saved) => {
            console.log("saved--->>", saved);
            // res.redirect('/secure/pages/users/details/' + record.username);
            success(
              req,
              res,
              "/secure/pages/users",
              "Successfully pdated user."
            );
          })
          .then((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        errorHandler(req, res, "/secure/pages/users/details/", e);
      });
  }
};

module.exports.changeProfile = async (req, res, next) => {
  const {
    firstName,
    lastName,
    password,
    newPassword,
    confirmPassword,
    username,
  } = req.body;

  if (!username) {
    console.log("not username", req.body);
    res.redirect(req.uri);
  } else {
    User.findOne({ username })
      .then((record) => {
        let passwordHashed = record.password;
        if (newPassword) {
          if (!password) {
            req.session.flash = {
              class: "danger",
              type: "error",
              message: "Old password is required",
              form: req.body,
            };
            res.redirect("/secure/pages/users/profile");
          } else {
            const userPassword = record.password;
            bcrypt.compare(password, userPassword, async (err, auth) => {
              if (err) console.log(err);
              if (!auth) {
                req.session.flash = {
                  class: "danger",
                  type: "error",
                  message: "Incorrect old password.",
                  form: req.body,
                };
                res.redirect("/secure/pages/users/profile");
              } else {
                const salt = await bcrypt.genSalt();
                passwordHashed = await bcrypt.hash(newPassword, salt);
              }
            });
          }
        }
        record.firstName = firstName;
        record.lastName = lastName;
        record.password = passwordHashed;
        record
          .save()
          .then((saved) => {
            console.log(saved);
            req.session.user = saved;
            res.locals.user = saved;
            // res.redirect('/secure/pages/users/profile')
            success(
              req,
              res,
              "/secure/pages/users/profile",
              "Successfully updated."
            );
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        errorHandler(req, res, "/secure/pages/users/profile", e);
      });
  }
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
