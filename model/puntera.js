var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var PunteraShema= Schema({
    name:String,
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
    frase:String,
    CreateAt:String,
    eliminado:Boolean
})



module.exports=mongoose.model('Puntera',PunteraShema)