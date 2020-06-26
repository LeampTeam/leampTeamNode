var Producto= require('../../model/producto');
var Categoria= require('../../model/categoria');
var Fragancia= require('../../model/fragancia');
var Marca= require('../../model/marca');
var envioMail=require('../../service/envioMail')


function mainPage(req,res){
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
           
          
               res.render('frontEnd/paginaPrincipal',{productosVista})  
            })
    
}
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
function getproductoById(req,res){
    var id=req.params.id
    Producto.findById(id,
    ).populate('categoria').populate('fragancia').populate('marca')
   
        .exec((err,producto)=>{
           
           
               produ={
                   id:producto.id,
                   name:producto.name,
                   description:producto.description,
                   code:producto.code,
                   price:producto.price,
                   fragancia:producto.fragancia!=null?producto.fragancia.name:"",
                   categoria:producto.categoria!=null?producto.categoria.name:"",
                   marca:producto.marca!=null?producto.marca.name:"",
                   img:producto.img

               }
               
          
          
           return res.send(produ)  
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
             req.session.productocomprado[i].cantidadXproducto=(req.session.productocomprado[i].cantidad*req.session.productocomprado[i].precio).toFixed(2)
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
        let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=req.session.productocomprado[i].cantidadXproducto
        }
        req.session.total=total
        return res.send({verEnChango:req.session.productocomprado,total})
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
   let total=0
   for(let i=0;i<req.session.productocomprado.length;i++){
       total+=req.session.productocomprado[i].cantidadXproducto
   }
   req.session.total=total
   return res.send({verEnChango:req.session.productocomprado,total})
   
}
function eliminarItemCarro(req,res){
    let iditem=req.params.id
   
       var items= req.session.productocomprado
  
   for(var i=0;i<items.length;i++){
        if(items[i].id==iditem){
            req.session.productocomprado.splice(i,1)
        }
   }
   
   
   return res.redirect('/carroCompra')
   
}

function verCarroCompra(req,res){
    let verEnChango=[]
    if(req.session.productocomprado){
        verEnChango= req.session.productocomprado
        let total=0
        for(let i=0;i<req.session.productocomprado.length;i++){
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
        req.session.total=total
        if(req.session.total==0){
            return res.render('frontEnd/carro-compra',{mensaje:"El carro de compras esta vacio"})
        }else{
            return res.render('frontEnd/carro-compra',{verEnChango,total})
        }
    }
    return res.render('frontEnd/carro-compra',{mensaje:"El carro de compras esta vacio"})
    
}
function agregarCantidad(req,res){
    var params=req.body;
    console.log(params)
    var items= req.session.productocomprado
  
    for(var i=0;i<items.length;i++){
         if(items[i].id==params.id){
             req.session.productocomprado[i].cantidad=params.cantidad
             req.session.productocomprado[i].cantidadXproducto=(params.cantidad*req.session.productocomprado[i].precio).toFixed(2)
         }
    }
   

    return res.send("ok")
}
function enviarMail(req,res){
    var params=req.body
    let body="<ul><li>"+params.nombre+"</li><li>"+params.direccion+"</li><li>"+params.email+"</li></ul>"
    envioMail.sendEmail("rafazira83@gmail.com",params.email,"Compra Realizada",body)
}
module.exports={
    
    getproductos,
 getproductosPuntera,
 llenarCarroCompra,
 verCarroCompra,
 eliminarItem,
 agregarCantidad,
 getproductoById,
 mainPage,
 eliminarItemCarro,
 enviarMail

  


}