var Producto= require('../../model/producto');
var Categoria= require('../../model/categoria');
var Fragancia= require('../../model/fragancia');
var Marca= require('../../model/marca');


function getproductos(req,res){
    Producto.find({eliminado: { $ne: true }},
    ).populate('categoria').populate('fragancia').populate('marca')
   
        .exec((err,producto)=>{
           
            let productosVista=[]
           for(let i=0;i<producto.length;i++){
               produ={
                   id:producto[i].id,
                   name:producto[i].name,
                   description:producto[i].description,
                   code:producto[i].code,
                   price:producto[i].price,
                   fragancia:producto[i].fragancia!=null?producto[i].fragancia.name:"",
                   categoria:producto[i].categoria!=null?producto[i].categoria.name:"",
                   marca:producto[i].marca!=null?producto[i].marca.name:"",
                   img:producto[i].img

               }
               productosVista.push(produ)
           }
           let progroup = productosVista.reduce((r, a) => {
           
            r[a.categoria] = [...r[a.categoria] || [], a];
            return r;
           }, {});
           console.log("group", progroup);
           let productoscomprados=[]
           if(req.session.productocomprado){
            productoscomprados=req.session.productocomprado
           }
            res.render('frontEnd/articulos',{progroup,productoscomprados})  
        })
}

function getproductosPuntera(req,res){
    Producto.find({eliminado: { $ne: true },estaEnPuntera:"true"},
        ).populate('categoria').populate('fragancia').populate('marca')
       
            .exec((err,producto)=>{
                
                let productosVista=[]
               for(let i=0;i<producto.length;i++){
                   produ={
                       id:producto[i].id,
                       name:producto[i].name,
                       description:producto[i].description,
                       code:producto[i].code,
                       price:producto[i].price,
                       fragancia:producto[i].fragancia!=null?producto[i].fragancia.name:"",
                       categoria:producto[i].categoria!=null?producto[i].categoria.name:"",
                       marca:producto[i].marca!=null?producto[i].marca.name:"",
                       img:producto[i].img
    
                   }
                   productosVista.push(produ)
               }
               let productoscomprados=[]
           if(req.session.productocomprado){
            productoscomprados=req.session.productocomprado
           }
               res.render('frontEnd/puntera',{productosVista,productoscomprados})  
            })
}

function llenarCarroCompra(req,res){
    let idproducto=req.params.id
    if(!req.session.productocomprado){
        req.session.productocomprado=[]
    }
    var items= req.session.productocomprado
  
    for(var i=0;i<items.length;i++){
         if(items[i].id==idproducto){
             req.session.productocomprado[i].cantidad++
             req.session.productocomprado[i].cantidadXproducto=req.session.productocomprado[i].cantidad*req.session.productocomprado[i].precio
             return res.send({verEnChango:req.session.productocomprado})
         }else{
             
         }
    }
    Producto.findById(idproducto,function(err,producto){
        articulo={
            precio:producto.price,
            descripcion:producto.name,
            id:producto._id,
            img:producto.img,
            cantidad:1,
            cantidadXproducto:producto.price
        }
        
        req.session.productocomprado.push(articulo)

        return res.send({verEnChango:req.session.productocomprado})
    })
}
function eliminarItem(req,res){
    let iditem=req.params.id
   
       var items= req.session.productocomprado
  
   for(var i=0;i<items.length;i++){
        if(items[i].id==iditem){
            req.session.productocomprado.splice(i,1)
        }
   }
   return res.send({verEnChango:req.session.productocomprado})
   
}

function verCarroCompra(req,res){
    let verEnChango=[]
    if(req.session.productocomprado){
        verEnChango= req.session.productocomprado
    }
   

    return res.render('frontEnd/carro-compra',{verEnChango})
}
function agregarCantidad(req,res){
    var params=req.body;
    console.log(params)
    var items= req.session.productocomprado
  
    for(var i=0;i<items.length;i++){
         if(items[i].id==params.id){
             req.session.productocomprado[i].cantidad=params.cantidad
             req.session.productocomprado[i].cantidadXproducto=params.cantidad*req.session.productocomprado[i].precio
         }
    }
   

    return res.send("ok")
}

module.exports={
    
    getproductos,
 getproductosPuntera,
 llenarCarroCompra,
 verCarroCompra,
 eliminarItem,
 agregarCantidad
  


}