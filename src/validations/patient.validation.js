const Joi = require('joi');


const createPatient = {
  params: Joi.object().keys({
    medicalProfessionalId: Joi.string(),
  }),
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      patientype: Joi.string().optional(),
      referredBy: Joi.string().optional(),
      rxApproval: Joi.string().optional(),
      dateOfBirth: Joi.string().optional(),
      city:Joi.string().required(),
      state:Joi.string().required(),
      zip:Joi.number().required(),
      nummd:Joi.number().required(),
      email: Joi.string().required().email(),
      phone: Joi.number().required(),
      dateOfBirth: Joi.string().optional(),
      status: Joi.string().optional(),
      careCoordinator: Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        phone:Joi.number().required(),
        email:Joi.string().required().email(),
}),
    }),
  };

  const updateProfessional = {
    params: Joi.object().keys({
      medicalProfessionalId: Joi.string(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      patientype: Joi.string().optional(),
      rxApproval: Joi.string().optional(),
      dateOfBirth: Joi.string().optional(),
      city:Joi.string().required(),
      state:Joi.string().required(),
      zip:Joi.number().required(),
      nummd:Joi.number().required(),
      email: Joi.string().required().email(),
      phone: Joi.string().required(),
      dateOfBirth: Joi.string().optional(),
      status: Joi.string().optional(),
      careCoordinator: Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        phone:Joi.string().required(),
        email:Joi.string().required().email(),
      }),
    }),
  };

module.exports = {
  createPatient,
  updateProfessional,
};
