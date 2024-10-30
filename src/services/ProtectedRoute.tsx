import { useEffect, useState } from "react";
import { Users } from "./Api";
import { Navigate, Outlet } from "react-router-dom";
import { toastError } from "./CustomToast";

function ProtectedRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                await Users.me(); // Verifica o token
                setIsAuthenticated(true); // Token válido
            } catch (error: any) {
                if (error.response && error.response.status === 403) {
                    setIsAuthenticated(false); // Token inválido
                } else {
                    console.error(error);
                    setIsAuthenticated(false);
                }
            }
        };

        checkToken();
    }, []);
    if (isAuthenticated === null) {
        // Enquanto a verificação do token está em andamento, você pode retornar um carregando
        return <div>Loading...</div>;
    }
    return isAuthenticated ? <Outlet /> :
        (
            toastError('Sua sessão expirou! Por favor logue novamente'),
            <Navigate to="/" />
        );
}
export default ProtectedRoutes