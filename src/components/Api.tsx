import axios from "axios";
import { LoginRequest, MensagemFilter, MensagemList, MensagemRequest, SignUpRequest, UsuarioFiltroParams } from "./Interfaces";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
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

export const Logout = () => {
    localStorage.removeItem("token");
}

export const Auth = {
    login: (data: LoginRequest) => axiosInstance.post("auth/login", data),
    signup: (data: SignUpRequest) => axiosInstance.post("auth/novo", data),
};

export const Users = {
    list: () => axiosInstance.get("restrito/pessoa/todos"),
    filter: (params: UsuarioFiltroParams) => axiosInstance.get("restrito/pessoa/filtro", { params: params }),
    get: (id: string) => axiosInstance.get(`restrito/pessoa/${id}`),
    update: (id: string, data: SignUpRequest) => axiosInstance.put(`restrito/pessoa/${id}`, data),
    delete: (id: string) => axiosInstance.delete(`restrito/pessoa/${id}`),
    me: () => axiosInstance.get("restrito/pessoa/me")
};

export const Mensagems = {
    list: (params: MensagemList) => axiosInstance.get("restrito/mensagem/todas", { params: params }),
    filter: (params: MensagemFilter) => axiosInstance.get("restrito/mensagem/filtros", { params: params }),
    get: (id: string) => axiosInstance.get(`restrito/mensagem/${id}`),
    delete: (id: string, params: {usuarioId: number}) => axiosInstance.delete(`restrito/mensagem/${id}`,{ params: params }),
    curtir: (id: string, params: {usuarioId: number}) => axiosInstance.post(`restrito/mensagem/${id}/curtir?usuarioId=${params.usuarioId}`),
    postar: (data: MensagemRequest) => axiosInstance.post("restrito/mensagem", data),
}