import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando Bootstrap
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importando estilos principais do PrimeReact
import 'primeicons/primeicons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DenunciaPage from './pages/DenunciaPage';
import ProtectedRoutes from './services/ProtectedRoute';
import { AuthProvider } from './services/AuthProvider';
import NotFound404Page from './pages/NotFound404Page';
function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/create-account" element={<RegisterPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/bloqueados" element={<DenunciaPage />} />
            </Route>
            <Route path="*" element={<NotFound404Page />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
