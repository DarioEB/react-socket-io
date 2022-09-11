import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useHiddenMenu } from "../hooks/useHiddenMenu";

const { Title, Text } = Typography; 

const Cola = () => {

    useHiddenMenu(true);

    const { socket } = useContext(SocketContext);
    const [tickets, setTickets] = useState([]);

    useEffect( () => { 
        socket.on('assign-ticket', (assigns) => { 
            setTickets(assigns)
        });

        return () => {
            socket.off('assign-ticket');
        }
    }, [socket]);

    useEffect( () => {
        getLasts().then( ts => {
            setTickets(ts);
        });
    }, []);
    
    return (
        <>
            <Title
                level={1}
            >Atención al cliente</Title>
            <Row>
                <Col
                    span={12}
                >
                    <List 
                        dataSource={tickets.slice(0, 3)}
                        renderItem={ item => (
                            <List.Item>
                                <Card
                                    style={{ width: 300, marginTop: 16}}
                                    actions={[
                                        <Tag color="volcano">{item.agent}</Tag>,
                                        <Tag color="magenta">Escritorio: {item.desktop}</Tag>,
                                        // <Tag color="volcano">{item.agent}</Tag>
                                    ]}
                                >
                                    <Title>N°. {item.number}</Title>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col
                    span={12}
                >
                    <Divider>Historial</Divider>
                    <List 
                        dataSource={ tickets.slice(3)}
                        renderItem={ (item) => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={`Ticket N°. ${item.number}`}
                                    description={
                                        <>
                                            <Text
                                                type="secondary"
                                            >En el escritorio:</Text>
                                            <Tag
                                                style={{ marginLeft: 5}}
                                                color="magenta"
                                            >{item.number}</Tag>
                                            <Text
                                                type="secondary"
                                            >Agente:</Text>
                                            <Tag 
                                                style={{ marginLeft: 5}}
                                                color="volcano"
                                            >{item.agent}</Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </>
    )
}

export default Cola;