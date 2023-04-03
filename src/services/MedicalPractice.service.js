const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { BAD_REQUEST } = require('http-status');
const MedicalPractice = require('../models/MedicalPractice.model');

const createMedicals = async (practiceName,mailingAddress,shippingAddress,phone, fax, website, status) => {
    // const {practiceName,phone, fax, website, status} = medicalBody;
  
    const medical = await getMedicalByName(practiceName);
    if (medical) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'medicalName already exist');
    }
  
    const newMedical = new MedicalPractice({
      practiceName,mailingAddress,shippingAddress,phone, fax, website, status
    });
    await newMedical.save();
    return newMedical.save();
  
  };
  
  const getMedicalByName = async (practiceName) => {
    return MedicalPractice.findOne({
        practiceName,
    });
  };

  const editMedicals = async (medicalId, practiceName,mailingAddress,shippingAddress,phone, fax, website, status) => {
    const medical = await getMedicalById(medicalId);
    if (!medical) {
      throw new ApiError(httpStatus.NOT_FOUND, 'medical not found');
    }
    return MedicalPractice.findOneAndUpdate(
      { _id: medicalId },
      {
        practiceName,
        mailingAddress,
        shippingAddress,
        phone,
        fax,
        website,
        status
      },
      {
        new: true,
      }
    );
  };

  const getMedicalById = async (id) => {
    const medical = await MedicalPractice.findById(id).populate([
      {
        path:"MedicalPractic",
        select: 'firstName LastName phone fax',
      },
    ]);
    if (!medical) {
      throw new ApiError(400, 'Invalid medical');
    }
    return medical;
  };

module.exports = {
    createMedicals,
    getMedicalByName,
    getMedicalById,
    editMedicals,
};
