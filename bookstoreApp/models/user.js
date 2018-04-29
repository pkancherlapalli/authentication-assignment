var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required:true, unique:true },
    password: {type:String, required:true},  
});

userSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}
userSchema.methods.comparePassword = (password) =>{
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('User', userSchema);