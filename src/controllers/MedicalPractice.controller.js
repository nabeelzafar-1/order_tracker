const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { createMedicals,editMedicals,getMedicalById } = require('../services/MedicalPractice.service');
const { MedicalPracticeService } = require('../services');
const  MedicalPractice = require('../models/MedicalPractice.model');

const createMedical = catchAsync(async (req, res) => {
    const { practiceName,mailingAddress,shippingAddress,  phone, fax, website, status } = req.body;
    const medical = await createMedicals(practiceName,mailingAddress,shippingAddress,  phone, fax, website, status);
    res.status(200).send(medical);
  });

  const editMedical = catchAsync(async (req, res) => {
    const { medicalId } = req.params;
    const { practiceName,mailingAddress,shippingAddress,phone, fax, website, status } = req.body;
  
    const newMedical = await editMedicals(medicalId, practiceName,mailingAddress,shippingAddress,phone, fax, website, status);
    res.status(200).send(newMedical);
  });

  const getMedicalDetail = catchAsync(async (req, res) => {
    const { medicalId } = req.params;
    const medical = await getMedicalById(medicalId);
    res.status(200).send(medical);
  });
  const deleteMedical = catchAsync(async (req, res) => {
    const { medicalId } = req.params;
    const medical = await MedicalPracticeService.getMedicalById(medicalId);
    await medical.remove();
    res.status(200).send('Medical Practice Status Removed');
  });

module.exports = {
    createMedical,
    editMedical,
    getMedicalDetail,
    deleteMedical,
};
