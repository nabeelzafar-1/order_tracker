const multer = require('multer');

const TYPE_IMAGE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

var upload = multer({ dest: "./public/uploads" });

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function(req, file, cb) {
        var fileExtension = file.mimetype.split("/")[1];
        cb(null, "1" + Date.now() + "." + fileExtension);
    },

});

var upload = multer({
    fileFilter: (req, file, cb) => {
        let size = req.rawHeaders[5];
        if (!TYPE_IMAGE[file.mimetype]) {
            req.img_error = "File not allowed";
            return cb(null, false);
        } else if (size < 5 * 1024 * 1024) {
            req.img_error = "Image is too large try an image less than 4 Mbs";
            return cb(null, false);
        }
        cb(null, true);
    },
    storage: storage,

});

// const upload = multer({
//     limits: 500000,
//     storage: multer.diskStorage({
//         destination: function(req, file, cb) {
//             cb(null, "./public/uploads");
//         },
//         filename: function(req, file, cb) {
//             var fileExtension = file.mimetype.split("/")[1];
//             cb(null, "1" + Date.now() + "." + fileExtension);
//         },
//     }),
//     fileFilter: (req, file, cb) => {
//         let size = req.rawHeaders[5];
//         console.log("this is size=>", size);
//         let isValid = false;
//         if (!!TYPE_IMAGE[file.mimetype] && size < 5 * 1024 * 1024) {
//             isValid = true;
//         }
//         let error = isValid ? null : new Error('Invalid mime type!');
//         cb(error, isValid);
//     }
// }).any();


module.exports = upload;