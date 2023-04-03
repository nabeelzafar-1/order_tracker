const medicalStatus = {
  ACTIVE_MEDICAL: 'Active',
  CLOSED_MEDICAL: 'Closed',
  REMOVED_MEDICAL: 'Removed',
};

const professionalType = {
  MD_PROFESSIONAL: 'MD/NP',
  PT_PROFESSIONA: 'PT',
  Nurse_PROFESSIONA: 'Nurse',
  ADMIN_PROFESSIONA: 'Admin',
};
const professionalStatus = {
  ACTIVE_PROFESSIONAL: 'Active',
  ONBOARDED_PROFESSIONAL: 'Onboarded',
  DORMANT_PROFESSIONAL: 'Dormant',
  REMOVED_PROFESSIONAL: 'Removed',
};
const patientType = {
  REFERRAL_PATIENT: 'Referral',
  D2C_PATIENT: 'D2C',
};
const patientStatus = {
  ACTIVE_PROFESSIONAL: 'Active',
  DORMANT_PROFESSIONAL: 'Dormant',
  REMOVED_PROFESSIONAL: 'Removed',
};
module.exports = {
  medicalStatus,
  professionalType,
  professionalStatus,
  patientType,
  patientStatus,

};
