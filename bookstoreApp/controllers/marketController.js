var ProductService = require('../services/marketService');

var ProductController = {};

ProductController.handleReview =  function(req,res, curbook){
    if (req.query.add_rev === "0"){
      res.render('showreview', {title: 'Online Store',book:curbook });
    }
    else {
      res.render('addreview', {title: 'Online Store',book:curbook});
    }
}

ProductController.create = function(req, res, next) {
  var imagepath = "/static/img/" + req.file.filename;
  var curproduct = {
      title : req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      condition: req.body.condition == 2 ? "Used" : "New",
      imgurl: imagepath
  }

  ProductService.create(curproduct)
                .then(()=>{
                    res.redirect('/buy');
                })
                .catch((err) =>{
                    throw new Error("DBSaveError")
                });
}

ProductController.delete = function(req, res, next) {
   var curid = req.params.productid;

   ProductService.delete(curid)
               .then(() =>{
                  //res.redirect('/buy');
                  res.status(200).end();
               })
               .catch((err) => {
                  throw new Error("DBRemoveError");
               })

}

ProductController.list = function(req, res, next) {
  ProductService.list({})
     .then((curbooks) => {
       res.render('buy', { title: 'Online Store' ,
                           books : curbooks});
     })
     .catch((err) => {
         res.render('index', { title: 'Online Store' });
     });
}

ProductController.read = function(req,res, next) {
    var curid = req.params.productid;

    ProductService.read(curid)
                .then((curbook) => {
                     ProductController.handleReview(req, res, curbook);
                })
                .catch((err) =>{
                    throw new Error("DBFindError");
                })

}

ProductController.update = function(req,res, next) {
    var curid = req.params.productid;
    ProductService.update(curid, {reviews:req.body.review})
                  .then(() =>{
                      ProductController.list(req, res, next);
                  })
                  .catch((err) =>{
                      throw new Error("DBFindUpdateError");
                  });
}


module.exports = ProductController;
