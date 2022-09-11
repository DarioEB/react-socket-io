import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/SocketContext";


const BandList = () => {

    const [bands, setBands] = useState([]);
    const SOCKET = useContext(SocketContext);
    const { socket } = SOCKET;

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            console.log(bands);
            setBands(bands);
        });

        // Destruimos la escucha del evento uan vez escuchado
        return () => socket.off('current-bands');
    }, [socket]);

    const handleChange = (e, id) => {
        const newName = e.target.value;
        setBands(bands.map( band => band.id === id ? { ...band, name: newName } : band))
    }

    const handleBlur = (id, name) => {
        socket.emit('change-name', {id, name});
    }

    const voted = id => {
        socket.emit('band-voted', id);
    }

    const removeBand = id => {
        socket.emit('remove-band', id);
    }

    const crearRows = () => {
        return (
            bands.map(band => (
                <tr
                    key={band.id}
                >
                    <td>
                        <button
                            onClick={() => voted(band.id)}
                            className="btn btn-primary"
                        >+1</button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={band.name}
                            onChange={(e) => handleChange(e, band.id)}
                            onBlur={(e) => handleBlur(band.id, e.target.value)}
                        />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => removeBand(band.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            ))
        )
    }


    return (
        <>
            <h3>Bandas Actuales</h3>
            
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>

                {
                    bands.length > 0 ?
                    <tbody>
                        {crearRows()}
                    </tbody> : null
                }
            </table>
        </>
    )
}

export default BandList
