const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { patientType, patientStatus } = require('../config/medical.config');

const patientSchema = mongoose.Schema(
  {
    patientype: {
      type: String,
      default: patientType,
    },
    referredBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'MedicalProfessional',
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
    dateOfBirth:{
      type: Date,
      required: false,
    },
    nummd:{
      type:Number,
      trim: true,
    },
    city:{
      type: String,
      trim: true,
    },
    state:{
      type: String,
      trim: true,
    },
    zip:{
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone:{
      type: Number,
      trim: true,
    },
    status: {
      type: String,
      default: patientStatus,
    },
    careCoordinator: {

      firstName: {
        type:String,
        trim: true,
      },
      lastName: {
        type:String,
        trim: true,
      },
      phone: {
        type:Number,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      }
  },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
patientSchema.plugin(toJSON);
patientSchema.plugin(paginate);







/**
 * @typedef Patient
 */
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
