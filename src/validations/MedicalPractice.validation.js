const Joi = require('joi');


const createMedical = {
    body: Joi.object().keys({
      practiceName: Joi.string().required(),
      mailingAddress: Joi.object().keys({
              practiceAddress:Joi.string().required(),
              practiceCity:Joi.string().required(),
              practiceState:Joi.string().required(),
              practiceZip:Joi.number().required()
      }),
      shippingAddress: Joi.object().keys({
        practiceAddress:Joi.string().required(),
        practiceCity:Joi.string().required(),
        practiceState:Joi.string().required(),
        practiceZip:Joi.number().required()
      }),
      phone: Joi.number().required(),
      fax: Joi.number().required(),
      website: Joi.string().required(),
      status: Joi.string().required(),
    }),
  };

  const updateMedical = {
    params: Joi.object().keys({
      medicalId: Joi.string(),
    }),
    body: Joi.object().keys({
      practiceName: Joi.string().optional(),
      mailingAddress: Joi.object().keys({
              practiceAddress:Joi.string().optional(),
              practiceCity:Joi.string().optional(),
              practiceState:Joi.string().optional(),
              practiceZip:Joi.number().optional()
      }),
      shippingAddress: Joi.object().keys({
        practiceAddress:Joi.string().optional(),
        practiceCity:Joi.string().optional(),
        practiceState:Joi.string().optional(),
        practiceZip:Joi.number().optional()
      }),
      phone: Joi.number().optional(),
      fax: Joi.number().optional(),
      website: Joi.string().optional(),
      status: Joi.string().optional(),
    }),
  };

module.exports = {
    createMedical,
    updateMedical,
};
