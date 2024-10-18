require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const routes =  require('../routes');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(bodyParser.urlencoded({extended: false}))
    }

    routes(){
        this.app.use('/', routes)
    }

    listen(){
        this.app.listen(this.port, ()=>{ console.log(`Your serve now is being listening in http://localhost:${this.port}`)})
    }
}

module.exports = Server