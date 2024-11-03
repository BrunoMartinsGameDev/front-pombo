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
export interface DenunciaList{
    page:number | null
    size: number | null
    usuarioId: number | null
    mensagemId: number | null
}
export interface MensagemFilter{
    search: string | null | undefined
    dataInicial: string | null | undefined
    dataFinal: string | null | undefined
    page: number | null
    size: number | null
}
export interface MensagemRequest{
    texto: string
}
export interface DenunciaRequest{
    descricao: string
    mensagem_id: string
}
export interface MensagemResponse{
    id: string
    texto: string
    dataCriacao: Date
    quantidadeLikes: number
    usuarioCriador: any
    usuariosQueDeramLike: any
}