import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class LoginInputDto {

  @ApiProperty({ example: 'admin', description: 'username ou email do usuário' })
  email: string;

  @ApiProperty({ example: 'admin', description: 'senha do usuario' })
  @IsString()
  @IsNotEmpty()
  senha: string;

}