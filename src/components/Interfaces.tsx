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
    cpf? : string | undefined
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

export interface MensagemList{
    page:number | null
    size: number | null
}
export interface MensagemFilter{
    usuarioId: number
    conteudo: string
    page: number
    size: number
}
export interface MensagemRequest{
    texto: string
}
export interface MensagemResponse{
    id: string
    texto: string
    dataCriacao: Date
    quantidadeLikes: number
    usuarioCriador: any
    usuariosQueDeramLike: any
}