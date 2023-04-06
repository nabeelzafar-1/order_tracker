const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const authController = controllers.get("AuthController");
const render = controllers.get("RenderController");
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {
    router.get(`${route_base}`, (req, res, next) => {
        const { limit, skip } = req.params;
        User.find({
            _id: {
                $ne: [req.session.user._id]
            }
        }).then(users => {
            console.log(users);
            render.render(res, "secure/users/user_listing", { page: "users", records: users });
        }).catch(e => {

        })
    });
    router.get(`${route_base}/add`, (req, res, next) => {
        render.render(res, "secure/users/add", { page: "user_add" });
    });
    router.get(`${route_base}/details/:username`, (req, res, next) => {
        User.findOne({ username: req.params.username }).then(record => {
            record.superAdmin = record.role === "SUPER_ADMIN"
            console.log(record)
            render.render(res, "secure/users/details", { page: "user_detail", record: record });
        }).catch(e => {
            throw e;
        })
    });
    router.get(`${route_base}/profile`, (req, res, next) => {
        render.render(res, "secure/profile", { page: "profile" });
    });
};

module.exports = routeDefiner;