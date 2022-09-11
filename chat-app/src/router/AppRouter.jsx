import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import { useContext, useEffect } from 'react';

import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

import AuthLayout from './AuthLayout';

const AppRouter = () => {

    const {
        auth,
        verifyToken
    } = useContext(AuthContext);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]); 

    if (auth.checking) {
        return <h1>Espere por favor</h1>
    }

    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path={"/auth"}
                        element={<AuthLayout />}
                    >
                        {
                            auth.logged 
                            ? <Route path={"*"} element={<Navigate to={"/"} /> } />
                            : <>
                                <Route path={"login"} element={<LoginPage />} />
                                <Route path={"register"} element={<RegisterPage />} />
                            </>
                        }
                    </Route>
                    <Route
                        path={"/"}
                    >
                        {
                            auth.logged 
                            ? <Route index element={<ChatPage />} />
                            : <Route index element={<Navigate to={"/auth/login"} />} />
                        }
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default AppRouter;