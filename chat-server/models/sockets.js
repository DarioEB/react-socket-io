const { connectedUser, disconnectUser, getUsers, recordMessage } = require("../controllers/sockets");
const { checkJWT } = require("../helpers/jwt");

class Sockets {

    constructor( io ) { 
        this.io = io; 
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => { 
            // Información enviada por query en la conexion
            const [valido, uid] = checkJWT( socket.handshake.query['x-token']);
            
            if(!valido) {
                // console.log('Socket no identificado');
                return socket.disconnect();
            }

            await connectedUser( uid );

            // Unir al usuario a una sala de socket.io
            socket.join(uid);

            // TODO: Validat el JWT - 

            // TODO: Que usuario está activo

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('user-list', await getUsers() )
            // TODO: Socket JOIN, uid

            // TODO: Escuchar cuando el client manda un mensaje
            socket.on( 'private-message', async (payload) => {
                const message = await recordMessage(payload);
                this.io.to( payload.to ).emit('private-message', message);
                this.io.to( payload.from ).emit('private-message', message)
            })

            // TODO: Disconnect - usuario (desconectado)
            socket.on('disconnect', async () => {
                // console.log('Cliente desconectado')
                await disconnectUser(uid);
                this.io.emit('user-list', await getUsers() );
            })

            // TODO: Emitir todos los usuarios conectados
        });
    }
    
}

module.exports = Sockets;