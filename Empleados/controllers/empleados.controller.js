// controladores de los modulos

const db = require("../bd/bd");


/// metodo get//

// todos los empleados

const allEmpleado = (req, res) =>{
 
    const sql = "SELECT * FROM empleados";
    db.query(sql, (error,rows) =>{
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }

        res.json(rows);
    });

};

// para un Empleado

const showEmpleado = (req, res) =>{

    const {id} = req.params;
    const sql = "SELECT * FROM empleados WHERE id = ?";
    db.query(sql, [id], (error,rows) =>{

        console.log(rows);
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }
        if (rows.length == 0){
            return res.status(404).send({error: "no existe el empleado"});
        };
        res.json(rows[0]);
    });

};

// post

const storeEmpleado = (req, res)=>{
    const {nombre,apellido,puesto,telefono}= req.body;
    const sql = "INSERT INTO empleados (nombre, apellido, puesto, telefono) VALUES (?,?,?,?)";
    db.query(sql,[nombre, apellido, puesto, telefono], (error,result)=>{
         console.log(result);
        if (error){
            return res.status(500).json({error : "ERROR: intente mas tarde"});

        }
        if (rows.length ==0){
            return res.status(404).send({error: "no existe el empleado"});
        
        };
        const empleado = {...req.body, id: result.insertId};
        res.status(201).json(empleado);
        
    });

    
    //nombre
   //apellido
   //puesto
   //telefono
};

//put
const updateEmpleado= (req,res)=>{
    const {id}= req.params;
    const {nombre,apellido,puesto,telefono}= req.body;
    const sql = "UPDATE empleados SET nombre = ?, apellido = ?, puesto = ?, telefono = ? WHERE  id = ?";
    db.query(sql,[nombre, apellido, puesto, telefono, id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el empleado a modificar no existe"});
       };
       const empleado = {...req.body, ...req.params};
       res.json(empleado);
       
   });
};


/// delete

const destroyEmpleado = (req,res)=>{
    const {id}= req.params;
    const {nombre,apellido,puesto,telefono}= req.body;
    const sql = "DELETE FROM empleados WHERE id = ?";
    db.query(sql,[id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el empleado a eliminar no existe"});
       };
       res.json({mesaje: "Empleado eliminado"});
       
   });
};




/// exports
module.exports = {
    allEmpleado,
    showEmpleado,
    storeEmpleado,
    updateEmpleado,
    destroyEmpleado
}