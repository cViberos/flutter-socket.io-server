const express = require('express');
const path = require('path');
require('dotenv').config();

// APP DE EXPRESS
const app = express();


// SERVIDOR DE SOCKETS
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');



// Path público
const publicPath = path.resolve(__dirname, 'public');

// Usamos la carpeta publica
app.use(express.static(publicPath));

// Corremos el servidor
server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log('Servidor corriendo en puerto!!!', process.env.PORT);
})