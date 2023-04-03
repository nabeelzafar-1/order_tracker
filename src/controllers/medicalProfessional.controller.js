const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { createProfessionals,editMedicalProfessionals,getMedicalProfessionalById } = require('../services/medicalProfessional.service');
const { MedicalPracticeService,medicalProfessionalService } = require('../services');
const  MedicalPractice = require('../models/MedicalPractice.model');

const createProfessional = catchAsync(async (req, res) => {
  const { medicalId } = req.params;
  const body = req.body;
  await MedicalPracticeService.getMedicalById(medicalId);
  body.creator = req.user._id;
  const professional = await medicalProfessionalService.createProfessionals(body);
  res.status(httpStatus.CREATED).send(professional);
  });

  const editMedicalProfessional = catchAsync(async (req, res) => {
    const { medicalProfessionalId } = req.params;
    const {name,lastName,medProType,email, lastRef, status } = req.body;
  
    const newMedicalProfessional = await editMedicalProfessionals(medicalProfessionalId,name,lastName,medProType,email, lastRef, status);
    res.status(200).send(newMedicalProfessional);
  });

  const getMedicalProfessionalDetail = catchAsync(async (req, res) => {
    const { medicalProfessionalId } = req.params;
    const newMedicalProfessional = await getMedicalProfessionalById(medicalProfessionalId);
    res.status(200).send(newMedicalProfessional);
  });
  const deleteMedicalProfessional = catchAsync(async (req, res) => {
    const { medicalProfessionalId } = req.params;
    const newMedicalProfessional = await medicalProfessionalService.getMedicalProfessionalById(medicalProfessionalId);
    await newMedicalProfessional.remove();
    res.status(200).send('Medical Professional Status Removed');
  });

module.exports = {
  createProfessional,
    editMedicalProfessional,
    getMedicalProfessionalDetail,
    deleteMedicalProfessional,
};
