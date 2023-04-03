const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { medicalStatus } = require('../config/medical.config');

const medicalPracticeSchema = mongoose.Schema(
  {
    practiceName: {
      type: String,
      // required: true,
      trim: true,
    },
    mailingAddress: {
  
          practiceAddress: {
            type:String,
            trim: true,
          },
          practiceCity: {
            type:String,
            trim: true,
          },
          practiceState: {
            type:String,
            trim: true,
          },
          practiceZip: {
            type:Number,
            trim: true,
          }
      },

    shippingAddress: 
      {
        practiceAddress: {
          type:String,
          trim: true,
        },
        practiceCity: {
          type:String,
          trim: true,
        },
        practiceState: {
          type:String,
          trim: true,
        },
        practiceZip: {
          type:Number,
          trim: true,
        }
      },
  phone: {
      type: Number,
      trim: true
    },
  fax: {
      type: Number,
      trim: true
    },
  website:{
      type: String,
      trim: true
  } ,
  status:{
    type: String,
    default: medicalStatus,
  }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
medicalPracticeSchema.plugin(toJSON);
medicalPracticeSchema.plugin(paginate);







/**
 * @typedef MedicalPractice
 */
const MedicalPractice = mongoose.model('MedicalPractice', medicalPracticeSchema);

module.exports = MedicalPractice;
