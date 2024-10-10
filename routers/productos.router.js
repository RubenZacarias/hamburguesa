// rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/productos.controller");

const allProductos = require("../controllers/productos.controller");

//metodo get
// todos los productos
router.get('/', controller.allProductos);

// un solo producto
router.get('/:id', controller.showProducto);

////metodo post

router.post ('/', controller.storeProducto);

//put

router.put('/:id', controller.updateProducto);


// delete

router.delete('/:id',controller.destroyProducto);




/////export
module.exports = router;