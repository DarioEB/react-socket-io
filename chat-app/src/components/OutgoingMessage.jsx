import { formatedDate } from "../helpers/formatDate";


const OutgoingMessage = ({message}) => {

    return (
        <div className="outgoing_msg">
            <div className="sent_msg">
                <p>
                    {message.message}
                </p>
                <span className="time_date">{formatedDate(message.createAt)}</span>
            </div>
        </div>
    )
}

export default OutgoingMessage;