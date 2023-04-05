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

module.exports.resetPassword = async(req, res, next) => {
    const user = req.user;
    if (!user) {
        res.status(500).json({ message: "An authenticated user is required to execute this action. Remember only json requests are allowed for this route." })
    }
    let { password } = req.body;
    if (!password) {
        res.status(400).json({ msg: "Password is required." });
    } else if (password.length < 6) {
        res.status(400).json({ msg: "Password should be atleast 6 chars." });
    } else {
        const id = req.user.id;

        User.findById(id)
            .then(async(user) => {
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
}

module.exports.google = async(req, res, next) => {};