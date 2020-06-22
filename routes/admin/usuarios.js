var express = require('express');
var router = express.Router();
var user=require('../../controlador/admin/usuarios')
var check=require('../../middleware/checkSingIn')
var multipart=require('connect-multiparty')
var md_upload = multipart({uploadDir:'./imagenes/usuario'})

/* GET users listing. */
router.get('/users',user.getUsers );
router.get('/borrarUser/:id',user.borrarUsuario );
router.get('/listUser',check.checkSignIn,user.listUser );
router.post('/register',user.saveUser );
router.get('/create',check.checkSignIn,user.createUser );
router.get('/edit/:id',check.checkSignIn,user.editUser );
router.get('/register',user.register );
router.get('/login',check.checkSignInLogin,user.login );
router.get('/logout',user.logout);
router.post('/login',user.loginUser );
router.post('/edit',check.checkSignIn,user.editUserPost );
router.post('/upload',[check.checkSignIn,md_upload],user.cambiarAvatar );
router.get('/getImage/:img',user.getImageFile );

module.exports = router;
