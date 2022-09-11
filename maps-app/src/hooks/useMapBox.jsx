import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl'
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyaW9lYmFyYm96YSIsImEiOiJja3pkOTltejAydHd4MnFwdjV5dTRzaWdxIn0.g3kZZQcZ5YbfCV_fVrw7sg';

export const useMapBox = (initialPoint) => {

    const map = useRef();
    const mapaDiv = useRef();
    const setRef = useCallback((node) => {
        mapaDiv.current = node;
    }, []);
    // Referencia a los marcadores
    const markers = useRef({});

    // Observables de Rxjs
    const moveMarker = useRef( new Subject() ) ;
    const newMarker = useRef( new Subject() );  
    // Mapa y coords
    // const [map, setMap] = useState(null);
    const [coords, setCoords] = useState(initialPoint);

    // Agregar marcadores
    const addMarker = useCallback((ev, id) => {
        const { lng, lat } = ev.lngLat || ev;

        const marker = new mapboxgl.Marker();
        marker.id = id ?? v4(); // Si el id no existe lo genera UUID

        marker
            .setLngLat([lng, lat])
            .addTo(map.current)
            .setDraggable(true);
        markers.current[marker.id] = marker;

        if(!id) {
            newMarker.current.next({
                id: marker.id,
                lng,
                lat
            }); 
        }

        // Escuchar movimientos
        marker.on('drag', ({target}) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();

            // TODO: emitar los cambios del marcador
            moveMarker.current.next({
                id, lng, lat
            });            
        })
    }, []);

    // Función para actualizar ubicación 
    const updatePosition = useCallback( ({id, lng, lat}) => {
        markers.current[id].setLngLat([lng, lat]);
    }, []);

    useEffect(() => {
        const mapa = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [initialPoint.lng, initialPoint.lat],
            zoom: initialPoint.zoom
        });
        map.current = mapa;
        // setMap(mapa);
    }, []);


        // Cuando se mueve el mapa
        useEffect(() => {
            map.current?.on('move', () => {
                // Obtenemos la latitud y longitud
                const { lng, lat } = map.current.getCenter();
                setCoords({
                    lng: lng.toFixed(4),
                    lat: lat.toFixed(4),
                    zoom: map.current.getZoom().toFixed(2)
                });
            });
            // return map?.off('move');
        }, []);

    // Agregar marcadores cuando hago click
    useEffect(() => {
        // map.current?.on('click', (ev) => { addMarker(ev); });
        map.current?.on('click', addMarker );
    }, [addMarker]);

    return {
        addMarker,
        coords,
        markers,
        moveMarker$: moveMarker.current,
        newMarker$: newMarker.current,
        setRef,
        updatePosition
    }
}