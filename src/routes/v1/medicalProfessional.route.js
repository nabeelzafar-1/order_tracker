const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const medicalProfessionalValidation = require('../../validations/medicalProfessional.validation');
const medicalProfessionalController = require('../../controllers/medicalProfessional.controller');
const router = express.Router();

router
  .route('/:medicalId')
  .post(auth('medicalProfessional'), validate(medicalProfessionalValidation.createProfessional), medicalProfessionalController.createProfessional)

  router
  .route('/detail/:medicalProfessionalId')
  .get(auth('medicalProfessional'), medicalProfessionalController.getMedicalProfessionalDetail)
  .put(auth('medicalProfessional'), validate(medicalProfessionalValidation.updateProfessional), medicalProfessionalController.editMedicalProfessional)
  .delete(auth('medicalProfessional'), medicalProfessionalController.deleteMedicalProfessional);

module.exports = router;
