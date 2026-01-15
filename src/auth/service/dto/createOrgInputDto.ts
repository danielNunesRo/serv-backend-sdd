import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/role.enum"
import { IsString } from "class-validator";

export class CreateOrgInputDto {
    
    @ApiProperty({example: 'John Does'})
    @IsString()
    nome: String;

    @ApiProperty({example: 'johndoes@email.com'})
    @IsString()
    email: String;

    @ApiProperty({example: '12345'})
    @IsString()
    senha: String;
    
    @ApiProperty({example: 'MODERADOR'})
    @IsString()
    role: Role;
}