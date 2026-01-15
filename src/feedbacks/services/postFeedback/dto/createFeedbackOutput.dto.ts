import { ApiProperty } from "@nestjs/swagger";


export class createFeedbackOutputDto {
    @ApiProperty({description: 'retorno', example: 1})
    id: number
}