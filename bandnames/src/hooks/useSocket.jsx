import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (serverPath) => {

    const socket = useMemo(() => io.connect(serverPath, {
        transports: ['websocket']
    }), [serverPath])
    const [online, setOnline] = useState(false);

    // Conexión
    useEffect(() => {
        console.log('useeffect 1')
        setOnline(socket.connected)
    }, [socket]);

    // Recupera la conexión
    useEffect(() => {
        console.log('useeffect 2'); 
        socket.on('connect', () => {
            setOnline(true)
        }) 
    }, [socket]);

    

    // Desconextion
    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false)
        })
    }, [socket]);

    return {
        socket,
        online
    }
}