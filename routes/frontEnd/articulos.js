var express = require('express');
var router = express.Router();
var articulos=require('../../controlador/frontEnd/artiuclos')


router.get('/',articulos.getproductos );
router.get('/promociones',articulos.getproductosPuntera );
router.get('/enviarCarroCompra/:id',articulos.llenarCarroCompra );
router.get('/borrarItem/:id',articulos.eliminarItem)
router.get('/carroCompra',articulos.verCarroCompra)
router.post('/agregarCantidad',articulos.agregarCantidad),




module.exports = router;