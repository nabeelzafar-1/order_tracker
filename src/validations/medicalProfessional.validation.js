const Joi = require('joi');


const createProfessional = {
  params: Joi.object().keys({
    medicalId: Joi.string(),
  }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      medProType: Joi.string().optional(),
      email: Joi.string().required().email(),
      phone: Joi.string().required(),
      fax: Joi.string().required(),
      lastRef: Joi.string().optional(),
      status: Joi.string().optional(),
    }),
  };

  const updateProfessional = {
    params: Joi.object().keys({
      medicalId: Joi.string(),
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      lastName: Joi.string().required(),
      medProType: Joi.string().optional(),
      email: Joi.string().required().email(),
      lastRef: Joi.string().optional(),
      status: Joi.string().optional(),
    }),
  };

module.exports = {
  createProfessional,
  updateProfessional,
};
