const express = require("express");
const app = express();

app.use(express.json());

const pedidosRouter = require("./routers/pedidos.router");
app.use('/pedidos', pedidosRouter);

app.get("/", (req, res) => {
    res.send("Estos son los pedidos de THE BURGUER!!");
});

const PORT =  3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


//const productosRouter = require("./routers/productos.router");
//app.use('/productos', productosRouter);

//app.get("/",(req,res) =>{
    //res.send("hola The Burguer como estan!!!!");
//});

//const PORT = 3000; // de manera local



