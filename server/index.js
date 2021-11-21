const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users:'/api/users'
        };

        //DB
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
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
        this.app.use(this.paths.users, require('../routes/users'));
    }

    init() {
        this.app.listen(this.port, () => console.log(`Running on ${this.port}`))
    }
}

module.exports = Server;
