import { useEffect, useState } from 'react';
import Tweet from './Tweet'; // O componente Tweet que criamos antes
import { Mensagems } from './Api';
import { toastError } from './CustomToast';
import { MensagemResponse } from './Interfaces';

const TweetList = () => {
  const [tweets, setTweets] = useState<MensagemResponse[]>([]); // Estado para armazenar a lista de tweets
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState(null); // Estado para armazenar erros

  // Função para buscar tweets da API
  const fetchTweets = async () => {
    await Mensagems.list({page: null, size: null}).then((response) => {
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
    setTweets(tweets.filter(tweet => tweet.id !== id)); // Removendo o tweet da lista após deleção
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    console.log(userId);
    Mensagems.delete(id, {usuarioId: userId}).catch((error) => {
        console.log(error);
        toastError('Erro ao deletar')
    })
  };

  // Função para curtir um tweet
  const handleLikeTweet = async (id:any): Promise<any> => {
    setTweets(tweets.map(tweet =>
      tweet.id === id ? { ...tweet, likes: tweet.quantidadeLikes + 1 } : tweet
    ));
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    return await Mensagems.curtir(id, {usuarioId: userId})
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        console.log(error);
        toastError('Erro ao curtir')
        return {Message: 'Erro ao curtir'}
    })
  };
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Tweets</h1>
      {tweets.length > 0 ? (
        tweets.map(tweet => (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            texto={tweet.texto}
            username={tweet.usuarioCriador.email}
            createdAt={tweet.dataCriacao.toString()}
            initialLikes={tweet.quantidadeLikes}
            usuariosQueCurtiram={tweet.usuariosQueDeramLike}
            onDelete={handleDeleteTweet}
            onLike={handleLikeTweet}
          />
        ))
      ) : (
        <p>Nenhum tweet encontrado</p>
      )}
    </div>
  );
};

export default TweetList;
