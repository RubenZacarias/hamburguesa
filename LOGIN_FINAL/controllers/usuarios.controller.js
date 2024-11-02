// controladores de los modulos
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../bd/bd");


/// metodo get//

// todos los usuarios

const allUsuario = (req, res) =>{
 
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error,rows) =>{
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }

        res.json(rows);
    });

};

// para una sucursal

const showUsuario = (req, res) =>{

    const {id} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, [id], (error,rows) =>{

        console.log(rows);
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }
        if (rows.length == 0){
            return res.status(404).send({error: "no existe El Usuario"});
        };
        res.json(rows[0]);
    });

};

// post

const storeUsuario = (req, res)=>{
    console.log(req.file);
    let Imagen = "";
    if(req.file){
        Imagen= req.file.filename;
    }
 
    const {nombre,email,password}= req.body;
    if (!nombre || !email || !password ){
        return res.status(400).send("Todos los campos son obligatorios");
    }
      

    //encriptacion

    bcrypt.hash(password, 8, (err,hashedPassword)=>{
        if (err){
            return res.status(500).send("error de encriptacion")
        }
    
   

    
        const sql = "INSERT INTO usuarios (nombre, email, password, imagen_perfil ) VALUES (?,?,?,?)";
        db.query(sql,[nombre, email, hashedPassword,  Imagen], (error,result)=>{
            console.log(result);
            if(error){
                return res.status(500).json({error : "ERROR: intente mas tarde"});

            }
            
            const usuario = {...req.body, id: result.insertId};
            res.status(201).json(usuario);
            
        });
    });

    
    //nombre
   //email
   //password
   //imagen_perfil
   //imagen
};

//put
const updateUsuario= (req,res)=>{
    const {id}= req.params;
    const {nombre,email,password,imagen_perfil,imagen}= req.body;
    const sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, imagen_perfil = ?, imagen = ? WHERE  id = ?";
    db.query(sql,[nombre, email, password, imagen_perfil,imagen, id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR El usuario a modificar no existe"});
       };
       const usuario = {...req.body, ...req.params};
       res.json(usuario);
       
   });
};


/// delete

const destroyUsuario = (req,res)=>{
    const {id}= req.params;
    const {nombre,email,password,imagen_perfil, imagen}= req.body;
    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.query(sql,[id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el usuario a eliminar no existe"});
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