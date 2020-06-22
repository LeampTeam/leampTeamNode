var Fragancia= require('../../model/fragancia');
var path = require('path');
var moment = require('moment')



function grilla(req,res){
    
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/fragancia/fragaGrilla',{data});
     
}

function fragancias(req,res){
    let search=req.query.search.value
    Fragancia.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name ')
    .exec((err,fragancia)=>{
        res.json({
            data:fragancia,
            draw: req.draw,
            recordsTotal: fragancia.length,
            recordsFiltered: fragancia.length,
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
     
         let fragancia=new Fragancia()
        res.render('admin/fragancia/fragaCreate',{data,fragancia});
    
}

function createPost(req,res){
    let params=req.body;
    let fragancia =new Fragancia();
    if(params.name ){
        fragancia.name=params.name;
        fragancia.CreateAt=moment().unix();
        fragancia.eliminado=false
        fragancia.save((err,userStored)=>{
            if(err) return res.render('admin/fragancia/register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/admin/fragancia/grilla');
            }else{
                res.render('admin/fragancia/fragaCreate',{message:'Error al guardar'})
            }
        })
    }else{
        categoria.name=params.name;
        categoria.CreateAt=moment().unix();
        res.render('admin/fragancia/fragaCreate',{user,message:'Completa todos los campos'}
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
            Fragancia.findById(idEdit,function(err,fragancia){
                res.render('admin/fragancia/fragaEdit',{data,fragancia});
            
     })
}

function editPost(req,res){
    let params=req.body

    Fragancia.findByIdAndUpdate(params.id, {name:params.name}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/fragancia/grilla')
    })
}

function borrarFragancias(req,res){
    console.log(req)
    let IdFragancias = req.params.id;
    
    Fragancia.findByIdAndUpdate(IdFragancias, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //
        return res.redirect('admin/fragancia/grilla')
     
    })
}


module.exports={
    grilla,
    fragancias,
    create,
    createPost,
    edit,
    editPost,
    borrarFragancias

}