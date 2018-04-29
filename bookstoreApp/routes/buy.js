var express = require('express');
var router = express.Router();
var flash = require('connect-flash');
var productController = require('../controllers/marketController');

router.use(flash());

/*
  render buy page to display all the books in the Store
  (TODO: add a buy option to add to cart)
*/
router.get('/', productController.list);

/*
  add/show review of particular book based on document id
  use query parameter to decide which page to render
*/
router.get('/:productid/details' , productController.read);
/*
   add review to existing books
   pushed the new review to 'reviews' array as specified in schema
   updates the document in db based on book id and renders back the
   buy page.
*/
router.post('/:productid/details', productController.update);

/*
   remove the book from the store
   (TODO:use seller's authentication to allow removal
    and also auto removal when number of copies become 0.)
*/
router.post('/:productid', productController.delete);
/*
  catch for expected errors that happens in buy page
  use flash to display error.any unhandled errors will fall
  through error handling in app.js
*/
router.use(function(err, req, res, next){
  if (err.message == "DBFindError"){
    //req.flash('buyError', "Error in finding the document");
    console.log("Error in finding the document");
    var queryparam = (req.query.add_rev === "0") ? "?add_rev=0" : "?add_rev=1";
    req.redirect('/'+ req.params.bookid + queryparam);
  } else if (err.message == "DBFindUpdateError"){
    //req.flash('buyError', "Error in updating the document");
    console.log("Error in updating the document");
    req.redirect('/'+ req.params.bookid + "?add_rev=1");
  } else {
    next(err);
  }
});

module.exports = router;
