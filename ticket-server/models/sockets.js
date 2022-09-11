const TicketList = require('./ticket-list');
class Sockets {

    constructor( io ) {

        this.io = io;
        // Crear la instancia del ticket list
        this.ticketList = new TicketList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('cliente conectado');
            
            socket.on('request-ticket', (data, callback) => {
                console.log('solicitando nuevo ticket');
                const newTicket = this.ticketList.createTicket()
                callback( newTicket );
            });

            socket.on('next-work-ticket', ({agent, desktop}, callback) => {
                console.log('asignando ticket')
                const ticket = this.ticketList.assignTicket(agent, desktop);
                callback(ticket);
                // Disparamos un evento al front-end
                console.log(this.ticketList.last13);
                this.io.emit( 'assign-ticket', this.ticketList.last13 );
            })

        });
    }


}


module.exports = Sockets;