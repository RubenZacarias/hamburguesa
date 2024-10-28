// rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/clientes.controller");

const allClientes = require("../controllers/clientes.controller");

//metodo get
// todos los clientes
router.get('/', controller.allClientes);

// un solo cliente
router.get('/:id', controller.showCliente);

////metodo post

router.post ('/', controller.storeCliente);

//put

router.put('/:id', controller.updateCliente);


// delete

router.delete('/:id',controller.destroyCliente);




/////export
module.exports = router;