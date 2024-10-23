// rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/pedidos.controller");

const allProductos = require("../controllers/pedidos.controller");

//metodo get
// todos los empleados
router.get('/', controller.allPedidos);

// un solo empleado
router.get('/:id', controller.showPedido);

////metodo post

router.post ('/', controller.storePedido);

//put

router.put('/:id', controller.updatePedido);


// delete

router.delete('/:id',controller.destroyPedido);




/////export
module.exports = router;