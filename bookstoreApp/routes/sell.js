var express = require('express');
var router = express.Router();
var multer = require('multer');
var flash = require('connect-flash');
var uploadController = require('../controllers/uploadController');
var productController = require('../controllers/marketController');
var upload = multer({
      storage : uploadController.imgStorage,
      fileFilter: uploadController.imgFilter
});
router.use(flash());

/*
  add a new book to the database and copy its image to public/img folder
  add redirect to buy page to show the updated list in the store if no errors
*/
router.post('/', upload.single('image'), productController.create);



/*
   render the sell page for seller to add a new book to the Store
   ability to add book details and upload book front cover
   (TODO : assign a seller id and leverage it to authenicate specific taksk)
*/
router.get('/', function(req, res, next) {
  res.render('sell', { title: 'Online Store' ,
                      conditions: ['','New', 'Used'],
                      flashMsg : req.flash('sellError')});
});

/*
  catch for expected errors that happens in sell page
  use flash to display error.any unhandled errors will fall
  through error handling in app.js
*/
router.use(function(err, req, res, next){
  if (err.message == "NotAnImageFileErr") {
    req.flash('sellError', "Please select an image file");
    res.redirect('/sell');
  } else if (err.message == "DBSaveError"){
    req.flash('sellError', "Error in saving the new document");
    req.redirect('/sell');
  } else if (err.message == "DBRemoveError"){
    req.flash('sellError', "Error in removing the document");
    req.redirect('/sell');
  } else {
    next(err);
  }
});

module.exports = router;
