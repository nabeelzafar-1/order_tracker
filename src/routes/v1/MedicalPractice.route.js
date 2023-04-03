const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const MedicalPracticeValidation = require('../../validations/MedicalPractice.validation');
const MedicalPracticeController = require('../../controllers/MedicalPractice.controller');
const router = express.Router();

router
  .route('/')
  .post(auth('medicalPractice'), validate(MedicalPracticeValidation.createMedical), MedicalPracticeController.createMedical)

  router
  .route('/detail/:medicalId')
  .get(auth('medicalPractice'), MedicalPracticeController.getMedicalDetail)
  .put(auth('medicalPractice'), validate(MedicalPracticeValidation.updateMedical), MedicalPracticeController.editMedical)
  .delete(auth('medicalPractice'), MedicalPracticeController.deleteMedical);

module.exports = router;
