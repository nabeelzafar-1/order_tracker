const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const usersController = controllers.get("api.UsersController");
const forgotController = controllers.get("ForgotsController");
const render = controllers.get("RenderController");
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {
    router.post(`${route_base}/resetpassword`, usersController.resetPassword);
    // router.post(`${route_base}/edit`, usersController.edit);
    // router.post(`${route_base}/me/edit`, usersController.changeProfile);
};

module.exports = routeDefiner;