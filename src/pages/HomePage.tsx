import { Button } from "primereact/button";
import PostTweet from "../components/PostTweet";
import TweetList from "../components/TweetList";
import { useNavigate } from "react-router-dom";
import { Auth, Denuncias, Mensagems } from "../services/Api";
import { useEffect, useState } from "react";
import { MensagemResponse } from "../components/Interfaces";
import { toastError, toastInfo, toastWarning } from "../services/CustomToast";
import { useAuth } from "../services/AuthProvider";
import { Calendar } from 'primereact/calendar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { dataFormat } from "../utils/dataFormat";


function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [tweets, setTweets] = useState<MensagemResponse[]>([]);
    const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
    const [error, setError] = useState<string | null>(null); // Estado para armazenar erros

    const [dataInicial, setDatainicial] = useState<Date | null | undefined>(null);
    const [dataFinal, setDataFinal] = useState<Date | null | undefined>(null);
    const [search, setSearch] = useState('');

    // Função para buscar tweets da API
    const fetchTweets = async () => {
        setLoading(true);
        //Nao ta atualizando quando posta msg e esta trazendo todos os tweets, nao sei pq
        await Mensagems.filter({ search: search, dataInicial: dataFormat(dataInicial), dataFinal: dataFormat(dataFinal), page: null, size: null }).then((response) => {
            console.log(response.data.content);
            setTweets(response.data.content);
            setError(null);
        }).catch((error) => {
            const errorMessage = error.response?.data?.Message || 'Erro ao buscar tweets';
            setError(errorMessage);
        }).finally(() => {
            setLoading(false);
        })
    };

    // Hook useEffect para carregar os tweets quando o componente montar
    useEffect(() => {
        fetchTweets();
    }, []);
    useEffect(() => {
        fetchTweets();
    }, [dataInicial, dataFinal, search]);
    // Função para deletar um tweet
    const handleDeleteTweet = (id: any) => {
        const userId = Auth.user().id
        Mensagems.delete(id, { usuarioId: userId })
            .then(() => {
                setTweets(tweets.filter(tweet => tweet.id !== id));
                toastInfo('Tweet deletado')
            })
            .catch((error) => {
                if (error.status === 401) {
                    toastWarning('Você não pode deletar esse tweet, pois não foi criado por você')
                }
                else { toastError('Erro ao deletar') }
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

    const handleDenuncia = async (id: any, denunciaText: string) => {
        await Denuncias.postar({ descricao: denunciaText, mensagem_id: id })
        .then(() => {
            toastInfo('Denuncia enviada')
        })
        .catch((error) => {
            console.log(error);
            toastError('Erro ao enviar denuncia')
        })
    };
    return (
        <>
            {user.role === 'ADMIN' && (<Button label="Denuncias" icon="pi pi-twitter" onClick={() => navigate('/bloqueados')} />)}
            <PostTweet onNewTweet={fetchTweets} />
            <IconField style={{ maxWidth: '200px', margin: '0 auto', marginBottom: '10px' }} iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText placeholder="Nome ou Email" value={search} onChange={(e) => setSearch(e.target.value)} />
            </IconField>
            {/* Data Inicial */}
            <Calendar style={{ marginRight: '10px' }} placeholder="Data Inicial" value={dataInicial} onChange={(e) => { setDatainicial(e.value) }} dateFormat="dd/mm/yy" />
            {/* Data Final */}
            <Calendar placeholder="Data Final" value={dataFinal} onChange={(e) => setDataFinal(e.value)} dateFormat="dd/mm/yy" />
            <div className="tweet-list">
                <TweetList
                    tweets={tweets}
                    loading={loading}
                    error={error}
                    handleDeleteTweet={handleDeleteTweet}
                    handleLikeTweet={handleLikeTweet}
                    handleDenuncia={handleDenuncia} />
            </div>
        </>
    );
}

export default HomePage;
