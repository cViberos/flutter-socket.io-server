const { v4: uuidV4 } = require('uuid');
// Esto va a crear un id segmentado y único
// npm i uuid

class Band {

  // 'no-name' es un valor cargado por defecto en caso de no tener valor en name
  constructor(name = 'no-name') {
    
    this.id = uuidV4(); //Identificador único
    this.name = name;
    this.votes = 0;
  }

}

module.exports = Band;