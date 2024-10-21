// controladores de los modulos

const db = require("../bd/bd");


/// metodo get//

// todos los Usuarios

const allUsuario = (req, res) =>{
 
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error,rows) =>{
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }

        res.json(rows);
    });

};

// para un Usuario

const showUsuario = (req, res) =>{

    const {id} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, [id], (error,rows) =>{

        console.log(rows);
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }
        if (rows.length == 0){
            return res.status(404).send({error: "este Usuario no existe"});
        };
        res.json(rows[0]);
    });

};

// post

const storeUsuario = (req, res)=>{
    const {nombre,email,password}= req.body;
    const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?,?,?)";
    db.query(sql,[nombre, email, password], (error,result)=>{
         console.log(result);
         if(error){
            return res.status(500).json({error : "ERROR: intente mas tarde"});

         }
         if(rows.length == 0){
            return res.status(404).send({error: "no existe el usuario"});
        
         };
        const usuario = {...req.body, id: result.insertId};
        res.status(201).json(usuario);
        
    });

    
    //nombre
   //email
   //password
   
};

//put
const updateUsuario= (req,res)=>{
    const {id}= req.params;
    const {nombre,email,password}= req.body;
    const sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE  id = ?";
    db.query(sql,[nombre, email, password, id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR El Usuario a modificar no existe"});
       };
       const usuario = {...req.body, ...req.params};
       res.json(usuario);
       
   });
};


/// delete

const destroyUsuario = (req,res)=>{
    const {id}= req.params;
    const {nombre,email,password}= req.body;
    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.query(sql,[id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el Usuario a eliminar no existe"});
       };
       res.json({mesaje: "Usuario eliminado"});
       
   });
};




/// exports
module.exports = {
    allUsuario,
    showUsuario,
    storeUsuario,
    updateUsuario,
    destroyUsuario
}