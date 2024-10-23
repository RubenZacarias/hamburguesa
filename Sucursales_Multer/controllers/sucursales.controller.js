// controladores de los modulos

const db = require("../bd/bd");


/// metodo get//

// todos las sucursales

const allSucursales = (req, res) =>{
 
    const sql = "SELECT * FROM sucursales";
    db.query(sql, (error,rows) =>{
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }

        res.json(rows);
    });

};

// para una sucursal

const showSucursal = (req, res) =>{

    const {id} = req.params;
    const sql = "SELECT * FROM sucursales WHERE id = ?";
    db.query(sql, [id], (error,rows) =>{

        console.log(rows);
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }
        if (rows.length == 0){
            return res.status(404).send({error: "no existe la Sucursal"});
        };
        res.json(rows[0]);
    });

};

// post

const storeSucursal = (req, res)=>{
    console.log(req.file);
    let Imagen = "";
    if(req.file){
        Imagen= req.file.filename;
    }

    const {nombre,direccion,telefono,ciudad}= req.body;
    const sql = "INSERT INTO sucursales (nombre, direccion, telefono, ciudad, imagen) VALUES (?,?,?,?,?)";
    db.query(sql,[nombre, direccion, telefono, ciudad, Imagen], (error,result)=>{
         console.log(result);
         if(error){
            return res.status(500).json({error : "ERROR: intente mas tarde"});

         }
         
        const sucursal = {...req.body, id: result.insertId};
        res.status(201).json(sucursal);
        
    });

    
    //nombre
   //direccion
   //telefono
   //ciudad
   //imagen
};

//put
const updateSucursal= (req,res)=>{
    const {id}= req.params;
    const {nombre,direccion,telefono,ciudad,imagen}= req.body;
    const sql = "UPDATE sucursales SET nombre = ?, direccion = ?, telefono = ?, ciudad = ?, imagen = ? WHERE  id = ?";
    db.query(sql,[nombre, direccion, telefono, ciudad,imagen, id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR La sucursal a modificar no existe"});
       };
       const sucursal = {...req.body, ...req.params};
       res.json(sucursal);
       
   });
};


/// delete

const destroySucursal = (req,res)=>{
    const {id}= req.params;
    const {nombre,direccion,telefono,ciudad, imagen}= req.body;
    const sql = "DELETE FROM sucursales WHERE id = ?";
    db.query(sql,[id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el empleado a eliminar no existe"});
       };
       res.json({mesaje: "Sucursal eliminada"});
       
   });
};




/// exports
module.exports = {
    allSucursales,
    showSucursal,
    storeSucursal,
    updateSucursal,
    destroySucursal
}