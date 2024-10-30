import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';
import { Mensagems } from '../services/Api'; // Certifique-se de que o caminho está correto
import { toastError } from '../services/CustomToast';
function PostTweet() {
    const [tweet, setTweet] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePost = async () => {
        if (tweet.length > 300) {
            setErrorMessage('O limite é de 300 caracteres.');
            toastError('O limite é de 300 caracteres.');
            return;
        }
        // Chama o endpoint para postar a mensagem
        await Mensagems.postar({ texto: tweet })
        .then((res) => {
            console.log(res.data);
            setSuccessMessage('Mensagem postada com sucesso!');
            setTweet(''); // Limpa o campo após postar
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage('Erro ao postar a mensagem.');
            toastError('Erro ao postar a mensagem.');
        });
    };

    return(
    <div className='Tweet'>
            <div>
                <h2>Postar Mensagem</h2>
                <div>
                    <InputTextarea
                        id="tweet"
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}
                        rows={5}
                        maxLength={300}
                        placeholder="O que você está pensando?"
                    />
                    <label htmlFor="tweet">Escreva sua mensagem (máx. 300 caracteres):</label>
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <Button label="Postar" onClick={handlePost} />
            </div>
        </div>
    )
}
export default PostTweet;