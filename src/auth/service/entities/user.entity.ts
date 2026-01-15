import { Role } from "../enum/role.enum";

export interface User {
    ID: number;
    NOME: string;
    EMAIL: string;
    SENHA: string;
    ROLE: Role;
    ATIVO: boolean;
    DATA_CRIACAO: Date;
}