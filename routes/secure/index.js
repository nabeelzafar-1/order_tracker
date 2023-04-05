const paths = global.PATHS;
const jwt = require('jsonwebtoken');
const models = require(paths.models);
const User = models.get('User');

const interceptor = async(router, base_route) => {
    console.log("in interceptor");
    router.use(userMiddleware);
};

userMiddleware = async(req, res, next) => {
    console.log("in index");
    const user = req.session.user;
    // decode token
    if (req.session && user) {
        console.log("session-->>", req.session.user);
        req.user = user;
        next();
        // verifies secret and checks exp
        // jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(401).json({ message: 'Invalid token.' });
        //     } else {
        //         console.log(decoded);
        //         const id = decoded.id;
        //         User.findOne({ _id: id }).then(user => {
        //             if (!user) {
        //                 res.status(401).json({ message: 'Invalid token no user.' });
        //             }
        //             console.log(user);
        //             req.user = user;
        //             next();
        //         }).catch(err => {
        //             throw err;
        //         });
        //     }
        // });
    } else {
        req.session.flash = {
            class: 'danger',
            type: 'error',
            message: 'Please Login',
        }
        res.redirect('/');
        // res.status(401).json({ message: 'No token provided.' });
    }
};

module.exports = interceptor;