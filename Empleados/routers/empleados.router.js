// rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/empleados.controller");

const allProductos = require("../controllers/empleados.controller");

//metodo get
// todos los empleados
router.get('/', controller.allEmpleado);

// un solo empleado
router.get('/:id', controller.showEmpleado);

////metodo post

router.post ('/', controller.storeEmpleado);

//put

router.put('/:id', controller.updateEmpleado);


// delete

router.delete('/:id',controller.destroyEmpleado);




/////export
module.exports = router;