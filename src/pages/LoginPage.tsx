import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button'; // Botão do PrimeReact
import { InputText } from 'primereact/inputtext'; // InputText do PrimeReact
import 'bootstrap/dist/css/bootstrap.min.css'; // Certifique-se de que o CSS do Bootstrap foi importado
import { Auth, Users } from '../services/Api';
import { toastError } from '../services/CustomToast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Auth.logout();
  },[]);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const senha = password;
    await Auth.login({ email, senha }).then((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        Users.me().then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/home');
        }).catch((error) => {
            console.log(error);
        })
    })
    .catch((error) => {
      toastError('Email ou senha inválidos!');
        console.log(error);
    });
    // Redireciona após login bem-sucedido
  };

  return (
    <div className="container mt-5" style={{minWidth: '600px'}}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Bem Vindo!</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <label htmlFor="email">E-mail</label>
                <InputText
                  id="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Senha</label>
                <InputText
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                label="Entrar"
                className="p-button-raised p-button-primary w-100 mb-3"
              />
            </form>
            <p className="text-center">
              Não tem uma conta?{' '}
              <Link to="/create-account" className="text-primary">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
