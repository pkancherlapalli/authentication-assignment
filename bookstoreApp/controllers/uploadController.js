var multer = require('multer');

const imgStorage = multer.diskStorage({
    destination : function(req, file, cb) {
      cb(null, 'public/img');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});

const imgFilter = function(req, file, cb){

    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      cb(null, true);
    } else {
       cb(new Error("NotAnImageFileErr"), false);
    }
}
module.exports.imgStorage = imgStorage;
module.exports.imgFilter = imgFilter;
