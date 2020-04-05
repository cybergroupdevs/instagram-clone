var multer  = require('multer');

var fileName;
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        var dir = `../user/${req.user.instaHandle}`;
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        fileName = `${file.originalname}-${Date.now()}`;
        callback(null, fileName);
    }
});

let upload = multer({storage: storage});

