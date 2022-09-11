import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { getUserStorage } from "../helpers";
import { useHiddenMenu } from "../hooks/useHiddenMenu";

const { Title, Text } = Typography;

const Escritorio = () => {

    const navigate = useNavigate();

    useHiddenMenu(false);
    const { socket } = useContext(SocketContext);
    const [ticket, setTicket] = useState(null);
    const [user] = useState(getUserStorage());

    const exit = () => {
        localStorage.removeItem('agent');
        localStorage.removeItem('desktop');
        navigate(`/ingresar`);
    }

    const nextTicket = () => { 
        socket.emit( 'next-work-ticket', user, (t) => {
            setTicket(t);
        });
    } 

    if(!user.agent || !user.desktop) {
        return  navigate(`/ingresar`)
    }

    return (
        <>
            <Row>
                <Col span={ 20 }>
                    <Title level={2}>{user.agent}</Title>
                    <Text>Usted está trabajando en el escritorio</Text>
                    <Text type="success"> {user.desktop}</Text>
                </Col>
                <Col 
                    span={4}
                    align="right"    
                >
                    <Button
                        shape="round"
                        type="danger"
                        onClick={ () => exit() }
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>
            </Row>
            <Divider />

            {
                ticket && (
                    <Row>
                        <Col>
                            <Text>Está atendiendo el ticket número: </Text>
                            <Text 
                                style={{ fontSize: 30 }}
                                type="danger"    
                            >{ticket.number}</Text>
                        </Col>
                    </Row>
                )
            }

            <Row>
                <Col 
                    offset={18}
                    span={6}
                    align="right"
                >
                    <Button
                        onClick={() => nextTicket()}
                        shape="round"
                        type="primary"
                    >
                        <RightOutlined />
                        Siguiente 
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default Escritorio;