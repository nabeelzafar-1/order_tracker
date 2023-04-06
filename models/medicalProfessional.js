const mongoose = require('mongoose');
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
        type: Number,
    },
    fax:{
      type: Number, 
    },
    lastRef: {
      type: Date,
      required: false,
    },
    MedicalPractice: {
      type: mongoose.Schema.Types.ObjectId,
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

/**
 * @typedef MedicalProfessional
 */
const MedicalProfessional = mongoose.model('MedicalProfessional', medicalProfessionalSchema);

module.exports = MedicalProfessional;
