import { Role } from "../enum/role.enum"


export class AuditoriaRoleUpdateDto {
    
    contaEmail: string 
    
    roleAntiga: Role 
    
    roleAtualizada: Role
    
    atualizadaPorEmail: String 
}

