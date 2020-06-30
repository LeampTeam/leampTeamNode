var Producto= require('../../model/producto');
var Categoria= require('../../model/categoria');
var Fragancia= require('../../model/fragancia');
var Marca= require('../../model/marca');
var envioMail=require('../../service/envioMail')
var Pedido= require('../../model/pedido');
var itemPedido= require('../../model/productoItem');
var moment = require('moment')


var pdf = require('html-pdf');


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
    ).populate({path:'categoria',populate:{path:'fragancias'}}).populate('fragancia').populate('marca')
   
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
                   catecolor:producto[i].categoria!=null?producto[i].categoria.color:"",
                   fragancate:producto[i].categoria!=null?producto[i].categoria.fragancias!=null?producto[i].categoria.fragancias:[]:[],
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
           let total=0
           if(req.session.productocomprado){
            productoscomprados=req.session.productocomprado
            for(let i=0;i<req.session.productocomprado.length;i++){
                total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
                }
           }
           
           
            res.render('frontEnd/articulos',{progroup,productoscomprados,total:total.toFixed(2)})  
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
               let total=0
           if(req.session.productocomprado){
            productoscomprados=req.session.productocomprado
            for(let i=0;i<req.session.productocomprado.length;i++){
                total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
                }
           }
          
            
               res.render('frontEnd/puntera',{productosVista,productoscomprados,total:total.toFixed(2)})  
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
             let total=0
             for(let i=0;i<req.session.productocomprado.length;i++){
                 total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
             }
             req.session.total=total.toFixed(2)
             return res.send({verEnChango:req.session.productocomprado,total:total.toFixed(2)})
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
            total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
        }
        req.session.total=total.toFixed(2)
        return res.send({verEnChango:req.session.productocomprado,total:total.toFixed(2)})
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
       total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
   }
   
   req.session.total=total.toFixed(2)
   return res.send({verEnChango:req.session.productocomprado,total:total.toFixed(2)})
   
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
   
    let total=0
    for(let i=0;i<req.session.productocomprado.length;i++){
        total+=parseFloat(req.session.productocomprado[i].cantidadXproducto)
    }
    return res.send({total:total.toFixed(2)})
}
function enviarMail(req,res){
    var params=req.body
    var pedido=new Pedido()


    pedido.name='PedidoWeb'
    pedido.nombreCliente=params.nombre
    pedido.direccionCliente=params.direccion
    pedido.emailCliente=params.email
    pedido.telefonoCliente=params.telefono
    pedido.codigoPostal=params.codigoPostal
    pedido.totalCompra=req.session.total
    pedido.eliminado=false
    pedido.CreateAt=moment().unix();
    for(let i=0;i<req.session.productocomprado.length;i++){
        let pitem=new itemPedido()
        pitem.name=req.session.productocomprado[i].descripcion
        pitem.idProducto=req.session.productocomprado[i].id
        pitem.cantidad=req.session.productocomprado[i].cantidad
        pitem.eliminado=false
        pitem.CreateAt=moment().unix();
        pitem.save(function(err, item){
            if(err)console.log('itemsave',err)
               
        })
        pedido.items.push(pitem)
    }
    pedido.save(function(err,ped){
        if(err)console.log('pedidosave',err)

        var contenido='<h1>Este es un pdf de prueba</h1>'
    
    var options = {
        "format": 'A4',
        "header": {
            "height": "60px"
        },
        "footer": {
            "height": "22mm"
        },
        "base": 'file://Users/midesweb/carpeta_base/pdf/'
       };
       let idped=ped.id
    pdf.create(contenido,options).toFile('pdf/'+idped+'.pdf', function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
          
            let body="<ul><li>"+params.nombre+"</li><li>"+params.direccion+"</li><li>"+params.email+"</li></ul>"
            envioMail.sendEmail("rafazira83@gmail.com",params.email,"Compra Realizada",body,idped+'.pdf')
            // envioMail.sendEmail("ziraldodiego@gmail.com","ziraldodiego@gmail.com","PdfClienteRecibido",body,idped+'.pdf')

            req.session.destroy()
            
        }
    });

    })
    return res.render('frontEnd/mensajeEmailEnviado')

    
  
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