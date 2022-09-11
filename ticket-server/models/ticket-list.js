const Ticket = require('./ticket');

class TicketList {

    constructor() {
        this.last_number = 0;
        this.pendings = [];
        this.assigns = [];
    }

    // Obtener el último número y asignar
    get nextNumber() {
        this.last_number++;
        return this.last_number;
    }

    // Ultimos 13 tickets
    // 3 que se verán en las tarjetas y 10 en le historial
    get last13() {
        return this.assigns.slice(0, 13);
    }

    // crear nuevo tiicket
    createTicket() {
        const newTicket = new Ticket(this.nextNumber);
        console.log(newTicket);
        this.pendings.push(newTicket);

        return newTicket;
    }

    // Asignar nuevo ticket
    assignTicket(agent, desktop) {
        if(this.pendings.length === 0) {
            return null;
        }

        const nextTicket = this.pendings.shift();
        nextTicket.agent = agent;
        nextTicket.desktop = desktop;

        this.assigns.unshift(nextTicket);

        return nextTicket;
    }

}

module.exports = TicketList;