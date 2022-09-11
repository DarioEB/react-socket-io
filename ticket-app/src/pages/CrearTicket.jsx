import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useHiddenMenu } from "../hooks/useHiddenMenu";

const { Title, Text } = Typography;

const CrearTicket = () => {

    useHiddenMenu(true);

    const { socket } = useContext( SocketContext );

    const [ticket, setTicket] = useState(null);
    
    const newTicket = () => {
        socket.emit('request-ticket', null, (ticket) => {
            // console.log(ticket);
            setTicket(ticket);
        });
    }

    return (
        <>
            <Row>
                <Col
                    span={24}
                    offset={0}
                    align="center"
                >
                    <Title
                        level={3}
                    >
                        Presione el botón para obtener un ticket
                    </Title>
                    <Button
                        type="primary"
                        shape="round"
                        icon={ <DownloadOutlined /> }
                        size="large"
                        onClick={() => newTicket()}
                    >
                        Nuevo Ticket
                    </Button>
                </Col>
            </Row>

            {
                ticket &&
                <Row
                    style={{ marginTop: 100 }}
                >
                    <Col
                        span={24}
                        offset={0}
                        align="center"
                    >
                        <Text
                            level={2}
                        >
                            Su número
                        </Text>
                        <br />
                        <Text
                            type="success"
                            style={{fontSize: 55}}
                        >
                            {ticket.number}
                        </Text>
                    </Col>
                </Row>
            }
        </>
    );
}

export default CrearTicket;