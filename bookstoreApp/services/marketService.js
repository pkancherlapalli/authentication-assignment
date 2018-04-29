var Book = require('../models/book');
var ProductService = {}


ProductService.list = (param) => {
    return Book.find(param)
       .then((items) => {
           return items;
       })
       .catch((err) => {
           throw err;
       });
};

ProductService.create = (item) => {
    var newproduct = new Book(item);
    return newproduct.save()
           .then((item)=>{
               return item;
           })
           .catch((err) =>{
               throw err;
           });
};
ProductService.read = (curid) => {
    return Book.findById(curid)
    .then((item) => { return item})
    .catch((err) => { throw err;});
};
ProductService.update = (curid, data) => {
      return Book.findOneAndUpdate({'_id':curid},{$addToSet : data})
                    .then((item) =>{
                        return item;
                    })
                    .catch((err) => {
                        throw err;
                    })
};

ProductService.delete = (curid) => {
    return Book.findOneAndRemove({'_id':curid})
                .then((item) => {
                     return item;
                })
                .catch ((err) => {
                  throw err;
                })
};


module.exports = ProductService;
