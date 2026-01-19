import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";


export class PostEventOutputDto {
    @ApiProperty({description: 'ID do Evento', example: 2})
    @IsNumber()
    id: number
    @ApiProperty({description: 'Criado por algum adm/moderador', example: 1})
    @IsNumber()
    createdBy: number; 
    @ApiProperty({description: 'Titulo do Evento', example: 'Debate UFSC'})
    @IsString()
    title: string; 
    @ApiProperty({description: 'Descrição do Evento', example: 'Debate ocorrerá de forma online'})
    @IsString()
    description: string; 
    @ApiProperty({description: 'Data do Evento'})
    @IsDate()
    dateEvent: Date;
    @ApiProperty({description: 'Criação do Evento'})
    @IsDate()
    createdAt: Date
}