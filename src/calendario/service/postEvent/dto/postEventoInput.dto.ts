import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";


export class PostEventInputDto {
        @ApiProperty({description: 'Titulo do Evento', example: 'Debate UFSC'})
        @IsString()
        title: string; 
        @ApiProperty({description: 'Descrição do Evento', example: 'Debate ocorrerá de forma online'})
        @IsString()
        description: string; 
        @ApiProperty({description: 'Data do Evento'})
        @IsDate()
        dateEvent: Date;

}

