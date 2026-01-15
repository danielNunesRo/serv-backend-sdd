import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/role.enum";
import { IsString } from "class-validator";

export class UpdateRoleInputDto {

    @ApiProperty({description: 'Email do usuario', example: 'johndoes@email.com'})
    @IsString()
    email: string;

    @ApiProperty({description: 'Role a ser atualizada'})
    @IsString()
    role: Role;

}