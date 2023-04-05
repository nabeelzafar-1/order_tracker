const paths = global.PATHS;
const jwt = require('jsonwebtoken');
const { session } = require('passport');
const models = require(paths.models);
const User = models.get('User');

const interceptor = async(router, base_route) => {
    console.log("in interceptor");
    router.use(userMiddleware);
};

userMiddleware = async(req, res, next) => {
    console.log("in index 1");
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    let isAJAX = req.xhr;
    const acceptJson = req.headers.accept && req.headers.accept.indexOf('json') > -1;
    isAJAX = isAJAX || acceptJson;
    console.log('====================================');
    console.log(isAJAX, acceptJson);
    console.log('====================================');
    if (!isAJAX) {
        // req.user = session.user;
        // res.status(500).json({ msg: "only xmlrequest" });
        next()
    } else {
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ message: 'Invalid token 123.' });
                } else {
                    console.log(decoded);
                    const id = decoded.id;
                    User.findOne({ _id: id }).then(user => {
                        if (!user) {
                            res.status(401).json({ message: 'Invalid token no user.' });
                        }
                        console.log(user);
                        req.user = user;
                        next();
                    }).catch(err => {
                        throw err;
                    });
                }
            });
        } else {
            res.status(400).json({ message: 'No token provided.' })
        }
    }



};

module.exports = interceptor;