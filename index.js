const express = require("express");
const app = express();

app.use(express.json());

const productosRouter = require("./routers/productos.router");
app.use('/productos', productosRouter);

app.get("/",(req,res) =>{
    res.send("hola The Burguer como estan");
});

//const PORT = 3000; // de manera local

const PORT =  3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

