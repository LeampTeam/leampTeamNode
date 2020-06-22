var Marca= require('../../model/marca');
var path = require('path');
var moment = require('moment')



function grilla(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/marca/marcaGrilla',{data});
   
}

function marcas(req,res){
    let search=req.query.search.value
    Marca.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name ')
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
         let marca=new Marca()
        res.render('admin/marca/marcaCreate',{data,marca});
    
}

function createPost(req,res){
    let params=req.body;
    let marca =new Marca();
    if(params.name ){
        marca.name=params.name;
        marca.CreateAt=moment().unix();
        marca.eliminado=false
        marca.save((err,userStored)=>{
            if(err) return res.render('admin/marca/register',{message:'Error al guardar el usuario'})

            if(userStored){
                res.redirect('/admin/marca/grilla');
            }else{
                res.render('admin/marca/marcaCreate',{message:'Error al guardar'})
            }
        })
    }else{
        marca.name=params.name;
        marca.CreateAt=moment().unix();
        res.render('admin/marca/marcaCreate',{user,message:'Completa todos los campos'}
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
   
            Marca.findById(idEdit,function(err,marca){
                res.render('admin/marca/marcaEdit',{data,marca});
           
     })
}

function editPost(req,res){
    let params=req.body

    Marca.findByIdAndUpdate(params.id, {name:params.name}, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Erro en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        return res.redirect('/admin/marca/grilla')
    })
}

function borrarMarcas(req,res){
    console.log(req)
    let IdMarcas = req.params.id;
    
    Marca.findByIdAndUpdate(IdMarcas, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //Aqui vamos a poner la ruta desde donde queremos obtener los datos
        return res.redirect('/admin/marca/grilla')
     
    })
}


module.exports={
    grilla,
    marcas,
    create,
    createPost,
    edit,
    editPost,
    borrarMarcas

}