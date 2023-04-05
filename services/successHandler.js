const success = (req, res, redirect, message) => {
    req.session.flash = {
        class: 'success',
        type: 'success',
        message: message
    }
    res.redirect(redirect);
};

module.exports = success;