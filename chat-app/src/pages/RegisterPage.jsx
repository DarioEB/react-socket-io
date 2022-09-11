import { useContext, useState } from 'react';
import {
    Link  
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

export default function RegisterPage() {

    const {
        register
    } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        
    }); 

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();  

        const { name, email, password } = form;

        const {ok, message} = await register(name, email, password);
        // console.log(ok);
        if(!ok) {
            Swal.fire('Error', message, 'error');
        } 
    }

    const todoOK = () => {
        return ( 
            form.email.length > 0 && 
            form.password.length > 0 &&
            form.name.length > 0 
        ) ? true : false
    }

    return (
        <form 
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={handleSubmit}
        >
            <span 
                className="login100-form-title mb-3"
            >
                Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="text" 
                    name="name" 
                    placeholder="Nombre" 
                    onChange={handleChange}
                    value={form.name}
                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange}
                    value={form.email}
                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input 
                    className="input100" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                    value={form.password}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col text-right">
                    <Link 
                        to={"/auth/login"} 
                        className="txt1"
                    >
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button 
                    type="submit"
                    className="login100-form-btn"
                    disabled={ !todoOK() }
                >
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}