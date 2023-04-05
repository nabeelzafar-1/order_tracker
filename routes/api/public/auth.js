const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const authController = controllers.get("api.AuthController");
const forgotController = controllers.get("ForgotsController");
const render = controllers.get("RenderController");
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {
    router.post(`${route_base}/user/login`, authController.login);
    router.post(`${route_base}/user/signup`, authController.signup);
    router.post(`${route_base}/user/forgotpassword`, forgotController.passwordRequest);
    router.post(`${route_base}/user/verifycode`, forgotController.verifyCode);
    // router.post(`${route_base}/edit`, usersController.edit);
    // router.post(`${route_base}/me/edit`, usersController.changeProfile);
};

module.exports = routeDefiner;