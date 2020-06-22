var puntera=require('../../controlador/admin/puntera')
var express = require('express');
var router = express.Router();
var check=require('../../middleware/checkSingIn')

router.get('/puntera',check.checkSignIn,puntera.puntera);
router.get('/guardarProductoPuntera/:id',check.checkSignIn,puntera.guardarProductoPuntera);
router.get('/sacarDePuntera/:id',check.checkSignIn,puntera.sacarPuntera);
// router.get('/categorias',check.checkSignIn,categoria.categorias);
// router.get('/create',check.checkSignIn,categoria.create);
// router.post('/create',check.checkSignIn,categoria.createPost);
// router.get('/edit/:id',check.checkSignIn,categoria.edit);
// router.post('/edit',check.checkSignIn,categoria.editPost);
// router.post('/delete',check.checkSignIn,categoria.delete);

module.exports = router;
