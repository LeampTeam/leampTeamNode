
var Categoria= require('../../model/categoria');
var Puntera=require('../../model/puntera')
var Producto=require('../../model/producto')



function puntera(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
         Categoria.find({},function(err,categorias){
             Puntera.find({},function(err,puntera){
                
                if(puntera.length < 1 && puntera.productos==null){
                   var productos=[];
                    res.render('admin/puntera/puntera',{data,categorias,productos});
                }else{
                   var productos=puntera[0].productos
                   console.log(productos)
                    res.render('admin/puntera/puntera',{data,categorias,productos});
                }
             }).populate({
                path: 'productos',
                // Get friends of friends - populate the 'friends' array for every friend
                populate: { path: 'categoria' }
              })
                
            
         })

       
    
}
function guardarProductoPuntera(req,res){

    let id=req.params.id
    var splitPath=req.headers.referer.split('/')
    console.log('path',splitPath)
    
    Puntera.find({},function(err,puntera){
        Producto.findByIdAndUpdate(id,{estaEnPuntera:'true'},function(err,prod){
            if(puntera.length>0){
                puntera[0].productos.push(id)
                puntera[0].save()
                res.redirect('/'+splitPath[3]+'/'+splitPath[4]+'/'+splitPath[5])
            
            
            }else{
                let punteraGuardar=new Puntera();
                punteraGuardar.productos.push(id)
                punteraGuardar.save(function(err,save){
                    res.redirect('/'+splitPath[3]+'/'+splitPath[4]+'/'+splitPath[5])
                
                })
            }


        }).populate('productos')
    })
    
}

function sacarPuntera(req,res){

    let id=req.params.id

    Puntera.find({},function(err,puntera){
        Producto.findByIdAndUpdate(id,{estaEnPuntera:'false'},function(err,prod){
        let productos=puntera[0].productos
        let pos=productos.indexOf(id)
        puntera[0].productos.splice(pos,1)
            puntera[0].save(function(err,save){
                res.redirect('/admin/puntera/puntera')
            });
        })
       
    })
}



module.exports={
    puntera,
    guardarProductoPuntera,
    sacarPuntera
}