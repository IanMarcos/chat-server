const cors = require('cors');
const express = require('express');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            users:'./api/users'
        };

        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }

    middlewares() {
        this.app.use(cors());

        //Lectura y Parsing de body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use(this.paths.users, require('./../routes/users'));
    }

    init() {
        this.app.listen(this.port, () => {console.log(`Running on ${this.port}`);})
    }
}

module.exports = Server;
