const mongoose = require('mongoose');
const { medicalStatus } = require('../config/medical.config');
const Schema = mongoose.Schema;
const MedicalPracticeSchema = new Schema(
  {
    practiceName: {
      type: String,
      // required: true,
      trim: true,
    },
    mailingAddress: {
      type: String,
      trim: true,
    },
    mailingCity: {
      type: String,
      trim: true,
    },
    mailingState: {
      type: String,
      trim: true,
    },
    mailingZip: {
      type: Number,
      trim: true,
    },
    shippingAddress: {
      type: String,
      trim: true,
    },
    shippingCity: {
      type: String,
      trim: true,
    },
    shippingState: {
      type: String,
      trim: true,
    },
    shippingZip: {
      type: Number,
      trim: true,
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

module.exports = mongoose.model('MedicalPractice', MedicalPracticeSchema);