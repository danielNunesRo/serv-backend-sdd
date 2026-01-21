import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsDateString,
  IsPositive,
} from 'class-validator';

export class GetMyAverageOutputDto {
  @ApiProperty({
    description: 'Identificador único do registro de média do voluntário',
    example: 10,
  })
  @IsInt()
  @IsPositive()
  id: number;

  @ApiProperty({
    description: 'ID do voluntário ao qual esta média pertence',
    example: 5,
  })
  @IsInt()
  @IsPositive()
  voluntarioId: number;

  @ApiProperty({
    description: 'Valor da média atribuída ao voluntário',
    example: 8.75,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  media: number;

  @ApiProperty({
    description: 'Data de referência da média (quando ela foi registrada)',
    example: '2026-01-20',
  })
  @IsDateString()
  dataMedia: string;

  @ApiProperty({
    description: 'ID do voluntário (administrador) que criou o registro da média',
    example: 2,
  })
  @IsInt()
  @IsPositive()
  createdBy: number;

  @ApiProperty({
    description: 'Data e hora em que o registro da média foi criado no sistema',
    example: '2026-01-20T14:30:00.000Z',
  })
  @IsDateString()
  dataCriacao: string;
}
