import { useContext } from "react";
import { AuthContext } from '../auth/AuthContext';

const SearchBox = () => {

    const { auth, logout} = useContext(AuthContext);

    return (
        <div className="headind_srch">

            <div className="recent_heading mt-2">
                <h4>{auth.name}</h4>
            </div>

            <div className="srch_bar">
                <div className="stylish-input-group">
                    <button 
                        type="button"
                        className="btn text-danger border-2 border-danger"
                        onClick={() => logout()}    
                    >
                        Salir
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SearchBox;