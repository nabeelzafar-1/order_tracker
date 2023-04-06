const PATHS = global.PATHS;
const { Router } = require('express');
const controllers = require(PATHS.controllers);
const authController = controllers.get('AuthController')
const usersController = controllers.get('UsersController')
const render = controllers.get('RenderController')
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const models = require(PATHS.models);
const User = models.get('User');


const routeDefiner = (router, route_base) => {
    router.get(`${route_base}/logout`, (req, res, next) => {
        req.session.destroy();
        res.redirect('/');
    });
    router.post(`${route_base}/add`, usersController.store);
    router.post(`${route_base}/edit`, usersController.edit);
    router.post(`${route_base}/me/edit`, usersController.changeProfile);
}

module.exports = routeDefiner