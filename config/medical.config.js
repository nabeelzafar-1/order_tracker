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
  REFERRAL_PATIENTS: 'Referral',
  D2C_PATIENTS: 'D2C',
};
const patientStatus = {
  ACTIVE_PATIENT: 'Active',
  DORMANT_PATIENT: 'Dormant',
  REMOVED_PATIENT: 'Removed',
}; 
module.exports = {
  medicalStatus,
  professionalType,
  professionalStatus,
  patientType,
  patientStatus,

};
