// controladores de los modulos

const db = require("../bd/bd");


/// metodo get//

// todos los clientes

const allClientes = (req, res) =>{
 
    const sql = "SELECT * FROM clientes";
    db.query(sql, (error,rows) =>{
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }

        res.json(rows);
    });

};

// para un Cliente

const showCliente = (req, res) =>{

    const {id} = req.params;
    const sql = "SELECT * FROM clientes WHERE id = ?";
    db.query(sql, [id], (error,rows) =>{

        console.log(rows);
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }
        if (rows.length == 0){
            return res.status(404).send({error: "no existe el Cliente"});
        };
        res.json(rows[0]);
    });

};

// post

const storeCliente = (req, res)=>{
    const {nombre, apellido, direccion,mail, telefono}= req.body;
    const sql = "INSERT INTO clientes (nombre, apellido, direccion,mail, telefono) VALUES (?,?,?,?,?)";
    db.query(sql,[nombre,apellido, direccion, mail, telefono], (error,result)=>{
         console.log(result);
         if(error){
            return res.status(500).json({error : "ERROR: intente mas tarde"});

         }
         //if(rows.length == 0){
          //  return res.status(404).send({error: "no existe el Cliente"});
        
         //};
        const empleado = {...req.body, id: result.insertId};
        res.status(201).json(empleado);
        
    });

    
    //nombre
   //apellido
   //direccion
   //mail
   //telefono
};

//put
const updateCliente= (req,res)=>{
    const {id}= req.params;
    const {nombre,apellido,direccion, mail,telefono}= req.body;
    const sql = "UPDATE clientes SET nombre = ?, apellido = ?, direccion = ?, mail = ?, telefono = ? WHERE  id = ?";
    db.query(sql,[nombre, apellido, direccion,mail, telefono, id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el Cliente a modificar no existe"});
       };
       const empleado = {...req.body, ...req.params};
       res.json(empleado);
       
   });
};


/// delete

const destroyCliente = (req,res)=>{
    const {id}= req.params;
    const {nombre,apellido,direccion,mail,telefono}= req.body;
    const sql = "DELETE FROM clientes WHERE id = ?";
    db.query(sql,[id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el Cliente a eliminar no existe"});
       };
       res.json({mesaje: "Empleado eliminado"});
       
   });
};




/// exports
module.exports = {
    allClientes,
    showCliente,
    storeCliente,
    updateCliente,
    destroyCliente
}