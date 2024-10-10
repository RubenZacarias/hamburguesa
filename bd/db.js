const mysql = require("mysql2");

const connection = mysql.createConnection({
      host: "localhost",
      user:"root",
      password: "",
      database: "hamburguesería"
      
    
});

connection.connect((error) => {
    if(error){
        return console.error(error);

    }
    console.log("Estamos conectados a la base de datos - the burguer");

}); 

// export

module.exports = connection;
