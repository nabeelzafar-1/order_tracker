const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);

const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {



};

module.exports = routeDefiner;