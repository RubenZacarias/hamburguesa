// rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/usuarios.controller");
//const controller = require("../controllers/usuarios.controller");

const allUsuario = require("../controllers/usuarios.controller");

//metodo get
// todos los empleados
router.get('/', controller.allUsuario);

// un solo empleado
router.get('/:id', controller.showUsuario);

////metodo post

router.post ('/', controller.storeUsuario);

//put

router.put('/:id', controller.updateUsuario);


// delete

router.delete('/:id',controller.destroyUsuario);




/////export
module.exports = router;