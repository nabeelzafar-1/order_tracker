const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');
// const { isLogin } = require('../services/auth.service');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  console.log('user: ', user);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not creared');
  }
  res.status(httpStatus.CREATED).send({message:'signup in successfully.'});
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  if(user){
    const tokens = await tokenService.generateAuthTokens(user);
    if(tokens){
      sess = req.session
      sess.email = res.email
      res.redirect("/profile");
      res.send(user)
    }
  }

  // if(tokens){
  //   sess = req.session
  //   sess.password = res.password
  //   sess.email = res.email
  //   res.send({ user, tokens });
   
  // }else if(tokens == user){
  //   res.redirect("/profile");
  // }else{
  //   res.redirect("/login");
  // }
   
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});


const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const  isLoggedIn = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body
    if (email && password) {
      const user = await userService.getUserByEmail(email);
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password)
        if ((user.email === email) && isMatch) {
          // Generate JWT Token
          const tokens = await tokenService.generateAuthTokens(user);
          res.send({ "status": "success", "message": "Login Success", "token": tokens })
        } else {
          res.send({ "status": "failed", "message": "Email or Password is not Valid" })
        }
      } else {
        res.send({ "status": "failed", "message": "You are not a Registered User" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  } catch (error) {
    console.log(error)
    res.send({ "status": "failed", "message": "Unable to Login" })
  }
});

// const  isLoggedIn = catchAsync(async (req, res, next) => {
//   // console.log(req.cookies);
//   if( req.cookies.jwt) {
//     try {
//       //1) verify the token
//       const decoded = await promisify(jwt.verify)(req.cookies.jwt,
//       process.env.JWT_SECRET
//       );

//       console.log(decoded);

//       //2) Check if the user still exists
//       db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
//         console.log(result);

//         if(!result) {
//           return next();
//         }

//         req.user = result[0];
//         console.log("user is")
//         console.log(req.user);
//         return next();

//       });
//     } catch (error) {
//       console.log(error);
//       return next();
//     }
//   } else {
//     next();
//   }
// })

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshTokens,
  isLoggedIn,
};
