var User= require('../../model/user');
var path = require('path');
var moment = require('moment')
var bcrypt=require('bcrypt-nodejs')
var fs = require('fs');

//Esta funcion trae a los usuarios desde la base de datos
function getUsers(req,res){
    let search=req.query.search.value
    User.find({eliminado: { $ne: true },name: new RegExp(search,"i")},'_id name surname email')
    .exec((err,usuario)=>{
        res.json({
            data: usuario,
            draw: req.draw,
            recordsTotal: usuario.length,
            recordsFiltered: usuario.length,
        })  
    })
}

function login(req,res){

    res.render('admin/usuarios/login')
}

function register(req,res){
    var user=new User()
    res.render('admin/usuarios/register',{user})
}
function logout(req, res){
    req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
            res.redirect('/admin/');
        }
        
      });
    }
function saveUser(req,res){
    var params=req.body;
    var user =new User();
    if(params.name && params.surname && params.email && params.pass){
        user.name=params.name;
        user.surname=params.surname;
        user.email=params.email.toLowerCase();
        user.CreateAt=moment().unix();
        user.img="imagenotfound.png",
        user.eliminado=false
        if(params.pass!==params.passR){
            res.render('admin/usuarios/register',{user,message:'Las contraseñas no son iguales'})
        }
        User.find({$or: [
                {email: user.email.toLowerCase()}
        ]}).exec((err,users)=>{
            if(err) return res.render('admin/usuarios/register',{message:'Se produjo un error, intente nuevamente'})
            
            if(users && users.length>=1){
                return res.render('admin/usuarios/register',{user,message:'Ya hay un usuario registrado con este mail'})
            }else{
                bcrypt.hash(params.pass,null,null,(err,hash)=>{
                    user.password=hash;
        
                    user.save((err,userStored)=>{
                        if(err) return res.render('admin/usuarios/register',{message:'Error al guardar el usuario'})
        
                        if(userStored){
                            res.redirect('/admin/users/login');
                        }else{
                            res.render('admin/usuarios/register',{message:'No se ha registrado el usuario'})
                        }
                    })
                })
            }
        })
    }else{
        user.name=params.name;
        user.surname=params.surname;
        user.email=params.email;
        user.CreateAt=moment().unix();
        res.render('admin/usuarios/register',{user,message:'Completa todos los campos'}
        )
    }
}
function loginUser(req,res){
    var params=req.body;
    var email=params.email.toLowerCase();
    var pass=params.pass;

    User.findOne({email:email},(err,user)=>{
        if(err) return res.render('admin/usuarios/login',{message:'Algo salio mal'});
        if(user){
            bcrypt.compare(pass,user.password,(err,check)=>{
                if(check){
                    
                    req.session.iduser=user._id
                    req.session.nameuser=user.name
                    req.session.imguser=user.img
                    req.session.email=user.email
                    
                   
                    return res.redirect('/admin/index')
                }else{
                    return res.render('admin/usuarios/login',{message:'algunos de los datos esta mal'})
                }
            })
        }else{
            return res.render('admin/usuarios/login',{message:'no se encontro el usuario'}) 
        }
    })
}
//
function listUser(req,res){
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        res.render('admin/usuarios/grillaUsuarios',{data});
    
}

function createUser(req,res){
    let id=req.session.iduser;
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
     
            var user=new User()
        res.render('admin/usuarios/userCreate',{user,data});
    
}
function editUser(req,res){
    let idEdit=req.params.id
    var data={
        name:req.session.nameuser,
        id:req.session.iduser,
        img:req.session.imguser,
        email:req.session.email
       }
        User.findById(idEdit,function(err,user){
            res.render('admin/usuarios/userEdit',{user,data});
        })
    
}

function editUserPost(req,res){
    let params=req.body

            User.findByIdAndUpdate(params.id, {name:params.name,surname:params.surname,email:params.email }, { new: true }, (err, userUpdated) => {
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

                return res.redirect('/admin/users/listUser')
            })
}

function borrarUsuario(req,res){
    console.log( req)
    let IdUsuarios = req.params.id;
    
    User.findByIdAndUpdate(IdUsuarios, {eliminado:true} , { new: true }, (err, userUpdated) => {
        
        //Estas son validaciones que informan si hubo un error
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

        //
        return res.redirect('/admin/users/listUser')
     
    })
}

function cambiarAvatar(req,res){
    console.log(req.files)
    let id=req.session.iduser
   
   
    if (req.files) {
        var file_path = req.files.foto.path;
        console.log(file_path)
        var file_split = file_path.split('/');
        console.log(file_split)
        var file_name = file_split[2];
        console.log(file_name)
        var ext_split = file_name.split('.');
        console.log(ext_split)
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'GIF') {
            User.findById(id,(err,usu)=>{
                if(usu.img!=null){
                    if(usu.img!='imagenotfound.png'){
                        fs.unlinkSync('./imagenes/usuario/'+usu.img)
                    }
                   
                }
               
            })
            User.findByIdAndUpdate(id, { img: file_name }, { new: true }, (err, userUpdated) => {
             
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!userUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })
                req.session.imguser=userUpdated.img
                return res.redirect('/admin/index')
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
  var pathFile = './imagenes/usuario/' + imageFile

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


module.exports={
    getUsers,
    listUser,
    saveUser,
    register,
    login,
    loginUser,
    logout,
    createUser,
    editUser,
    editUserPost,
    borrarUsuario,
    getImageFile,
    cambiarAvatar

}