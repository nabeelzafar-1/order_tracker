const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const medicalProfessionalController = controllers.get(
    "api.medicalProfessionalController"
  );
  const middlewares = require(PATHS.middlewares);
  const services = require(PATHS.services);
  const errorHandler = services.get("apiError");
  
  const models = require(PATHS.models);
  const User = models.get("User");

/**
 *  MedicalPractice Routes 
*/
const routeDefiner = (router, route_base) => {
    router.get(`${route_base}/add/:id`, medicalProfessionalController.addMedicalProfessional);
    router.post(`${route_base}/add`, medicalProfessionalController.postMedicalProfessional);
    router.get(`${route_base}/view/:id`, medicalProfessionalController.view);
    router.get(`${route_base}/edit/:id`, medicalProfessionalController.edit);
    router.put(`${route_base}/edit/:id`, medicalProfessionalController.editPost);
    router.delete(`${route_base}/edit/:id`, medicalProfessionalController.deleteProfessional);
    router.post('/search', medicalProfessionalController.searchProfessional);
  };



module.exports = routeDefiner;