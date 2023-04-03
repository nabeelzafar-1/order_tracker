const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/',(req, res) => {
 
    res.render('index');
 

});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', (req, res) => {
  console.log(req.email);
  if( req.email ) {
    res.render('profile', {
     
    });
  } else {
    res.redirect('/login');
  }
  
})

module.exports = router;