const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { professionalType, professionalStatus } = require('../config/medical.config');

const medicalProfessionalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    lastName: {
      type: String,
      // required: true,
      trim: true,
    },
    medProType: {
      type: String,
      default: professionalType,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'MedicalPractice',
    },
    fax:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'MedicalPractice',
    },
    lastRef: {
      type: Date,
      required: false,
    },
    MedicalPractice: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'MedicalPractice',
    },

    status: {
      type: String,
      default: professionalStatus,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
medicalProfessionalSchema.plugin(toJSON);
medicalProfessionalSchema.plugin(paginate);







/**
 * @typedef MedicalProfessional
 */
const MedicalProfessional = mongoose.model('MedicalProfessional', medicalProfessionalSchema);

module.exports = MedicalProfessional;
