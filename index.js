require('dotenv').config()

const Server = require('./Server');

const app = new Server();

app.init();
