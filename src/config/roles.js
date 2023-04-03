const allRoles = {
  user: ['medicalPractice', 'getUsers','manageUsers','medicalProfessional','patient'],
  admin: [
    'medicalPractice',
    'getUsers',
    'manageUsers',
    'medicalProfessional',
    'patient'
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
