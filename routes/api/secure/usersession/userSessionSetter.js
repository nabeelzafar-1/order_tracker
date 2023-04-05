const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const authController = controllers.get("api.AuthController");
const userSessionController = controllers.get("api.UserSessionController");
const usersController = controllers.get("UsersController");
const render = controllers.get("RenderController");
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const errorHandler = services.get("apiError");

const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {
  router.post(`${route_base}/usersession`, userSessionController.usersession);
  router.post(`${route_base}/usersession/end`, userSessionController.end);
};

module.exports = routeDefiner;
