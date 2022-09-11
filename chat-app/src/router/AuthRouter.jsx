import { 
    Route
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AuthLayout from './AuthLayout'; 

const AuthRouter = () => {

    return ( 
        <Route
            path={"/auth"}
            element={<AuthLayout />}
        >
            <Route path={"login"} element={<LoginPage />} />
            <Route path={"register"} element={<RegisterPage />} />
        </Route> 
    ) 
}


export default AuthRouter;