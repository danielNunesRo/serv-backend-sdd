import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, IsDateString, Min, Max } from 'class-validator';

export class PostAverageInputDto {

  @ApiProperty({
    description: 'ID do voluntário que receberá a média',
    example: 6,
  })
  @IsInt({ message: 'voluntarioId deve ser um número inteiro' })
  @Min(1)
  voluntarioId: number;

  @ApiProperty({
    description: 'Valor da média atribuída ao voluntário',
    example: 8.75,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'media deve ser um número com até duas casas decimais' }
  )
  @Min(0, { message: 'media não pode ser menor que 0' })
  @Max(100, { message: 'media não pode ser maior que 10' })
  media: number;

  @ApiProperty({
    description: 'Data de referência da média (YYYY-MM-DD)',
    example: '2026-01-15',
  })
  @IsDateString({}, { message: 'dataMedia deve estar no formato YYYY-MM-DD' })
  dataMedia: string;

}
