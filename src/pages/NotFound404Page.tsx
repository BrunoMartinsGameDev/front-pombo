import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

function NotFound404Page() {
    const navigate = useNavigate()

    function retornarPara(pagina: string) {
        navigate(pagina)
    }
    return (
        <>
            <h1>Página não encontrada</h1>
            <br />
            <Button onClick={() => retornarPara("/")} label="Retornar para a página de Login" />
            <br />
            <br />
            <Button onClick={() => retornarPara("/home")} label="Retornar para a página Inicial" />
        </>
    )
}
export default NotFound404Page