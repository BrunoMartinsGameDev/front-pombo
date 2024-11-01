import Tweet from './Tweet';
import { decrypt } from '../services/Crypto';
import { MensagemResponse } from './Interfaces';

interface TweetListProps {
  tweets: MensagemResponse[];
  loading: boolean;
  error: string | null;
  handleDeleteTweet: (id: string) => void;
  handleLikeTweet: (id: string) => Promise<any>;
}

const TweetList = ({ tweets, loading, error, handleDeleteTweet, handleLikeTweet }: TweetListProps) => {
  
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
            texto={decrypt(tweet.texto)}
            username={tweet.usuarioCriador.nome}
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
