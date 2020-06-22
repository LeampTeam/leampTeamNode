var Categoria= require('../../model/categoria');
var path = require('path');
var moment = require('moment')


function grilla(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/categoria/cateGrilla',{data});
    
}

function categorias(req,res){
    let search=req.query.search.value
    Categoria.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name ')
    .exec((err,categorias)=>{
        res.json({
            data:categorias,
            draw: req.draw,
            recordsTotal: categorias.length,
            recordsFiltered: categorias.length,
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
         let categoria=new Categoria()
        res.render('admin/categoria/cateCreate',{data,categoria});
    
}

function createPost(req,res){
    let params=req.body;
    let categoria =new Categoria();
    if(params.name ){
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        categoria.eliminado=false
        categoria.save((err,userStored)=>{
            if(err) return res.render('admin/categoria/register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/admin/categoria/grilla');
            }else{
                res.render('admin/categoria/cateCreate',{message:'Error al guardar'})
            }
        })
    }else{
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        res.render('admin/categoria/cateCreate',{user,message:'Completa todos los campos'}
        )
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
  
            Categoria.findById(idEdit,function(err,categoria){
                res.render('admin/categoria/cateEdit',{data,categoria});
            
     })
}

function editPost(req,res){
    let params=req.body

    Categoria.findByIdAndUpdate(params.id, {name:params.name}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/categoria/grilla')
    })
}

function borrarCategoria(req,res){
    console.log(req)
    let IdCategoria = req.params.id;
    
    Categoria.findByIdAndUpdate(IdCategoria, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //
        return res.redirect('/admin/categoria/grilla')
     
    })
}

module.exports={
    grilla,
    categorias,
    create,
    createPost,
    edit,
    editPost,
    borrarCategoria,

}