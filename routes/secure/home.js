const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const authController = controllers.get("AuthController");
const homeController = controllers.get("HomeController");
const render = controllers.get("RenderController");
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {
  router.get(`${route_base}`, (req, res, next) => {
    const { limit, skip } = req.params;    
});
  router.get(`${route_base}/home`, homeController.home);
};

module.exports = routeDefiner;
