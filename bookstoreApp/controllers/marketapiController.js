var ProductService = require('../services/marketService');

var ProductApiController = {};

ProductApiController.create = function(req, res, next) {
  var imagepath= "";
  if (req.file) imagepath = "/static/img/" + req.file.filename;

  var data = JSON.parse(req.body.productData);
  var curproduct = {
      title : data.title,
      author: data.author,
      isbn: data.isbn,
      condition: data.condition == 2 ? "Used" : "New",
      imgurl: imagepath
  }

  ProductService.create(curproduct)
                .then((createdprod)=>{
                    res.status(201);
                    res.send(JSON.stringify(createdprod));
                })
                .catch((err) =>{
                    res.send("error in creatinn item");
                });
}

ProductApiController.delete = function(req, res, next) {
   var curid = req.params.productid;

   ProductService.delete(curid)
               .then((delprod) =>{
                  res.status(200);
                  res.send(JSON.stringify(delprod));
                  //ProductApiController.list(req, res, next);
               })
               .catch((err) => {
                  res.send("error in deleting item");
               })

}

ProductApiController.list = function(req, res, next) {
  ProductService.list({})
     .then((curproducts) => {
       res.status(200);
       res.send(JSON.stringify(curproducts));
     })
     .catch((err) => {
         res.send("error in retrieving list")
     });
}

ProductApiController.read = function(req,res, next) {
    var curid = req.params.productid;

    ProductService.read(curid)
                .then((curproduct) => {
                     res.status(200);
                     res.send(JSON.stringify(curproduct));
                })
                .catch((err) =>{
                    res.send("error in retrieving item")
                })

}

ProductApiController.update = function(req,res, next) {
    var curid = req.params.productid;
    /*
    ProductService.update(curid, {title : req.body.title,
                                  author: req.body.author,
                                  isbn: req.body.isbn,
                                  reviews: req.body.review}, {new:true})
                                  */
    ProductService.update(curid, {reviews:req.body.review})
                  .then((curproduct) =>{
                      ProductApiController.read(req, res, next);
                  })
                  .catch((err) =>{
                      res.send("error in updating item")
                  });
}


module.exports = ProductApiController;
