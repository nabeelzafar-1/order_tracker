const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const medicalPracticeController = controllers.get(
    "api.medicalPracticeController"
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
    router.get(`${route_base}/add`, medicalPracticeController.addMedicalPractice);
    router.post(`${route_base}/add`, medicalPracticeController.postMedicalPractice);
    router.get(`${route_base}/view/:id`, medicalPracticeController.view);
    router.get(`${route_base}/edit/:id`, medicalPracticeController.edit);
    router.put(`${route_base}/edit/:id`, medicalPracticeController.editPost);
    router.delete(`${route_base}/delete/:id`, medicalPracticeController.deleteMedicalPractice);
    router.post('/search', medicalPracticeController.searchPractice);
  };



module.exports = routeDefiner;