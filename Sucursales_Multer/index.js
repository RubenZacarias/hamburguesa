const express = require("express");
const app = express();

app.use(express.json());

const sucursalesRouter = require("./routers/sucursales.router");
app.use('/sucursales', sucursalesRouter);

app.get("/", (req, res) => {
    res.send("Estas son las sucursales de THE BURGUER!!");
});

const PORT =  3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


//const productosRouter = require("./routers/productos.router");
//app.use('/productos', productosRouter);

//app.get("/",(req,res) =>{
    //res.send("hola The Burguer como estan!!!!");
//});

//const PORT = 3000; // de manera local



