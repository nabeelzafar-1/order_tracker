const PATHS = global.PATHS;
const { Router } = require("express");
const Customer = require("../../../../models/medicalPractice");
const controllers = require(PATHS.controllers);
const authController = controllers.get("AuthController");
const render = controllers.get("RenderController");
const middlewares = require(PATHS.middlewares);
const services = require(PATHS.services);
const models = require(PATHS.models);
const User = models.get("User");

const routeDefiner = (router, route_base) => {
    // router.get(`${route_base}`, (req, res, next) => {
    //     const { limit, skip } = req.params;
    //     render.render(res, "secure/customer/add", { page: "add" });
    // });
    router.get(`${route_base}/add`, (req, res, next) => {
        const { limit, skip } = req.params;
        Customer.find({
            _id: {
                $ne: [req.session.customer._id]
            }
        }).then(customer => {
            console.log(customer);
            render.render(res, "secure/customer/add", { page: "medicalpractic/add", records: customer });
            console.log(records)
        }).catch(e => {

        })
        render.render(res, "secure/customer/add", { page: "medicalpractic/add" });
    })
};

module.exports = routeDefiner;