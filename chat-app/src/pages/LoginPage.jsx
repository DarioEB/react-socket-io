import { 
    useContext, 
    useEffect, 
    useState 
} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

export default function LoginPage() {

    const {
        login
    } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberme: false
    });

    useEffect( () => {
        const rememberData = JSON.parse(localStorage.getItem('data-chat'));
        if(rememberData) {
            setForm(rememberData)
        }
    }, [])

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const toggleCheck = (e) => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        })
    } 

    const handleSubmit = async e => {
        e.preventDefault(); 
        (form.rememberme)  
            ? localStorage.setItem('data-chat', JSON.stringify(form))
            : localStorage.removeItem('data-chat')

        const { email, password } = form;

        const ok = await login(email, password);
        // console.log(ok);
        if(!ok) {
            Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
        } 
    }

    const todoOK = () => {
        return ( form.email.length > 0 && form.password.length > 0 ) ? true : false
    }

    return (
        <form 
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={ handleSubmit }
        >
            <span 
                className="login100-form-title mb-3"
            >
                Chat - Ingreso
            </span>

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
                <div 
                    className="col"
                    onClick={ e => toggleCheck(e) }
                >
                    <input 
                        className="input-checkbox100" 
                        id="ckb1" 
                        type="checkbox" 
                        name="rememberme" 
                        checked={form.rememberme}
                        readOnly
                    />
                    <label 
                        className="label-checkbox100"
                    >
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link 
                        to={"/auth/register"}
                        className="txt1"
                    >
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button 
                    type="submit"
                    className="login100-form-btn"
                    disabled={ !todoOK() }
                >
                    Ingresar
                </button>
            </div>

        </form>
    )
}