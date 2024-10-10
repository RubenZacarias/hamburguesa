// controladores de los modulos

const db = require("../bd/db");


/// metodo get//

// todos los productos

const allProductos = (req, res) =>{
 
    const sql = "SELECT * FROM productos";
    db.query(sql, (error,rows) =>{
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }

        res.json(rows);
    });

};

// para un producto

const showProducto = (req, res) =>{

    const {id} = req.params;
    const sql = "SELECT * FROM productos WHERE id = ?";
    db.query(sql, [id], (error,rows) =>{

        console.log(rows);
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }
        if (rows.length == 0){
            return res.status(404).send({error: "no existe el producto"});
        };
        res.json(rows[0]);
    });

};

// post

const storeProducto = (req, res)=>{
    const {nombre,descripcion,precio,disponibilidad}= req.body;
    const sql = "INSERT INTO productos (nombre, descripcion, precio, disponibilidad) VALUES (?,?,?,?)";
    db.query(sql,[nombre, descripcion, precio, disponibilidad], (error,result)=>{
         console.log(result);
        if (error){
            return res.status(500).json({error : "ERROR: intente mas tarde"});

        }
        if (rows.length ==0){
            return res.status(404).send({error: "no existe la pelicula"});
        
        };
        const producto = {...req.body, id: result.insertId};
        res.status(201).json(producto);
        
    });

    //id_pelicula
    //nombre
   //descripcion
   //precio
   //disponibilidad
};

//put
const updateProducto= (req,res)=>{
    const {id}= req.params;
    const {nombre,descripcion,precio,disponibilidad}= req.body;
    const sql = "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, disponibilidad = ? WHERE  id = ?";
    db.query(sql,[nombre, descripcion, precio, disponibilidad, id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el producto a modificar no existe"});
       };
       const producto = {...req.body, ...req.params};
       res.json(producto);
       
   });
};


/// delete

const destroyProducto = (req,res)=>{
    const {id}= req.params;
    const {nombre,descripcion,precio,disponibilidad}= req.body;
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql,[id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el producto a eliminar no existe"});
       };
       res.json({mesaje: "Producto eliminado"});
       
   });
};




/// exports
module.exports = {
    allProductos,
    showProducto,
    storeProducto,
    updateProducto,
    destroyProducto
}