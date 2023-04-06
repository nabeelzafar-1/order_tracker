const mongoose = require('mongoose');
const { patientType, patientStatus } = require('../config/medical.config');



const patientSchema = mongoose.Schema(
  {
    patientype: {
      type: String,
      default: patientType,
    },
    referredBy: {
      type: String,
    },

    rxApproval: {
      type: String,
    },
    firstName: {
      type: String,
      // required: true,
      trim: true,
    },
    lastName: {
      type: String,
      // required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    nummd: {
      type: Number,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zip: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      default: patientStatus,
    },

    coordinatorFirstName: {
      type: String,
      trim: true,
    },
    coordinatorLastName: {
      type: String,
      trim: true,
    },
    coordinatorPhone: {
      type: Number,
      trim: true,
    },
    coordinatorEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },

    medicalProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'medicalProfessional',
    },
  },
  {
    timestamps: true,
  }
);


/**
 * @typedef Patient
 */
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
