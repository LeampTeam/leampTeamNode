var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var itemPedidoShema= Schema({
    name:String,
    
    cantidad:Number,
    idProducto:String,
    CreateAt:String,
    eliminado:Boolean
})

module.exports=mongoose.model('ItemPedido',itemPedidoShema)