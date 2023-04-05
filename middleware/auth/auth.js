const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');

const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/public/user/login');
    }
};
const checkLogin = (req, res, next) => {

    const token = req.cookies.jwt;
    if (token) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = { auth, checkLogin };