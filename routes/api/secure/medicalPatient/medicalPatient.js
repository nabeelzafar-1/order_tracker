const PATHS = global.PATHS;
const { Router } = require("express");
const controllers = require(PATHS.controllers);
const medicalPatientController = controllers.get(
    "api.medicalPatientController"
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
    router.get(`${route_base}/add`, medicalPatientController.addMedicalPatient);
    router.post(`${route_base}/add`, medicalPatientController.postMedicalPatient);
    router.get(`${route_base}/view/:id`, medicalPatientController.view);
    router.get(`${route_base}/edit/:id`, medicalPatientController.edit);
    router.put(`${route_base}/edit/:id`, medicalPatientController.editPost);
    router.delete(`${route_base}/edit/:id`, medicalPatientController.deletePatient);
    router.post('/search', medicalPatientController.searchPatients);
  };




module.exports = routeDefiner;