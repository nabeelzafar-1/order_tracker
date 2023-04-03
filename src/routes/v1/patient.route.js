const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const patientValidation = require('../../validations/patient.validation');
const patientController = require('../../controllers/patient.controller');
const router = express.Router();

router
  .route('/')
  .post(auth('patient'), validate(patientValidation.createPatient), patientController.createPatient)

  router
  .route('/detail/:patientId')
  .get(auth('medicalProfessional'), patientController.getPatientDetail)
  .put(auth('medicalProfessional'), validate(patientValidation.updateProfessional), patientController.editPatient)
  .delete(auth('medicalProfessional'), patientController.deletePatient);

module.exports = router;
