var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ComboSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    code:String,  
    stock:Number,
    catidadProd:String,
    crateAt:String,
    img:String,
    producto: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
    eliminado:Boolean

})



module.exports=mongoose.model('Combo',ComboSchema)