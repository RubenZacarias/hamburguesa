// rutas del modulo
const express = require("express");
const router = express.Router();

const controller = require("../controllers/usuarios.controller");

// MULTER //

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
     destination:(req, file, cb)=> {
        cb(null, 'uploads'); // esta carpeta debe existir en el proyecto
     },
     filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));

     },
});

//const upload = multer({storage:"storage"});
const uploads =multer({
    storage,
    fileFilter: (req, file, cb)=>{
        console.log(file);
        const filetypes = /jpg|jpeg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
              path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && path.extname){
             return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, //aprox 1 mega
});


//const controller = require("../controllers/usuarios.controller");

//const allSucursales = require("../controllers/sucursales.controller");

//metodo get
// todas las sucursales
router.get('/', controller.allUsuario);

// una sola sucursal
router.get('/:id', controller.showUsuario);

////metodo post

router.post ('/', uploads.single("imagen_perfil"), controller.storeUsuario);

//put

router.put('/:id', controller.updateUsuario);


// delete

router.delete('/:id',controller.destroyUsuario);




/////export
module.exports = router;