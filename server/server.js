const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const app = express();

let server = http.createServer(app);

// Path 
const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;


// Settings 
app.use(express.static(publicPath));

// IO = esta es la comunicaciòn del backend
module.exports.io = socketIO(server);
// Conexìon con el cliente
require('./sockets/socket');


// server
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});