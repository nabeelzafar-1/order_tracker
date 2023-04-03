const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const medicalRoute = require('./MedicalPractice.route')
const medicalProfessionalRoute = require('./medicalProfessional.route')
const patientRoute = require('./patient.route')


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/medical',
    route: medicalRoute,
  },
  {
    path: '/medicalprofessional',
    route: medicalProfessionalRoute,
  },
  {
    path: '/patient',
    route: patientRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
