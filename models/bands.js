const Band = require("./band");


class Bands {
  
  constructor(){
    this.bands = [];
  }

// AQUI PODEMOS HACER EN CUENTA DE ESTAS FUCIONES TODO LO QUE HACE NUESTRA BASE DE DATOS

  // AGREGAR UNA BANDA
  addBand( band = new Band() ) {
    this.bands.push( band );
  }

  // OBTENER EL LISTADO DE LAS BANDAS
  getBands() {
    return this.bands;
  }

  // BORRAR UNA BANDA
  deleteBand( id = '' ) {
    // Condicion: necesito regresar todas las bandas donde el id no es igual al id que recibo del cliente
    this.bands = this.bands.filter( band => band.id !== id );
    return this.bands;
  }

  // VOTAR UNA BANDA
  voteBand( id = '') {

    this.bands = this.bands.map( band => {
      // Si la banda id es igual al id que envio el cliente
      if ( band.id == id ) {
          band.votes++;
          return band;
      } else {
          return band;
      }

    });
  }

}

module.exports = Bands;