var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var PedidoShema= Schema({
    name:String,
    items: [{ type: Schema.Types.ObjectId, ref: 'ItemPedido' }],
    nombreCliente:String,
    direccionCliente:String,
    telefonoCliente:String,
    codigoPostal:String,
    emailCliente:String,
    numeroRemito:Number,
    totalCompra:Number,
    CreateAt:String,
    eliminado:Boolean
})




module.exports=mongoose.model('Pedido',PedidoShema)