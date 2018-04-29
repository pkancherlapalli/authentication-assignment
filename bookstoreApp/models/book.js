var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// schema for 'book' document
var bookSchema = new Schema( {
      title : {type:String, required: true},
      isbn : {type:String, required: true},
      author: {type:String, required: true},
      condition: {type:String},
      imgurl: {type:String},
      imgfile: {type:String},
      sellerid: {type:String, select:false},
      reviews: [{type:String}],
      sellerid: {type:String}
});

// create a model/collection based on schema and export
module.exports = mongoose.model("Book", bookSchema);
