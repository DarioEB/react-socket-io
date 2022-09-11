import { useContext, useState } from "react"; 
import { SocketContext } from "../context/SocketContext";


const BandAdd = () => {

    const [name, setName] = useState(''); 
    const SOCKET = useContext(SocketContext);

    const { socket } = SOCKET;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name.trim().length > 0) { 

            socket.emit('band-add', { name });
            setName("")
        }

    }

    return (
        <>
            <h3>Agregar Banda</h3>
            <form
                onSubmit={ handleSubmit }
            >
                <input 
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={name}
                    onChange={ (e) => setName(e.target.value)}
                />
            </form>
        </>
    )
}

export default BandAdd
