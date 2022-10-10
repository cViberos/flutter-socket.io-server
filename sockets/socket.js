const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

// Colleccion  de Bandas
const bands = new Bands();
 
bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Héroes del silencio' ) );
bands.addBand( new Band( 'Metallica' ) );




// MENSAJE DE SOCKETS
  // client: es el dispositivo que se conecta a nuestro socket server
  io.on('connection', client => {

    // Cuando el client se conecta
    console.log('Cliente conectado');

    // Envia al cliente que se conecta las bandas activas
    client.emit('active-bands', bands.getBands());
  
    // Cuando el client se desconecta del servidor
    client.on('disconnect', () => { console.log('Cliente desconectado')});
  
    // Cuando el client envia(emit) un mensaje al servidor
    client.on('mensaje', (payload)=> {
      
      // Contenido del mensaje recibido del dispositivo
      console.log('Mensaje!!!',payload);
  
      // Va a emitir un mensaje a todos los clientes conectados
      io.emit('mensaje', { admin: 'nuevo mensaje'});
  
    });

    client.on('emitir-mensaje', (payload) => {
      // Voy a ver desde el servidor el payload
      // console.log(payload);

      // Emite el mensaje a todos los clientes conectados
      // io.emit('nuevo-mensaje',payload);

      // Emite el mensaje a todos los clientes pero no al cliente que envio el mensaje
      client.broadcast.emit('nuevo-mensaje',payload);
    });

    // Cuando el client vota a una banda
    client.on('vote-band', (band) => {
      // console.log(payload);
      bands.voteBand( band['id'] );
      // Emitimos a todos los clientes la información actualizada
      io.emit('active-bands', bands.getBands());
    });

    // Cuando un client agrega una banda
    client.on('add-band', (band) => {
      const newBand = new Band(band.name);
      bands.addBand( newBand );
      io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band',(band)=> {
      bands.deleteBand( band['id'] );
      io.emit('active-bands', bands.getBands());
    });

  });

  