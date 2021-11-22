const cors = require('cors');
const express = require('express');
const { createServer } = require('http');
const mongoose = require('mongoose');
const { socketController } = require('./../sockets/controller');

class Server {

    constructor(){
        //Creación del servidor de express con socket.io
        this.app = express();
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server)
        
        //Variables de clase
        this.port = process.env.PORT;
        this.paths = {
            auth:'/api/auth',
            users:'/api/users'
        };

        this.connectDB();

        this.middlewares();

        this.routes();

        this.sockets();
    }

    async connectDB(){
        try{
            await mongoose.connect(process.env.MONGODB_CNN);
            console.log('DB conectada');
        } catch(err){
            console.log(err);
            throw new Error('Error en la conexión a la DB');
        }
    }

    middlewares() {
        this.app.use(cors());

        //Lectura y Parsing de body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    init() {
        this.server.listen(this.port, () => console.log(`Corriendo en ${this.port}`));
    }
}

module.exports = Server;
