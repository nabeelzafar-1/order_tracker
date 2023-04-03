const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { BAD_REQUEST } = require('http-status');
const Patient = require('../models/patient.model');
const { getMedicalById } = require('./MedicalPractice.service');
const { MedicalPracticeService } = require('.');

const createPatient = async (taskBody) => {
    return Patient.create(taskBody);
  };
  

  const editPatients = async (patientId,patientype,referredBy,rxApproval,firstName, lastName, dateOfBirth,nummd,city,state,zip,email,phone,status,careCoordinator) => {
    const patient = await getPatientById(patientId);
    if (!patient) {
      throw new ApiError(httpStatus.NOT_FOUND, 'medical not found');
    }
    return Patient.findOneAndUpdate(
      { _id: patientId },
      {
        patientype,referredBy,rxApproval,firstName, lastName, dateOfBirth,nummd,city,state,zip,email,phone,status,careCoordinator
      },
      {
        new: true,
      }
    );
  };

  const getPatientById = async (id) => {
    const patient = await Patient.findById(id);
    if (!patient) {
      throw new ApiError(400, 'Invalid patient');
    }
    return patient;
  };

  const getProfessionalByMedicalPracticeAndName = (name, medicalId) => {
    return Patient.findOne({
      name,
      medical: medicalId,
    });
  };

module.exports = {
    createPatient,
    editPatients,
    getProfessionalByMedicalPracticeAndName,
    getPatientById
};
