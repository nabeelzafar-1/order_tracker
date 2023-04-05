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
        // User.find({
        //     _id: {
        //         $ne: [req.session.user._id]
        //     }
        // }).then(users => {
        // console.log(users);
        render.render(res, "public/register", { page: "register" });
        // }).catch(e => {

        // })
    });
};

module.exports = routeDefiner;