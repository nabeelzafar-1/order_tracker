const e = require("connect-flash");

const handleError = (req, res, redirect, error) => {
    let message, code = '';
    console.log(error);
    if (error.errors) {
        for (let key in error.errors) {
            message = error.errors[key].properties.message;
            code = 400;
        }
    } else if (error.code == 11000) {
        for (let key in error.keyValue) {
            message = `${key} '${error.keyValue[key]}' is already in use, please enter a unique ${key}.`
            code = 400;
        }
    } else {
        message = 'Something went wrong.'
        code = 500;
    }
    console.log(message, code);
    req.session.flash = {
        class: 'danger',
        type: 'error',
        message: message,
        form: req.body
    }
    res.redirect(redirect);
};

module.exports = handleError;