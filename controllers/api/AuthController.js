const paths = global.PATHS;
const models = require(paths.models);
const User = models.get("User");
const services = require(paths.services);
const controllers = require(paths.controllers);
const errorHandler = services.get("apiError");
const render = controllers.get("RenderController");
const makeTokens = services.get("maketokens");
const bcrypt = require("bcrypt");
const moment = require("moment");
const constants = require(global.PATHS.constants);


module.exports.signup = async(req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);
    User.create({
            firstName,
            lastName,
            username,
            email,
            password: passwordHashed,
        })
        .then((created) => {
            tokens = makeTokens(created._id);
            res.redirect("/public/login");;
        })
        .catch((e) => {
            console.log("sd",e);
            const errors = errorHandler(e);
            res.status(400).json({ errors: errors });
        });
};

module.exports.login = async(req, res, next) => {
    console.log("in function");
    const { username, password } = req.body;
    console.log(req.body);
    if (!username) {
        res.status(400).json({ message: "Username is required." });
    }
    if (!password) {
        res.status(400).json({ message: "Password is required." });
    }
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                res.status(400).json({ message: "Account does't exists." });
            } else {
                bcrypt.compare(password, user.password, async(err, auth) => {
                    if (!auth) {
                        res.status(400).json({ message: "Invalid credentials." });
                        // render.render(res, 'secure/home', { page: 'home', user: user });
                        // res.render('secure/home');
                    } else {
                        tokens = makeTokens(user._id);
                        res.status(200).json({ tokens, user: user });
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Something went wrong." });
        });
};

module.exports.google = async(req, res, next) => {};