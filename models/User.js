var mongoose=require('mongoose');
var schema=mongoose.Schema;
var UserSchema=new schema({
    username:{ type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
});
module.exports = mongoose.model('User', UserSchema,'User');

