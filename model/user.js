var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var UserShema= Schema({
    name:String,
    surname:String,
    email:String,
    password:String,   
    CreateAt:String,
    img:String,
    eliminado:Boolean
})



module.exports=mongoose.model('User',UserShema)

