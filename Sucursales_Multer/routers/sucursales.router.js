// rutas del modulo
const express = require("express");
const router = express.Router();

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
    limits: {fileSize: 1024 * 1024 * 1},
});


const controller = require("../controllers/sucursales.controller");

//const allSucursales = require("../controllers/sucursales.controller");

//metodo get
// todas las sucursales
router.get('/', controller.allSucursales);

// una sola sucursal
router.get('/:id', controller.showSucursal);

////metodo post

router.post ('/', uploads.single("imagen"), controller.storeSucursal);

//put

router.put('/:id', controller.updateSucursal);


// delete

router.delete('/:id',controller.destroySucursal);




/////export
module.exports = router;