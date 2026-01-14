import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVoluntarioInputDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'admin' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  senha: string;
}