import MapPage from "./pages/MapPage";
import {SocketProvider} from './context/SocketContext';

export default function MapsApp() {
    return(
        <SocketProvider>
            <MapPage /> 
        </SocketProvider>
    )
}