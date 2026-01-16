import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { Role } from "src/auth/service/enum/role.enum";

export class PostMessageFeedbackOutputDto {
    @ApiProperty({description: 'ID DA MENSAGEM', example: 1})
    @IsNumber()
    id: number;
    @ApiProperty({description: 'ID DA CONVERSA', example: 1})
    @IsNumber()
    feedbackId: number;
    @ApiProperty({description: 'ID Do AUTOR', example: 1})
    @IsNumber()
    authorId: number;
    @ApiProperty({description: 'PERMISSÃO DO USUARIO', example: 2})
    @IsEnum(Role, {message: 'ADMINISTRADOR'})
    authorType: Role;
    @ApiProperty({description: 'CORPO DA MENSAGEM', example: 'Olá, agradecemos sua participação no evento X'})
    @IsString()
    content: string;
    @ApiProperty({description: 'LIDO OU NÃO LIDO', example: true})
    @IsBoolean()
    isRead: boolean;
    @ApiProperty({description: 'DATA QUE FOI CRIADO A MENSAGEM'})
    @IsDate()
    createdAt: Date;
}



