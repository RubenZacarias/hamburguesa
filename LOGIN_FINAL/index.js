const express = require("express");
const app = express();

app.use(express.json());

const usuariosRouter = require("./routers/usuarios.router");
app.use('/usuarios', usuariosRouter);

app.get("/", (req, res) => {
    res.send("Estas son los usuarios de THE BURGUER!!");
});

const PORT =  3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


//const productosRouter = require("./routers/productos.router");
//app.use('/productos', productosRouter);

//app.get("/",(req,res) =>{
    //res.send("hola The Burguer como estan!!!!");
//});

//const PORT = 3000; // de manera local



