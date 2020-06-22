var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var CategoriaShema= Schema({
    name:String,
    CreateAt:String,
    eliminado:Boolean
})



module.exports=mongoose.model('Categoria',CategoriaShema)