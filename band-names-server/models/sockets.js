const BandList = require('./band-list');


class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            // Emitir al cliente conectado, todas la bandas actuales
            socket.emit('current-bands', this.bandList.getBands() ) 

            // Evento de votación
            socket.on('band-voted', (id) => {
                this.bandList.increaseVotes(id);
                // this.io emite el evento a todos los clientes conectados
                this.io.emit('current-bands', this.bandList.getBands() ) 
            });

            socket.on('remove-band',( id )=> {
                this.bandList.removeBand(id);
                this.io.emit('current-bands', this.bandList.getBands() )
            });

            socket.on('change-name', (data) => {
                this.bandList.changeBandName(data.id, data.name);
                this.io.emit('current-bands', this.bandList.getBands() )
            })

            socket.on('band-add', ({name}) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands())
            })

        });
    }


}


module.exports = Sockets;