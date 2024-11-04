import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
interface TweetProps {
  id: string;
  username: string;
  texto: string;
  createdAt: string;
  initialLikes: number;
  usuariosQueCurtiram: any[];
  onDelete: (id: string) => void;
  onLike: (id: string) => Promise<any>;
  onDenuncia: (id: string, denunciaText: string) => void;
}
const Tweet = (props: TweetProps) => {
  // Estado para armazenar os likes e o ID do tweet
  const [likes, setLikes] = useState(props.initialLikes);
  const [visible, setVisible] = useState(false);
  const [denunciaText, setDenunciaText] = useState('');
  const tweetId = props.id; // Guardando o ID do tweet em uma variável

  // Função para lidar com o "like"
  const handleLike = async () => {
    const msg = await props.onLike(tweetId); // Chamando a função onLike passada como prop com o ID
    if (msg == '"Message": "Mensagem curtida com sucesso."')
      setLikes((prevLikes) => prevLikes + 1);
    else
      setLikes((prevLikes) => prevLikes - 1);
  };

  // Função para deletar o tweet
  const handleDelete = () => {
    props.onDelete(tweetId); // Chamando a função onDelete passada como prop com o ID
  };

  const handleDenuncia = () => {
    props.onDenuncia(tweetId, denunciaText); // Chamando a função onDenuncia passada como prop com o ID
  };

  return (
    <div className="tweet-container" style={styles.tweetContainer}>
      <div className="tweet-header">
        <h3>{props.username}</h3> {/* Exibe o nome de quem postou */}
        <span style={styles.date}>{new Date(props.createdAt).toLocaleString()}</span>
      </div>
      <div className="tweet-body">
        <p>{props.texto}</p> {/* Exemplo de conteúdo do tweet */}
      </div>
      <div className="tweet-footer" style={styles.footer}>
        <button onClick={handleLike} style={styles.likeButton}>Like ({likes})</button>

        <Button label="Denunciar" style={styles.deleteButton} icon="pi pi-exclamation-triangle" onClick={() => setVisible(true)} />
        <Dialog header="Denuncia" visible={visible} style={{ display: 'flex', justifyContent: 'center' }} onHide={() => { if (!visible) return; setVisible(false); }}>
          <InputTextarea style={{ marginTop: '10px' }} placeholder="Escreva a sua denuncia" autoResize value={denunciaText} onChange={(e) => setDenunciaText(e.target.value)} rows={5} cols={30} />
          <br />
          <button onClick={handleDenuncia} style={styles.deleteButton}>Denunciar</button>
          <span style={{marginLeft: '68px'}}></span>
          <button onClick={() => setVisible(false)} style={styles.likeButton}>Cancelar</button>
        </Dialog>
        <button onClick={handleDelete} style={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

// Estilos básicos para o componente
const styles = {
  tweetContainer: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    width: "300px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
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
  date: {
    fontSize: "12px",
    color: "#555",
  },
};

export default Tweet;
