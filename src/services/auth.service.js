const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes} = require('../config/tokens');
const {User} = require('../models');


/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  
  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    user.wrongAttempts = (user.wrongAttempts || 0) + 1;
    if (user.wrongAttempts >= 2) {
      user.wrongAttempts = 0;
    }
    user.save();
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};


// const  isLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     if (email && password) {
//       const user = await userService.getUserByEmail(email);
//       if (user != null) {
//         const isMatch = await bcrypt.compare(password, user.password)
//         if ((user.email === email) && isMatch) {
//           // Generate JWT Token
//           const tokens = await tokenService.generateAuthTokens(user);
//           res.send({ "status": "success", "message": "Login Success", "token": tokens })
//         } else {
//           res.send({ "status": "failed", "message": "Email or Password is not Valid" })
//         }
//       } else {
//         res.send({ "status": "failed", "message": "You are not a Registered User" })
//       }
//     } else {
//       res.send({ "status": "failed", "message": "All Fields are Required" })
//     }
//   } catch (error) {
//     console.log(error)
//     res.send({ "status": "failed", "message": "Unable to Login" })
//   }
// }


/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    console.log('error: ', error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};



module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  // isLogin,
};
