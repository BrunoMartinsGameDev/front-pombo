import { Button } from "primereact/button";
import PostTweet from "../components/PostTweet";
import TweetList from "../components/TweetList";
import { useNavigate } from "react-router-dom";
import { Auth, Mensagems } from "../services/Api";
import { useEffect, useState } from "react";
import { MensagemResponse } from "../components/Interfaces";
import { toastError, toastInfo } from "../services/CustomToast";
import { InputText } from "primereact/inputtext";
import { useAuth } from "../services/AuthProvider";


function HomePage() {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [tweets, setTweets] = useState<MensagemResponse[]>([]);
    const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
    const [error, setError] = useState(null); // Estado para armazenar erros

    // Função para buscar tweets da API
    const fetchTweets = async () => {
        await Mensagems.list({ page: null, size: null }).then((response) => {
            setTweets(response.data.content);
            setLoading(false);
        }).catch((error) => {
            setError(error);
        })
    };

    // Hook useEffect para carregar os tweets quando o componente montar
    useEffect(() => {
        fetchTweets();
    }, []);
    // Função para deletar um tweet
    const handleDeleteTweet = (id: any) => {
        const userId = Auth.user().id
        Mensagems.delete(id, { usuarioId: userId })
            .then(() => {
                setTweets(tweets.filter(tweet => tweet.id !== id));
                toastInfo('Tweet deletado')
            })
            .catch((error) => {
                console.log(error);
                toastError('Erro ao deletar')
            })
    };

    const handleLikeTweet = async (id: any): Promise<any> => {
        setTweets(tweets.map(tweet =>
            tweet.id === id ? { ...tweet, likes: tweet.quantidadeLikes + 1 } : tweet
        ));
        const userId = Auth.user().id
        return await Mensagems.curtir(id, { usuarioId: userId })
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                console.log(error);
                toastError('Erro ao curtir')
                return { Message: 'Erro ao curtir' }
            })
    };
    return (
        <>
            {user.role === 'ADMIN' && (<Button label="Denuncias" icon="pi pi-twitter" onClick={() => navigate('/bloqueados')} />)}
            <PostTweet onNewTweet={fetchTweets} />
            <div className="tweet-list">
                <div style={{ width: '50%', marginBottom: '1rem' }} className="p-inputgroup flex-1">
                    <InputText placeholder="Keyword" />
                    <Button icon="pi pi-search" className="p-button-warning" />
                </div>
                <TweetList
                    tweets={tweets}
                    loading={loading}
                    error={error}
                    handleDeleteTweet={handleDeleteTweet}
                    handleLikeTweet={handleLikeTweet} />
            </div>
        </>
    );
}

export default HomePage;
