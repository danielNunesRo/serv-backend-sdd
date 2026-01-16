import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Role } from "src/auth/service/enum/role.enum";

export class PostMessageFeedbackInputDto {
    @ApiProperty({description: 'ID DO FEEDBACK/CONVERSA', example: 1})
    @IsNumber()
    feedbackId: number;

    @ApiProperty({description: 'ID DO USUARIO QUE ENVIOU A MENSAGEM', example: 2})
    @IsNumber()
    authorId: number;

    @ApiProperty({description: 'ID DO USUARIO QUE ENVIOU A MENSAGEM', example: 2})
    @IsEnum(Role, {message: 'ADMINISTRADOR'})
    authorType: Role;

    
    @ApiProperty({description: 'CORPO DA MENSAGEM', example: 'Olá, agradecemos sua participação no evento X'})
    @IsString()
    content: string;
}


