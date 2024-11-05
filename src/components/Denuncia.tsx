import { Button } from "primereact/button";
import { decrypt } from "../services/Crypto"
import { DenunciaResponse } from "./Interfaces"
import { Denuncias } from "../services/Api";
import { toastError, toastSucess } from "../services/CustomToast";
export function Denuncia(denunciaProps: DenunciaResponse) {
    async function OnDelete(){
        await Denuncias.delete(denunciaProps.id)
        .then(() => {
            toastSucess('Denuncia deletada com sucesso!')
            window.location.reload()
        })
        .catch((error) => {
            toastError('Erro ao deletar a denuncia')
            console.log(error)
        })
    }
    async function OnDeleteMsg(){
        await Denuncias.bloquear(denunciaProps.id, {bloqueada: true})
        .then(() => {
            toastSucess('Mensagem deletada com sucesso!')
            window.location.reload()
        })
        .catch((error) => {
            toastError('Erro ao deletar a mensagem')
            console.log(error)
        })
    }
    return (
        <>
            <div style={style.container} className="denuncia-container">
                <h2>ID: {denunciaProps.id}</h2>
                <div style={style.header} className="denuncia-header">
                    <h2 style={style.title}>{denunciaProps.descricao}</h2>
                    <h2 style={style.date}>{new Date(denunciaProps.dataDenuncia.toString()).toLocaleString()}</h2>
                    <p><b>Nome do Denunciante:</b> {denunciaProps.usuario.nome}</p>
                    <p><b>Email do Denunciante:</b> {denunciaProps.usuario.email}</p>
                </div>
                <div style={style.body} className="denuncia-body">
                    <h3>{decrypt(denunciaProps.mensagemDenunciada.texto)}</h3>
                </div>
                <div style={style.footer} className="denuncia-footer">
                    <div style={{display: 'flex',alignItems: 'center',flexDirection: 'column',width: '100%'}}>
                        <p> <b>Nome do Criador da mensagem:</b> {denunciaProps.mensagemDenunciada.usuarioCriador.nome}</p>
                        <p> <b>Email do Criador mensagem:</b> {denunciaProps.mensagemDenunciada.usuarioCriador.email}</p>
                        <p> <b>Data da mensagem:</b> {new Date(denunciaProps.mensagemDenunciada.dataCriacao.toString()).toLocaleString()}</p>
                    </div>
                </div>
                <div style={style.footer} className="denuncia-footer">
                    <div style={{display: 'flex',justifyContent: 'center',width: '100%'}}>
                        <Button onClick={OnDelete} style={{...style.likeButton, marginRight: '10px'}}>Excluir Denuncia</Button>
                        <Button onClick={OnDeleteMsg} style={style.deleteButton}>Excluir Mensagem</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
const style = {
    container: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    header: {
        borderBottom: '1px solid #eee',
        paddingBottom: '8px',
        marginBottom: '8px',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
        margin: 0,
    },
    date: {
        fontSize: '0.9rem',
        color: '#666',
    },
    body: {
        fontSize: '1rem',
        color: '#555',
        lineHeight: '1.6',
    },
    footer: {
        borderTop: '1px solid #eee',
        paddingTop: '8px',
        marginTop: '8px',
        fontSize: '0.9rem',
        color: '#888'
    },
    likeButton: {
        backgroundColor: "#1da1f2",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
      },
      deleteButton: {
        backgroundColor: "#e0245e",
        color: "white",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
      },
};