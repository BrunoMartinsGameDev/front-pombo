import { useEffect } from "react"
import { useAuth } from "../services/AuthProvider"
import { useNavigate } from "react-router-dom"
import { toastError } from "../services/CustomToast"

function DenunciaPage(){
    const navigate = useNavigate()
    const user = useAuth().user
    useEffect(() => {
        if(!checkRole()) navigate("/") //retornar para a tela de login
        
    }, [])
    function checkRole(): boolean{
        if(user.role == "ADMIN" ) return true
        toastError("Você não tem permissão para acessar essa página")
        return false
    }
    return (
        <>
        <h1>Denuncias</h1>

        </>
    )
}

export default DenunciaPage