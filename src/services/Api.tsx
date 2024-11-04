import axios from "axios";
import { DenunciaList, LoginRequest, MensagemFilter, MensagemList, MensagemRequest, SignUpRequest, UsuarioFiltroParams } from "../components/Interfaces";

const backUrl = import.meta.env.VITE_BACK_URL ? import.meta.env.VITE_BACK_URL : "http://localhost:8080/";
//#region Axios Config
const axiosInstance = axios.create({
    baseURL: backUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Pega o token do localStorage

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
//#endregion

const Logout = () => {
    localStorage.removeItem("token");
}
const UserData = JSON.parse(localStorage.getItem('user')?.toString() || '{}');

//#region Auth Endpoints
export const Auth = {
    login: (data: LoginRequest) => axiosInstance.post("auth/login", data),
    signup: (data: SignUpRequest) => axiosInstance.post("auth/novo", data),
    logout: () => Logout(),
    user: () => UserData,
};
//#endregion

//#region User Endpoints
export const Users = {
    list: () => axiosInstance.get("restrito/pessoa/todos"),
    filter: (params: UsuarioFiltroParams) => axiosInstance.get("restrito/pessoa/filtro", { params: params }),
    get: (id: string) => axiosInstance.get(`restrito/pessoa/${id}`),
    update: (id: string, data: SignUpRequest) => axiosInstance.put(`restrito/pessoa/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`restrito/pessoa/${id}`),
    me: () => axiosInstance.get("restrito/pessoa/me")
};
//#endregion

//#region Message Endpoints
export const Mensagems = {
    list: (params: MensagemList) => axiosInstance.get("restrito/mensagem/todas", { params: params }),
    filter: (params: MensagemFilter) => axiosInstance.get("restrito/mensagem/filtros", { params: params }),
    get: (id: string) => axiosInstance.get(`restrito/mensagem/${id}`),
    delete: (id: string, params: {usuarioId: number}) => axiosInstance.delete(`restrito/mensagem/${id}`,{ params: params }),
    curtir: (id: string, params: {usuarioId: number}) => axiosInstance.post(`restrito/mensagem/${id}/curtir?usuarioId=${params.usuarioId}`),
    postar: (data: MensagemRequest) => axiosInstance.post("restrito/mensagem", data),
}
//#endregion

//#region Denuncias Endpoints
export const Denuncias = {
    get: (id: string) => axiosInstance.get(`restrito/denuncia/${id}`),
    bloquear: (id: string, data: {bloqueado: boolean}) => axiosInstance.put(`restrito/denuncia/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`restrito/denuncia/${id}`),
    list: (params: DenunciaList) => axiosInstance.get("restrito/denuncia", { params: params }),
    postar: (data: MensagemRequest) => axiosInstance.post("restrito/denuncia", data),
}
//#endregion