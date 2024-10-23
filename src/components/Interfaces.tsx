export interface LoginRequest{
    email: string
    senha: string
}
export interface LoginResponse{
    token: string
}
export interface SignUpRequest{
    email: string
    senha: string
    nome?: string
    cpf?: string
    role: string
}


export interface UsuarioFiltroParams{
    nome?: string
    email?: string
    cpf?: string
}
export interface UsuarioUpdateRequest{
    nome?: string
    email: string
    senha: string
    cpf?: string
    role: string
    foto_perfil?: string[]
}
