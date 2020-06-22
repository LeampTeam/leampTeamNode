var Producto= require('../../model/producto');
var Categoria= require('../../model/categoria');
var Fragancia= require('../../model/fragancia');
var Marca= require('../../model/marca');
var path = require('path');
var fs = require('fs');
var moment = require('moment')



function grilla(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/producto/produGrilla',{data});
    
}

function productos(req,res){
    let search=req.query.search.value
    let start=parseInt(req.query.start)
    let length=parseInt(req.query.length)
    // $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
   
    Producto.find({eliminado: { $ne: true }, $or: [{name: new RegExp(search,"i")},{code: new RegExp(search,"i")}]},
    '_id description price code stock categoria.name img estaEnPuntera')
        .populate('categoria')
        .exec((err,producto)=>{
            
           var prodfilt= producto.slice(start,(start+length))
           console.log(prodfilt)
          
            res.json({
                data:prodfilt,
                draw:req.draw,
                recordsTotal: producto.length,
                recordsFiltered: producto.length,
               
            })  
        })
}

function create(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
    
    
         let producto=new Producto()
         Categoria.find({},function(error,categorias){
            Fragancia.find({},function(error,fragancias){
                Marca.find({},function(error,marcas){
                    res.render('admin/producto/produCreate',{data,producto,categorias,fragancias,marcas});
                })
                
            })
         })
    
}

function createPost(req,res){
    let params=req.body;
    console.log(params)
    let producto =new Producto();
    
        producto.name=params.name;
        producto.code=params.code;
        producto.description=params.description;
        producto.stock=params.stock;
        producto.price=params.price;
        producto.priceMayor=params.priceMayor;
        producto.marca=params.marca;
        producto.estaEnPuntera='false'
        if(params.fragancia==0){
            producto.esFragancia=false
            producto.fragancia=null
        }else{
            producto.esFragancia=true
            producto.fragancia=params.fragancia
        }
        
        producto.categoria=params.categoria!="0"?params.categoria:null;
        producto.marca=params.marca!="0"?params.marca:null;
        producto.img=null  
        producto.CreateAt=moment().unix();
        producto.eliminado=false
        if(params.name&&params.description&&params.code&&params.stock&&params.price&&params.categoria!="0"&&params.marca!="0"){
            producto.save((err,userStored)=>{
                if(err){
                    var data={
                        name:req.session.nameuser,
                        id:req.session.iduser,
                        img:req.session.imguser,
                        email:req.session.email
                       }
                    Categoria.find({},function(error,categorias){
                        Fragancia.find({},function(error,fragancias){
                            Marca.find({},function(error,marcas){
                             return  res.render('admin/producto/produCreate',{data,producto,categorias,fragancias,marcas,message:'Completa todos los campos'});
                            })
                            
                        })
                     })
                } 

                if(userStored){
                    res.redirect('/admin/producto/grilla');
                }else{
                    res.render('admin/producto/produCreate',{message:'Error al guardar'})
                }
            })
        }else{
        var data={
            name:req.session.nameuser,
            id:req.session.iduser,
            img:req.session.imguser,
            email:req.session.email
           }
        Categoria.find({},function(error,categorias){
            Fragancia.find({},function(error,fragancias){
                Marca.find({},function(error,marcas){
                    res.render('admin/producto/produCreate',{data,producto,categorias,fragancias,marcas,message:'Completa todos los campos'});
                })
                
            })
         })
       
        
    }
}

function edit(req,res){
  
    let idEdit=req.params.id
    
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
            console.log(data)

                Producto.findById(idEdit,function(err,producto){
                    Categoria.find({},function(error,categorias){
                        Marca.find({},function(error,marcas){
                            Fragancia.find({},function(error,fragancias){
                                let checkedo="";
                                console.log(categorias)
                                if(producto.esFragancia){
                                    checkedo=true
                                }else{
                                    checkedo=false
                                }
                                console.log(producto)
                        res.render('admin/producto/produEdit',{data,producto,categorias,fragancias,marcas,checkedo:checkedo});
                    })
                })
            })
        }).populate('categoria').populate('fragancia').populate('marca')
   
}

function getProducts(req,res){
    
    let search=req.body.search
    console.log(search)
        Producto.find( {description: new RegExp(search,"i")},function(err,producto){
            
                console.log(producto)    
            return res.status(200).send({producto})
        })
}

function getProductsPuntera(req,res){
    
    let search=req.body.search
    let cate=req.body.cate
    console.log(search)
    console.log(cate)

        Producto.find({categoria:cate,description: new RegExp(search,"i")})
        .exec(function(err,producto){
            
            console.log(producto)    
        return res.status(200).send({producto})
    })   
}

function getProduct(req,res){
    
    let id=req.body.id
    console.log(id)
        Producto.findById( id,function(err,producto){
            
                console.log(producto)    
            return res.status(200).send({producto})
        })
}

function editPost(req,res){
    let params=req.body
    console.log(params)
    let pro={
        name:params.name,
        code:params.code,
        description:params.description,
        stock:params.stock,
        price:params.price,
        priceMayor:params.priceMayor,
        marca:params.marca,
        
       
        categoria:params.categoria,
        marca:params.marca
        
    }
    if(params.fragancia==0){
        pro.esFragancia=false
        pro.fragancia=null
    }else{
        pro.esFragancia=true
        pro.fragancia=params.fragancia
    }
    console.log(pro)

    Producto.findByIdAndUpdate(params.id, pro, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/producto/grilla')
    })
}
function uploadImage(req, res) {
    console.log(req.body.productId)
    var productid = req.body.productId
    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path)
        var file_split = file_path.split('/');
        console.log(file_split)
        var file_name = file_split[2];
        console.log(file_name)
        var ext_split = file_name.split('.');
        console.log(ext_split)
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Producto.findById(productid,(err,pro)=>{
                if(pro.img!=null){
                    if(pro.img!='imagenotfound.png'){
                        fs.unlinkSync('./imagenes/producto/'+pro.img)
                    }
                   
                }
               
            })
            Producto.findByIdAndUpdate(productid, { img: file_name }, { new: true }, (err, productUpdated) => {
               
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!productUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

                return res.redirect('/admin/producto/grilla')
            })
        } else {
            removeFilesOfUploads(res, file_path, 'La extencion no es valida')

        }
    } else {
        return res.status(200).send({ message: 'No se han subido archivos' })
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.img;
    console.log(imageFile)
    var pathFile = './imagenes/producto/' + imageFile

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(400).send({ message: 'El archivo no fue encotrado' })
        }
    })
}
function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}

function borrarProducto(req,res){
    console.log( req)
    let IdProductos = req.params.id;
    
    Producto.findByIdAndUpdate(IdProductos, {eliminado:true} , { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/producto/grilla')
     
    })


}

module.exports={
    grilla,
    productos,
    create,
    createPost,
    edit,
    editPost,
    getProduct,
    getProducts,
    uploadImage,
    getImageFile,
    getProductsPuntera,
    borrarProducto

}