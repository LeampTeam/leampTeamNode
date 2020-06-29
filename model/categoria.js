var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var CategoriaShema= Schema({
    name:String,
    color:String,
    fragancias: [{ type: Schema.Types.ObjectId, ref: 'Fragancia' }],
    CreateAt:String,

    eliminado:Boolean
})



module.exports=mongoose.model('Categoria',CategoriaShema)