import { useEffect, useState } from "react"
import { useAuth } from "../services/AuthProvider"
import { useNavigate } from "react-router-dom"
import { toastError } from "../services/CustomToast"
import { Denuncias } from "../services/Api"
import { DenunciaResponse } from "../components/Interfaces"
import { decrypt } from "../services/Crypto"

function DenunciaPage(){
    const navigate = useNavigate()
    const user = useAuth().user
    const [denuncia, setDenuncia] = useState<DenunciaResponse[]>([])
    useEffect(() => {
        if(!checkRole()) navigate("/") //retornar para a tela de login
        fecthDenuncia()
    }, [])
    async function fecthDenuncia(){
        await Denuncias.list({page: null, size: null, usuarioId: null,mensagemId: null})
        .then((response) => {
            console.log(response.data.content)
            setDenuncia(response.data.content)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    function checkRole(): boolean{
        if(user.role == "ADMIN" ) return true
        toastError("Você não tem permissão para acessar essa página")
        return false
    }
    return (
        <>
        <h1>Denuncias</h1>
        {denuncia.length > 0 ? (
            denuncia.map(denuncia => (
                <div key={denuncia.id}>
                    <p>{denuncia.descricao}</p>
                    <p>{denuncia.usuario.email}</p>
                    <p>{new Date(denuncia.dataDenuncia.toString()).toLocaleString()}</p>
                    <p>{decrypt(denuncia.mensagemDenunciada.texto)}</p>
                    <p>{denuncia.mensagemDenunciada.usuarioCriador.email}</p>
                </div>
            ))
        ) : (
            <p>Nenhuma denuncia encontrada</p>
        )}
        </>
    )
}

export default DenunciaPage