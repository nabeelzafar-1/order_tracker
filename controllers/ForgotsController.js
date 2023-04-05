const paths = global.PATHS;
const models = require(paths.models);
const User = models.get("User");
const Usercode = models.get("Usercode");
const services = require(paths.services);
const errorHandler = services.get("errorHandler");
const makeTokens = services.get("maketokens");
const bcrypt = require("bcrypt");
const moment = require("moment");
const nodemailer = require("nodemailer");
const mailgun = require("mailgun-js");
// const mg = mailgun({
//     apiKey: process.env.MAILGUN_APIKEY,
//     domain: process.env.SMTP_USERNAME,
//     // host: "api.us.mailgun.net",
// });
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST, // Gmail Host
//     port: process.env.SMTP_PORT, // Port
//     secure: true, // this is true as port is 465
//     auth: {
//         user: process.env.SMTP_USERNAME, // generated ethereal user
//         pass: process.env.SMTP_PASSWORD, // generated ethereal password
//     },
// });

module.exports.passwordRequest = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ email: "Email is required." });
  }
  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        res.status(400).json({ email: "Account does't exists" });
      }
      const codeObj = {
        owner: user._id,
        created: moment(),
      };
      for (let i = 0; i < process.env.MAX_TRIES; i++) {
        const code = Math.floor(100000 + Math.random() * 900000);
        // const code = 810719;
        console.log(i);
        const isCodeExists = await Usercode.exists({ code });
        if (!isCodeExists) {
          codeObj.code = code;
          break;
        } else if (i + 1 == process.env.MAX_TRIES) {
          res.status(400).json({ msg: "Could't generate code." });
          return;
        }
      }
      const expiry = moment(moment().add(3, "m")).format();
      codeObj.expiry = expiry;
      Usercode.create(codeObj)
        .then((created) => {
          // mg.messages().send({
          //     from: '"Envko" zahoorulhaq37@gmail.com', // sender address
          //     to: "zahoorulhaq37@hotmail.com", // list of receivers
          //     subject: "Forgot Password", // Subject line
          //     //text: "Hello world?", // plain text body
          //     text: `Don't worry use this <b>${created.code}</b> code to reset password`, // html body
          // }, function(err, body) {
          //     if (err) {
          //         console.log("err====>>>", err);
          //     } else {
          res.status(200).json(created);
          //     }
          // });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.verifyCode = async (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).json({ msg: "Code is required." });
  }
  Usercode.findOne({ code })
    .then(async (record) => {
      if (!record) {
        res.status(400).json({ msg: "Invalid Code." });
      } else {
        const expiry = record.expiry;
        const now = moment();
        if (moment(now).isSameOrBefore(expiry, "minutes")) {
          const user = await User.findOne({ _id: record.owner });
          console.log("user=====>>>", user);
          if (user) {
            console.log(user._id);
            const tokens = makeTokens(user._id);
            res.status(200).json({ success: true, token: tokens.token });
          }
        } else {
          res.status(400).json({ msg: "Code is expired." });
        }
      }
    })
    .catch((err) => {
      throw err;
    });
};
