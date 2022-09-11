// Backend basado en clases
// Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Sockets = require('./sockets');
// Path para moverse entre directorios
const path = require('path');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, { /* configuraciones */ } );
        // configuraciones de sockets
    }

    // Middlewares
    middlewares() {
        this.app.use( express.static(path.resolve( __dirname, '../public')));
    }

    
    socketsConfig () {
        new Sockets( this.io );
    }

    // Metodo para inicializar el servidor
    execute() {
        // inicializar middlewares
        this.middlewares()

        // inicializar sockets
        this.socketsConfig()

        // inicializar server
        this.server.listen( this.port , () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;