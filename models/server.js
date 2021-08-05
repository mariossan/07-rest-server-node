const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            users:          "/api/usuarios",
            auth:           "/api/auth",
            categories:     "/api/categorias",
        }

        // connectar a base de datos
        this.conectarDB();
        // middlewares
        this.middlewares();
        // rutas de la aplicacion
        this.routes();
    }

    /**
     * 
     */
    async conectarDB() {
        await dbConnection();
    }

    /**
     * 
     */
    middlewares(){
        // cors
        this.app.use( cors() )
        // parseo y lectura de body (busca serializar los objetos de javascript)
        this.app.use( express.json() )
        // se llama al middleware de staticos
        this.app.use( express.static("public") )
    }

    /**
     * 
     */
    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.users, require('../routes/user') );
        this.app.use( this.paths.categories, require('../routes/categories.route') );
    }

    /**
     * 
     */
    listen() {
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto", this.port) 
       })
    }
}


module.exports = Server