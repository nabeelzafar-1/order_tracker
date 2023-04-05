// console.log(global.PATHS);
// const PATHS = global.PATHS;
// const path = require('path');
const models = require('../../models');
const jwt = require('jsonwebtoken');
const User = models.get('User');

const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'aquickbrownfoxjumpsoverthelazydog', async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                console.log("ye 1");
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log("ye 2");
                next();
            }
        });
    } else {
        console.log("ye 3");
        res.locals.user = null;
        next();
    }
};
module.exports = checkUser;