import { SocketProvider } from "./context/SocketContext";
import { UIProvider } from "./context/UIContext";
import RouterPage from "./pages/RouterPage";

const TicketApp = () => {

    return (
        <UIProvider>
            <SocketProvider>    
                <RouterPage />
            </SocketProvider>
        </UIProvider>
    );
}

export default TicketApp;