const uuid = require('uuid');

class Ticket {

    constructor (number) {
        this.id         = uuid.v4();
        this.number     = number;
        this.desktop = null;
        this.agent     = null;
    } 
}

module.exports = Ticket;