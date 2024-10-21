require("dotenv").config();


const express = require("express");
const app = express();

app.use(express.json());

const usuariosRouter = require("./routers/usuarios.router");
app.use('/usuarios', usuariosRouter);

app.use("/auth", require("./routers/auth.router"));

app.get("/", (req, res) => {
    res.send("Hola USUARIOS de THE BURGUER!!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


//const productosRouter = require("./routers/productos.router");
//app.use('/productos', productosRouter);

//app.get("/",(req,res) =>{
    //res.send("hola The Burguer como estan!!!!");
//});

//const PORT = 3000; // de manera local



