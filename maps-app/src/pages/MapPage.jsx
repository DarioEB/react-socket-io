
import { useContext, useEffect } from 'react';
import { useMapBox } from '../hooks/useMapBox'; 
import {SocketContext} from '../context/SocketContext';
const initialPoint = {
    lng: -55.10,
    lat: -27.48,
    zoom: 13
}

const MapPage = () => {

    const { 
        coords, 
        setRef, 
        moveMarker$, 
        newMarker$ ,
        addMarker,
        updatePosition
    } = useMapBox(initialPoint);
    
    const { socket } = useContext(SocketContext);

    // Esuchar los marcadores existentes
    useEffect( () => {
        socket.on('active-markers', (markers) => {
            for( const key of Object.keys( markers) ) {
                addMarker( markers[key], key)
            }
            // addMarker(markers)
        })
    }, [socket, addMarker]);

    useEffect( () => {
        newMarker$.subscribe( marker => {
            socket.emit('new-marker', marker);
        })
    }, [newMarker$, socket]);

    // TODO: useEffect
    useEffect( () => {
        moveMarker$.subscribe( marker => {
            socket.emit('update-marker', marker);
        })
    }, [socket, moveMarker$]);

    // Escuchar nuevos marcadores
    useEffect( () => {
        socket.on('new-marker', ( marker) => {
            addMarker( marker, marker.id )
        });
    }, [socket, addMarker]);

    // Mover marcador mediante sockets
    useEffect( () => {
        socket.on('update-marker', (marker) => {
            updatePosition( marker );
        });
    }, [socket, updatePosition]);

    return (
        <>
            <div className="info">
                Lng: { coords.lng } | lat: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div
                ref={ setRef }
                className="mapContainer"
            />
        </>
    )
}

export default MapPage;