var fragancia=require('../../controlador/admin/fragancia')
var express = require('express');
var router = express.Router();
var check=require('../../middleware/checkSingIn')

router.get('/grilla',check.checkSignIn,fragancia.grilla);
router.get('/fragancias',check.checkSignIn,fragancia.fragancias);
router.get('/borrarFragancias/:id'/*falta check.checkSignIn*/,fragancia.borrarFragancias);
router.get('/create',check.checkSignIn,fragancia.create);
router.post('/create',check.checkSignIn,fragancia.createPost);
router.get('/edit/:id',check.checkSignIn,fragancia.edit);
router.post('/edit',check.checkSignIn,fragancia.editPost);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
