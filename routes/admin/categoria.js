var categoria=require('../../controlador/admin/categoria')
var express = require('express');
var router = express.Router();
var check=require('../../middleware/checkSingIn')

router.get('/grilla',check.checkSignIn,categoria.grilla);
router.get('/categorias',check.checkSignIn,categoria.categorias);
router.get('/borrarCategoria/:id',categoria.borrarCategoria);
router.get('/create',check.checkSignIn,categoria.create);
router.post('/create',check.checkSignIn,categoria.createPost);
router.get('/edit/:id',check.checkSignIn,categoria.edit);
router.post('/edit',check.checkSignIn,categoria.editPost);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
