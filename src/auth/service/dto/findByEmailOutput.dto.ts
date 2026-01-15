import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/role.enum';


export class FindByEmailOutputDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Administrador' })
  nome: string;

  @ApiProperty({ example: 'admin@email.com' })
  email: string;

  @ApiProperty({ enum: Role, example: Role.ADMINISTRADOR })
  role: Role;

  @ApiProperty({ example: 'hash_da_senha' })
  senha: string;

  @ApiProperty({ example: true })
  ativo: boolean;
}
