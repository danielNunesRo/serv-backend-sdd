import { Role } from "../enum/role.enum";

export class UpdateRoleResponseDto {
  updatedUser: {
    id: number;
    nome: string;
    email: string;
    role: Role;
  };

  audit: {
    contaEmail: string;
    roleAntiga: Role;
    roleAtualizada: Role;
    atualizadaPorEmail: string;
    dataAtualizacao: Date;
  };
}
