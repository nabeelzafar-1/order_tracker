const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { BAD_REQUEST } = require('http-status');
const MedicalProfessional = require('../models/medicalProfessional.model');
const { getMedicalById } = require('../services/MedicalPractice.service');
const { MedicalPracticeService } = require('.');

const createProfessionals = async (taskBody) => {
  return MedicalProfessional.create(taskBody);
};


const editMedicalProfessionals = async (medicalProfessionalId, name, lastName, medProType, email, lastRef, status) => {
  const medical = await getMedicalProfessionalById(medicalProfessionalId);
  if (!medical) {
    throw new ApiError(httpStatus.NOT_FOUND, 'medical not found');
  }
  return MedicalPractice.findOneAndUpdate(
    { _id: medicalProfessionalId },
    {
      name, lastName, medProType, email, lastRef, status
    },
    {
      new: true,
    }
  );
};

const getMedicalProfessionalById = async (id) => {

  const medicalProfessional = await MedicalProfessional.findById(id).populate([
    {
      path: "MedicalProfessional",
      select: 'firstName LastName',
    },

  ]);
  if (!medicalProfessional) {
    throw new ApiError(400, 'Invalid medicalProfessional');
  }
  return medicalProfessional;
};

const getProfessionalByMedicalPracticeAndName = (name, medicalId) => {
  return MedicalProfessional.findOne({
    name,
    medical: medicalId,
  });
};

module.exports = {
  createProfessionals,
  editMedicalProfessionals,
  getProfessionalByMedicalPracticeAndName,
  getMedicalProfessionalById
};
