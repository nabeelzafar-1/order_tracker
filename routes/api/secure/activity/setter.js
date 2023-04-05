const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const authController = controllers.get("api.AuthController");
const screenActivityController = controllers.get(
  "api.ScreenActivitesController"
);
const usersController = controllers.get("UsersController");
const render = controllers.get("RenderController");
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const errorHandler = services.get("apiError");

const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {
  router.post(`${route_base}/screen`, screenActivityController.store);
  router.post(`${route_base}/screen/end`, screenActivityController.endTime);
  // router.post(`${route_base}/edit`, usersController.edit);
  // router.post(`${route_base}/me/edit`, usersController.changeProfile);
};

module.exports = routeDefiner;
