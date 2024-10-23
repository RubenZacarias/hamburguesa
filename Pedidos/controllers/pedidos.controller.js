// controladores de los modulos

const db = require("../bd/bd");


/// metodo get//

// todos los pedidos

const allPedidos = (req, res) =>{
 
    const sql = "SELECT * FROM pedidos";
    db.query(sql, (error,rows) =>{
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }

        res.json(rows);
    });

};

// para un solo pedido especifico 

const showPedido = (req, res) =>{

    const {id} = req.params;
    const sql = "SELECT * FROM pedidos WHERE id = ?";
    db.query(sql, [id], (error,rows) =>{

        console.log(rows);
        if (error){
            return res.status(500).json({error : "ERROR : Intente mas tarde"});
        }
        if (rows.length == 0){
            return res.status(404).send({error: "no existe el pedido solicitado"});
        };
        res.json(rows[0]);
    });

};

// post

const storePedido = (req, res)=>{
    const {id_cliente,id_producto,cantidad,fecha}= req.body;
    const sql = "INSERT INTO pedidos (id_cliente, id_producto, cantidad, fecha) VALUES (?,?,?,?)";
    db.query(sql,[id_cliente, id_producto, cantidad, fecha], (error,result)=>{
         console.log(result);
         if(error){
            return res.status(500).json({error : "ERROR: intente mas tarde"});

         }
         if(rows.length == 0){
            return res.status(404).send({error: "no existe el pedido"});
        
         };
        const pedido = {...req.body, id: result.insertId};
        res.status(201).json(pedido);
        
    });

    
    //id_cliente
   //id_producto
   //cantidad
   //fecha
};

//put
const updatePedido= (req,res)=>{
    const {id}= req.params;
    const {id_cliente,id_producto,cantidad,fecha}= req.body;
    const sql = "UPDATE pedidos SET id_cliente = ?, id_producto = ?, cantidad = ?, fecha = ? WHERE  id = ?";
    db.query(sql,[id_cliente, id_producto, cantidad, fecha, id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el pedido a modificar no existe"});
       };
       const pedido = {...req.body, ...req.params};
       res.json(pedido);
       
   });
};


/// delete

const destroyPedido = (req,res)=>{
    const {id}= req.params;
    const {id_cliente,id_producto,cantidad,fecha}= req.body;
    const sql = "DELETE FROM pedidos WHERE id = ?";
    db.query(sql,[id], (error,result)=>{
        console.log(result);
       if (error){
           return res.status(500).json({error : "ERROR: intente mas tarde"});

       }
       if(result.affectedRows == 0){
        return res.status(404).send({error : "ERROR el pedido a eliminar no existe"});
       };
       res.json({mesaje: "Pedido eliminado"});
       
   });
};




/// exports
module.exports = {
    allPedidos,
    showPedido,
    storePedido,
    updatePedido,
    destroyPedido
}