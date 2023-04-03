const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {editPatients,getPatientById } = require('../services/patient.service');
const { MedicalPracticeService,patientService } = require('../services');
const  MedicalPractice = require('../models/MedicalPractice.model');

const createPatient = catchAsync(async (req, res) => {
  // const { medicalId } = req.params;
  const body = req.body;
  // await MedicalPracticeService.getMedicalById(medicalId);
  body.creator = req.user._id;
  const Patient = await patientService.createPatient(body);
  res.status(httpStatus.CREATED).send(Patient);
  });

  const editPatient = catchAsync(async (req, res) => {
    const { patientId } = req.params;
    const {patientype,referredBy,rxApproval,firstName, lastName, dateOfBirth,nummd,city,state,zip,email,phone,status,careCoordinator } = req.body;
  
    const patient = await editPatients(patientId,patientype,referredBy,rxApproval,firstName, lastName, dateOfBirth,nummd,city,state,zip,email,phone,status,careCoordinator);
    res.status(200).send(patient);
  });

  const getPatientDetail= catchAsync(async (req, res) => {
    const { patientId } = req.params;
    const patient = await getPatientById(patientId);
    res.status(200).send(patient);
  });
  const deletePatient = catchAsync(async (req, res) => {
    const { patientId } = req.params;
    const newpatient = await patientService.getPatientById(patientId);
    await newpatient.remove();
    res.status(200).send('Medical Professional Status Removed');
  });

module.exports = {
    createPatient,
    editPatient,
    getPatientDetail,
    deletePatient,
};
