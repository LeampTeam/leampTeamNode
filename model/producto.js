var mongoose= require('mongoose');
var Schema =mongoose.Schema;

/* Declaracion de campos en la base de datos */
var ProducSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    priceMayor: Number,
    code:String,  
    stock:Number,
    crateAt:String,
    marca:{ type: Schema.Types.ObjectId, ref: 'Marca' },
    img:String,
    esFragancia:Boolean,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    fragancia: { type: Schema.Types.ObjectId, ref: 'Fragancia' },
    eliminado:Boolean,
    estaEnPuntera:String

})



module.exports=mongoose.model('Producto',ProducSchema)