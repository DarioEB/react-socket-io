import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd'; 
import {
    SaveOutlined
} from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHiddenMenu } from '../hooks/useHiddenMenu';
import { getUserStorage } from '../helpers';

const { Title, Text } = Typography;

const Ingresar = () => {

    useHiddenMenu(false);

    const navigate = useNavigate(); 
    const [user] = useState(getUserStorage);

    useEffect( () => {
        if(user.agent && user.desktop) {
            navigate(`/escritorio`);
        }
    }, [user]);

    const onFinish = (values) => {
        console.log('Success:', values);

        localStorage.setItem('agent', values.agent);
        localStorage.setItem('desktop', values.desktop);
    
        navigate(`/escritorio`)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }; 

    return (
        <>
            <Title
                level={2}
            >Ingresar</Title>
            <Text>Ingrese su nombre y número de escritorio</Text>
            <Divider />
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre del agente"
                    name="agent"
                    rules={[
                        {
                            required: true,
                            message: '¡Por favor ingrese su nombre!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="N° de escritorio"
                    name="desktop"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese el número de escritorio',
                        },
                    ]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item> 
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        shape="round"
                    >
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Ingresar;