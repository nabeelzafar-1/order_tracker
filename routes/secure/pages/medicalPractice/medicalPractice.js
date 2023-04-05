const PATHS = global.PATHS;
const { Router } = require("express");
const MedicalPractice = require("../../../../models/medicalPractice");
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
        MedicalPractice.find({
            _id: {
                $ne: [req.session.medicalPractice._id]
            }
        }).then(medicalPractice => {
            console.log(medicalPractice);
            render.render(res, "secure/medicalPractice/add", { page: "medicalpractic/add", records: medicalPractice });
            console.log(records)
        }).catch(e => {

        })
        render.render(res, "secure/medicalPractice/add", { page: "medicalpractic/add" });
    })
};

module.exports = routeDefiner;