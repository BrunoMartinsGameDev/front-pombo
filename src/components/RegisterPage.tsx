import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { SignUpRequest } from './Interfaces';
import { Auth } from './Api';
import { toastError } from './CustomToast';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [cargo] = useState('USER'); // Definido como USER fixo
    const navigate = useNavigate();

    const handleRegister = async (e: any) => {
        e.preventDefault();

        // Monta o objeto de dados do usuário
        const senha = password;
        const nome = name;
        const role = cargo;
        const userData: SignUpRequest = {
            email,
            senha,
            nome: nome || undefined, // Nome opcional
            cpf: cpf || undefined,   // CPF opcional
            role
        };

        // Faz a requisição para o endpoint de cadastro
        await Auth.signup(userData)
            .then(() => {
                console.log('Cadastro realizado com sucesso:');
                navigate('/');
            }).catch((error) => {
                console.log(error.status);
                if(error.status === 409) {
                    toastError('Este email ja esta sendo usado em nossa base de dados');
                }
            })


    };

    return (
        <div className='Card'>
            <div><h2>Cadastre-se</h2></div>
            <div>
                <label htmlFor="email">Email</label>
                <InputText className='inputText' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Senha</label>
                <Password className='inputText' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="name">Nome</label>
                <InputText className='inputText' id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="cpf">CPF</label>
                <InputText className='inputText' id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </div>

            <Button onClick={handleRegister}>Cadastrar</Button>
        </div>
    );
};

export default RegisterPage;