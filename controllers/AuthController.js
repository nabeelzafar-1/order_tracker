const paths = global.PATHS;
const models = require(paths.models);
const User = models.get("User");
const services = require(paths.services);
const controllers = require(paths.controllers);
const errorHandler = services.get('errorHandler');
const render = controllers.get('RenderController');
const makeTokens = services.get('maketokens');
const bcrypt = require('bcrypt');
const moment = require('moment');
const constants = require(global.PATHS.constants);

module.exports.login = async(req, res, next) => {
    const { username, password, remember } = req.body;
    console.log(req.body);
    if (!username) {
        req.flash("error", "Username is required");
        res.locals.message = req.flash();
        res.redirect("/");
    }
    if (!password) {
        req.session.flash = {
            class: "danger",
            type: "error",
            message: "Password is required.",
            form: req.body,
        };
        res.redirect("/");
    }
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                req.session.flash = {
                    class: "danger",
                    type: "error",
                    message: "Account does't exists.",
                    form: req.body,
                };
                res.redirect("/");
            } else {
                bcrypt.compare(password, user.password, async(err, auth) => {
                    if (!auth) {
                        req.session.flash = {
                            class: 'danger',
                            type: 'error',
                            // message: 'Account does\'t exists.',
                            message: 'Wrong password',
                            form: req.body
                        }
                        res.redirect("/");
                        // render.render(res, 'secure/home', { page: 'home', user: user });
                        // res.render('secure/home');
                    } else {
                        if (user.status == "DISABLED") {
                            req.session.flash = {
                                class: 'danger',
                                type: 'error',
                                // message: 'Account does\'t exists.',
                                message: 'Your account has been disabled please contact on support@klg.com.',
                                form: req.body
                            }
                            res.redirect("/");
                        }
                        console.log(remember);
                        if (remember) {
                            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30 * 12;
                        }
                        req.session.user = user;
                        res.redirect('secure/home')
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
            errorHandler(req, res, '/', err);
            // throw err;
        });
};

module.exports.google = async(req, res, next) => {};