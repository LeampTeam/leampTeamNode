var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var MarcaShema= Schema({
    name:String,
    CreateAt:String,
    eliminado:Boolean
})



module.exports=mongoose.model('Marca',MarcaShema)