import { useContext, useState } from "react";
import { SocketContext } from '../context/SocketContext';
import { ChatContext } from "../context/chat/ChatContext";
import { AuthContext } from "../auth/AuthContext";
const SendMessage = () => {

    const [ message, setMessage ] = useState('')  ;
    const { socket } = useContext( SocketContext );  
    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    const handleChange = e => {
        setMessage(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault(); 
        
        if( message.length === 0) return;

        setMessage('');

        // TODO: Emitir un evento de sockets para enviar el mensaje
        socket.emit('private-message', {
            from: auth.uid,
            to: chatState.activeChat,
            message
        })
        // TODO: hacer el dispatch de el mensaje

    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={message}
                        onChange={ handleChange }
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button
                        className="msg_send_btn mt-3"
                        type="submit"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SendMessage;