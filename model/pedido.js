var mongoose= require('mongoose');
var Schema =mongoose.Schema;

var PedidoShema= Schema({
    name:String,
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
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




module.exports=mongoose.model('Categoria',PedidoShema)